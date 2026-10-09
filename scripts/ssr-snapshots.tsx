/**
 * Build-time static snapshots WITHOUT a browser.
 *
 * Why: crawlers such as GPTBot, ClaudeBot and PerplexityBot (and parts of Bing) generally do not run JavaScript.
 * Against the plain SPA shell they only see <head> metadata and no page text. scripts/prerender.mjs fixes that with
 * headless Chrome, but when Chrome can't launch on the build host it skips silently and the live site ships empty.
 * This script renders every public page with react-dom/server instead (pure Node, no Chrome), so crawlers always
 * get the real content.
 *
 * Output: dist/ssr/<name>.html  (home -> home.html). Kept OUT of dist/public on purpose so these files are never
 * served as separate URLs (no duplicate content). server/_core/vite.ts reads them and injects per-route SEO tags.
 *
 * Safety: this script never fails the build. On any error it logs and exits 0, and the site falls back to the
 * normal SPA shell exactly as before.
 */
import "./ssr-react-global";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PUBLIC = process.env.SSR_DIST || path.resolve(__dirname, "..", "dist", "public");
const OUT_DIR = path.resolve(DIST_PUBLIC, "..", "ssr");
const PAGES = path.resolve(__dirname, "..", "client", "src", "pages");

// route -> page module (mirrors client/src/App.tsx)
const ROUTES: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/services-marketplace": "Services Marketplace",
  "/pricing": "Pricing",
  "/about": "About",
  "/how-we-work": "HowWeWork",
  "/contact": "Contact",
  "/testimonials": "Testimonials",
  "/resources": "Resources",
  "/faq": "FAQ",
  "/privacy": "Privacy",
  "/terms": "Terms",
  "/calculator": "Calculator",
};

const nameFor = (route: string) => (route === "/" ? "home" : route.slice(1));

async function main() {
  console.log("\n[ssr-snapshots] Rendering public pages to static HTML (no browser needed)...\n");
  const templatePath = path.join(DIST_PUBLIC, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.log(`[ssr-snapshots] ${templatePath} not found. Run vite build first. Skipping.`);
    return;
  }
  const template = fs.readFileSync(templatePath, "utf-8");
  const emptyRoot = '<div id="root"></div>';
  if (!template.includes(emptyRoot)) {
    console.log("[ssr-snapshots] Base shell already contains rendered content (browser prerender ran). Nothing to do.");
    return;
  }

  const { renderToString } = await import("react-dom/server");
  const React = (await import("react")).default;
  const { Router } = await import("wouter");
  const { QueryClient, QueryClientProvider } = await import("@tanstack/react-query");
  const { httpBatchLink } = await import("@trpc/client");
  const superjson = (await import("superjson")).default;
  const { trpc } = await import("../client/src/lib/trpc");

  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({ links: [httpBatchLink({ url: "http://localhost/api/trpc", transformer: superjson })] });

  // React logs benign warnings during server rendering (e.g. useLayoutEffect); keep the build log readable.
  const origError = console.error;
  console.error = () => {};

  fs.mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;
  for (const [route, file] of Object.entries(ROUTES)) {
    const name = nameFor(route);
    // If a browser prerender already produced this route, leave it alone.
    const chromeFile = path.join(DIST_PUBLIC, name === "home" ? "__none__" : name, "index.html");
    if (name !== "home" && fs.existsSync(chromeFile)) {
      console.log(`  - ${route.padEnd(24)} browser snapshot exists, skipped`);
      continue;
    }
    try {
      const Page = (await import(path.join(PAGES, file))).default;
      const markup = renderToString(
        React.createElement(
          trpc.Provider as any,
          { client: trpcClient, queryClient },
          React.createElement(
            QueryClientProvider,
            { client: queryClient },
            React.createElement(Router as any, { ssrPath: route }, React.createElement(Page))
          )
        )
      );
      if (markup.length < 500 || !markup.includes("<h1")) throw new Error("rendered output looks empty");
      fs.writeFileSync(path.join(OUT_DIR, `${name}.html`), template.replace(emptyRoot, `<div id="root">${markup}</div>`), "utf-8");
      ok++;
      console.log(`  ✓ ${route.padEnd(24)} ${(markup.length / 1024).toFixed(0).padStart(4)} KB -> ssr/${name}.html`);
    } catch (e: any) {
      console.log(`  ✗ ${route.padEnd(24)} skipped: ${String(e?.message ?? e).split("\n")[0].slice(0, 100)}`);
    }
  }
  console.error = origError;
  console.log(`\n[ssr-snapshots] Done: ${ok}/${Object.keys(ROUTES).length} pages saved.\n`);
}

main()
  .catch((e) => console.log(`[ssr-snapshots] Skipped entirely (${String(e?.message ?? e).split("\n")[0]}). Site builds as normal.`))
  .finally(() => process.exit(0));
