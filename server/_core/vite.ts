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

      // Inject per-route SEO tags even in dev, so it's testable before deploy
      template = injectSeoTags(template, req.path);

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

  // Remove any placeholder/default title+meta from the template, then inject ours right after <head>
  let result = html.replace(/<title>.*?<\/title>/i, "");
  result = result.replace(/<meta\s+name="description"[^>]*>/i, "");
  result = result.replace(/<head>/i, `<head>\n${tags}`);

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
  // Cache the raw template in memory — read once, reused for every request.
  // This avoids a disk read on every single page load in production.
  let cachedTemplate: string | null = null;
  function getTemplate(): string {
    if (cachedTemplate === null) {
      cachedTemplate = fs.readFileSync(indexPath, "utf-8");
    }
    return cachedTemplate;
  }

  // Serve static assets (JS, CSS, images) normally — these aren't HTML
  // so they don't need SEO injection.
  app.use(express.static(distPath, { index: false }));

  // robots.txt and sitemap.xml are handled by dedicated routes registered
  // separately in index.ts (see registerSeoRoutes), which must be added
  // BEFORE this catch-all.

  // Fall through to index.html for any unmatched route (SPA behaviour),
  // but inject the correct per-route SEO tags first.
  app.use("*", (req, res) => {
    const template = getTemplate();
    const html = injectSeoTags(template, req.path);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
