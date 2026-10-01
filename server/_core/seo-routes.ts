import type { Express } from "express";
import { SEO_ROUTES, SITE_URL } from "./seo-config";

/**
 * Registers /robots.txt and /sitemap.xml as live Express routes.
 *
 * IMPORTANT: register this BEFORE serveStatic's catch-all (app.use("*", ...))
 * in index.ts, otherwise the SPA fallback will intercept these requests
 * and serve HTML instead.
 */
export function registerSeoRoutes(app: Express) {
  app.get("/robots.txt", (_req, res) => {
    const body = `# Nudge Digital — robots.txt
# Explicitly allowing major search and AI crawlers.

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

# Search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI / answer engine crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
    res.status(200).set({ "Content-Type": "text/plain; charset=utf-8" }).end(body);
  });

  app.get("/llms.txt", (_req, res) => {
    const pages = SEO_ROUTES.filter((r) => !r.noIndex && r.path !== "/" && r.path !== "*")
      .map((r) => `- [${r.title.split(" | ")[0]}](${SITE_URL}${r.path}): ${r.description}`)
      .join("\n");
    const body = `# Nudge Digital

> Nudge Digital is a marketing partner for tech companies and AI startups, run by Harrison, a senior digital marketer with 10+ years of experience based in Melbourne, Australia. It covers go-to-market strategy, SEO and AI search, paid media, email and lifecycle marketing, CRM and automation, analytics and fractional CMO support, with fixed pricing and one person accountable for the work.

## Who it is for
Technology companies and AI startups, and the wider tech field: SaaS, developer tools, cybersecurity, fintech, healthtech, hardware, consumer tech and more.

## Services
- Strategy & Go-To-Market: ICP, positioning, launch plans, competitive intelligence, fractional CMO
- Marketing Ops & Automation: CRM, lifecycle email, lead enrichment and scoring, AI workflow automation, reporting
- Performance Marketing & Analytics: tracking and attribution, paid media, SEO, AI search visibility, CRO
- Brand & Content: messaging, technical content, social, websites, sales assets
- Technical Fixes: tracking audits, site speed, funnel diagnostics, GTM, integrations, JavaScript SEO

## Pages
${pages}

## Contact
${SITE_URL}/contact
`;
    res.status(200).set({ "Content-Type": "text/plain; charset=utf-8" }).end(body);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const urls = SEO_ROUTES.filter((r) => !r.noIndex)
      .map((r) => {
        const loc = `${SITE_URL}${r.path === "/" ? "" : r.path}`;
        const priority = r.priority ?? 0.5;
        const changefreq = r.changefreq ?? "monthly";
        return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
      })
      .join("\n");

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
    res.status(200).set({ "Content-Type": "application/xml; charset=utf-8" }).end(body);
  });
}
