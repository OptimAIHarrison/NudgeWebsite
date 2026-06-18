import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { getSeoForPath, DEFAULT_OG_IMAGE, SITE_URL } from "./seo-config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      // Inject per-route SEO tags even in dev, so it's testable before deploy.
      // Use `url` (from req.originalUrl, captured above) — NOT req.path,
      // which Express reports as "/" for every request inside an
      // app.use("*", ...) middleware regardless of the actual URL.
      const pathOnly = url.split("?")[0];
      template = injectSeoTags(template, pathOnly);

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Injects route-specific <title>, <meta>, and JSON-LD schema into the
 * <head> of the HTML template before it's sent to the client.
 *
 * This runs server-side, before any JavaScript executes — so crawlers
 * and bots that don't render JS (GPTBot, ClaudeBot, PerplexityBot,
 * Bingbot, etc.) still receive fully correct, page-specific SEO data
 * in the raw HTML response.
 */
function injectSeoTags(html: string, requestPath: string): string {
  const seo = getSeoForPath(requestPath);
  const canonicalUrl = `${SITE_URL}${requestPath === "/" ? "" : requestPath}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;

  const robotsTag = seo.noIndex
    ? `<meta name="robots" content="noindex, nofollow" />`
    : `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`;

  const schemaBlock = seo.schema
    ? `<script type="application/ld+json">${JSON.stringify(
        Array.isArray(seo.schema)
          ? { "@context": "https://schema.org", "@graph": seo.schema }
          : { "@context": "https://schema.org", ...seo.schema }
      )}</script>`
    : "";

  const tags = `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}" />
    ${robotsTag}
    <link rel="canonical" href="${canonicalUrl}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Nudge Digital" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_AU" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${ogImage}" />

    ${schemaBlock}
  `;

  // Strip any previously-injected SEO block (idempotent — important
  // because prerendered files already went through this function once
  // when Puppeteer captured them; without this, tags would duplicate
  // on every subsequent build).
  let result = html.replace(
    /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
    ""
  );

  // Remove any remaining default/placeholder title + description that
  // weren't wrapped in the marker (e.g. the very first build, before
  // any injection has happened yet).
  result = result.replace(/<title>[\s\S]*?<\/title>/i, "");
  result = result.replace(/<meta\s+name=["']description["'][^>]*\/?>\n?/i, "");

  // Match <head> with or without attributes (e.g. <head lang="en">),
  // and with any whitespace inside the brackets — a plain /<head>/i
  // match would silently fail on anything but an exact bare tag.
  if (/<head[^>]*>/i.test(result)) {
    result = result.replace(
      /<head([^>]*)>/i,
      `<head$1>\n<!-- seo:start -->\n<!-- route:${requestPath} -->\n${tags}\n<!-- seo:end -->`
    );
  } else {
    // No <head> tag found at all — extremely unlikely, but fail loudly
    // in logs rather than silently shipping un-injected HTML.
    console.error(
      `[injectSeoTags] WARNING: no <head> tag found in template for path "${requestPath}" — SEO tags were NOT injected.`
    );
  }

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  const indexPath = path.resolve(distPath, "index.html");
  // Cache templates in memory — read once, reused for every request.
  // Avoids a disk read on every single page load in production.
  const templateCache = new Map<string, string>();

  function getFallbackTemplate(): string {
    const cached = templateCache.get("__fallback__");
    if (cached) return cached;
    const template = fs.readFileSync(indexPath, "utf-8");
    templateCache.set("__fallback__", template);
    return template;
  }

  /**
   * Looks for a prerendered HTML file matching the request path
   * (written by scripts/prerender.mjs at build time, e.g.
   * dist/public/services/index.html for the /services route).
   * Falls back to the base index.html (un-prerendered SPA shell)
   * if no prerendered version exists for that route — the page
   * still works, it just won't have body content for non-JS crawlers
   * until the next successful build includes it.
   */
  function getTemplateForPath(requestPath: string): string {
    const cached = templateCache.get(requestPath);
    if (cached) return cached;

    const normalizedPath = requestPath === "/" ? "" : requestPath.replace(/\/$/, "");
    const prerenderedFile = path.join(distPath, normalizedPath, "index.html");

    let template: string;
    if (
      prerenderedFile !== indexPath &&
      fs.existsSync(prerenderedFile) &&
      fs.statSync(prerenderedFile).isFile()
    ) {
      template = fs.readFileSync(prerenderedFile, "utf-8");
    } else {
      template = getFallbackTemplate();
    }

    templateCache.set(requestPath, template);
    return template;
  }

  // Serve static assets (JS, CSS, images) normally — these aren't HTML
  // so they don't need SEO injection.

  app.use(express.static(distPath, { index: false }));

  // robots.txt and sitemap.xml are handled by dedicated routes registered
  // separately in index.ts (see registerSeoRoutes), which must be added
  // BEFORE this catch-all.

  // Fall through to the matching prerendered HTML for this route if one
  // exists (see scripts/prerender.mjs), otherwise the base SPA shell.
  // Either way, inject the correct per-route SEO tags from seo-config.ts
  // as the single source of truth — this overwrites whatever <title>/
  // <meta> Puppeteer happened to capture at prerender time, so the two
  // systems can never drift out of sync with each other.
  app.use("*", (req, res) => {
    // IMPORTANT: req.path is unreliable inside app.use("*", ...) — Express
    // treats the wildcard mount itself as consuming the path, which can
    // cause req.path to report "/" for every request regardless of the
    // actual URL requested. req.originalUrl always reflects exactly what
    // the browser requested, unaffected by middleware mounting.
    const requestPath = req.originalUrl.split("?")[0]; // strip query string
    const template = getTemplateForPath(requestPath);
    const html = injectSeoTags(template, requestPath);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
