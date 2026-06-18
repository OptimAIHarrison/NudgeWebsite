/**
 * scripts/prerender.mjs
 * ───────────────────────────────────────────────────────────────
 * Runs AFTER `vite build` (see package.json "build" script).
 *
 * What it does:
 *   1. Boots the already-built Express app on a throwaway local port
 *   2. Uses a headless Chromium (via Puppeteer) to visit every public
 *      route from server/_core/seo-config.ts
 *   3. Waits for the page to be fully rendered (network idle — so
 *      tRPC/data calls have resolved, not just initial DOM load)
 *   4. Saves the resulting HTML to dist/public/<route>/index.html
 *
 * Why this matters:
 *   serveStatic() already injects correct <title>/<meta>/JSON-LD per
 *   route (see vite.ts). This script additionally bakes the actual
 *   rendered page CONTENT (H1s, FAQ text, testimonials, etc.) into
 *   the raw HTML, so crawlers that don't execute JavaScript — most
 *   AI bots — see the real content, not just an empty <div id="root">.
 *
 * Result: a human visitor still gets the full interactive React SPA
 * (React hydrates the pre-rendered HTML on load). A non-JS crawler
 * gets a complete, readable page on first request.
 */

import puppeteer from "puppeteer";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import net from "net";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PUBLIC = path.resolve(__dirname, "..", "dist", "public");

// Routes to prerender. Kept in sync manually with server/_core/seo-config.ts
// noIndex routes (admin, 404) and dynamic-param routes are intentionally excluded.
const ROUTES_TO_PRERENDER = [
  "/",
  "/services",
  "/services-marketplace",
  "/pricing",
  "/about",
  "/how-we-work",
  "/contact",
  "/testimonials",
  "/resources",
  "/faq",
  "/calculator",
];

function findAvailablePort(start = 4173) {
  return new Promise((resolve, reject) => {
    function tryPort(port) {
      const server = net.createServer();
      server.listen(port, () => {
        server.close(() => resolve(port));
      });
      server.on("error", () => {
        if (port > start + 30) return reject(new Error("No available port found"));
        tryPort(port + 1);
      });
    }
    tryPort(start);
  });
}

async function startStaticServer(port) {
  const app = express();
  app.use(express.static(DIST_PUBLIC, { index: false }));
  // Serve index.html for all routes (SPA fallback) — this is what
  // Puppeteer will load and let React render client-side, exactly
  // like serveStatic does in production.
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(DIST_PUBLIC, "index.html"));
  });

  return new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server));
  });
}

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`${baseUrl}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Give any final React renders / animations a brief moment to settle.
    await new Promise((r) => setTimeout(r, 300));

    const html = await page.content();

    // Sanity check: if the root div is still empty, React never mounted
    // (likely a JS error on the page). Don't save a blank shell — better
    // to fall back to the un-prerendered SPA shell for this route than
    // to silently ship an empty page to crawlers.
    const rootMatch = html.match(/<div id="root">([\s\S]*?)<\/div>\s*<script/i);
    const rootContent = rootMatch ? rootMatch[1].trim() : "";
    if (rootContent.length < 50) {
      throw new Error(
        "Rendered page appears empty (React may have failed to mount) — skipping"
      );
    }

    return html;
  } finally {
    await page.close();
  }
}

function writeRouteHtml(route, html) {
  const targetDir =
    route === "/" ? DIST_PUBLIC : path.join(DIST_PUBLIC, route.replace(/^\//, ""));
  fs.mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, "index.html");
  fs.writeFileSync(targetFile, html, "utf-8");
  console.log(`  ✓ ${route.padEnd(28)} → ${path.relative(DIST_PUBLIC, targetFile)}`);
}

async function main() {
  console.log("\n[prerender] Starting build-time prerender...\n");

  if (!fs.existsSync(DIST_PUBLIC)) {
    console.error(`[prerender] ERROR: ${DIST_PUBLIC} does not exist. Run vite build first.`);
    process.exit(1);
  }

  const port = await findAvailablePort();
  const baseUrl = `http://localhost:${port}`;
  console.log(`[prerender] Booting throwaway static server on ${baseUrl}`);

  const server = await startStaticServer(port);

  console.log("[prerender] Launching headless Chromium...");
  // Default: use Puppeteer's own Chromium, installed via the
  // "postinstall" script in package.json (`npx puppeteer browsers
  // install chrome`). Only override via PUPPETEER_EXECUTABLE_PATH if
  // you specifically need to point at a different binary — leave
  // this unset in normal operation.
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || undefined;
  console.log(
    executablePath
      ? `[prerender] Using override Chromium at ${executablePath}`
      : "[prerender] Using Puppeteer's bundled Chromium"
  );

  // Railway's Railpack builder auto-detects Puppeteer and installs the
  // correct apt packages (libnss3, libglib2.0-0, libgbm1, etc.), but on
  // some Debian/Ubuntu base images the dynamic linker's default search
  // path doesn't include where these .so files actually land (commonly
  // /usr/lib/x86_64-linux-gnu). Without this, Chrome fails to launch
  // with "error while loading shared libraries: libglib-2.0.so.0:
  // cannot open shared object file" even though the package IS
  // installed. Explicitly extending LD_LIBRARY_PATH fixes this without
  // needing to control the builder's package installation step at all.
  const extraLibPaths = [
    "/usr/lib/x86_64-linux-gnu",
    "/usr/lib/aarch64-linux-gnu",
    "/usr/lib",
    "/lib/x86_64-linux-gnu",
  ];
  const existingLdPath = process.env.LD_LIBRARY_PATH || "";
  const mergedLdPath = [existingLdPath, ...extraLibPaths].filter(Boolean).join(":");

  // Diagnostic: actively search common locations for the specific
  // library Chrome failed to find last time (libglib-2.0.so.0), so if
  // this still fails, the log tells us exactly where it actually is
  // (or confirms it's genuinely missing) instead of guessing again.
  try {
    const { execSync } = await import("child_process");
    const found = execSync(
      "find /usr /lib -name 'libglib-2.0.so*' 2>/dev/null || true",
      { encoding: "utf-8" }
    ).trim();
    console.log(
      found
        ? `[prerender] Found libglib-2.0.so at:\n${found}`
        : "[prerender] WARNING: libglib-2.0.so.0 not found anywhere on filesystem"
    );
  } catch {
    // non-fatal — this is just diagnostic logging
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      env: {
        ...process.env,
        LD_LIBRARY_PATH: mergedLdPath,
      },
    });
  } catch (err) {
    console.error(
      `[prerender] Could not launch Chromium (${err.message}). Skipping prerender — site will still build and deploy with meta/schema injection only (no pre-rendered body content for non-JS crawlers).`
    );
    server.close();
    return; // exit gracefully — don't fail the whole deploy over this
  }

  console.log(`[prerender] Visiting ${ROUTES_TO_PRERENDER.length} routes...\n`);

  let failures = 0;
  for (const route of ROUTES_TO_PRERENDER) {
    try {
      const html = await prerenderRoute(browser, baseUrl, route);
      writeRouteHtml(route, html);
    } catch (err) {
      failures++;
      console.error(`  ✗ ${route.padEnd(28)} FAILED: ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(
    `\n[prerender] Done. ${ROUTES_TO_PRERENDER.length - failures}/${ROUTES_TO_PRERENDER.length} routes prerendered successfully.`
  );

  if (failures > 0) {
    console.error(
      `[prerender] WARNING: ${failures} route(s) failed to prerender. Those routes will fall back to client-side rendering only (still functional, just not pre-filled for non-JS crawlers).`
    );
    // Non-fatal: don't fail the whole build over a prerender hiccup.
    // The site still works correctly for real users either way.
  }
}

main().catch((err) => {
  console.error("[prerender] Fatal error:", err);
  process.exit(1);
});
