/**
 * seo-config.ts
 * ───────────────────────────────────────────────────────────────
 * Single source of truth for per-route SEO metadata + structured data.
 * Consumed by server/_core/vite.ts (serveStatic) to inject the correct
 * <title>, <meta>, and JSON-LD into the raw HTML response for every
 * route — so crawlers and AI bots that don't execute JavaScript still
 * see fully correct, page-specific SEO data.
 *
 * Also used to generate sitemap.xml — keeps both in sync automatically.
 */

import { FAQS } from "../../client/src/data/faqs";

// Canonical host: the live site is served at www (the bare domain redirects to it), so every canonical URL,
// og:url, sitemap entry and schema @id must use www. Mixing the two causes "Alternate page with proper canonical tag".
const SITE_URL = "https://www.nudgedigital.com.au";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  /** JSON-LD schema object(s) for this route. Array = multiple @graph nodes. */
  schema?: Record<string, any> | Record<string, any>[];
  /** Exclude from sitemap.xml (e.g. admin, 404) */
  noIndex?: boolean;
  /** Sitemap priority 0.0–1.0 */
  priority?: number;
  /** Sitemap changefreq */
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Harrison",
  url: `${SITE_URL}/about`,
  jobTitle: "Marketing Strategist & Implementer for Tech and AI Companies",
  sameAs: ["https://www.linkedin.com/company/nudgedigital/"],
  knowsAbout: ["Go-to-market strategy","SEO","AI search optimisation (GEO/AEO)","Paid media","Email and lifecycle marketing","CRM and marketing automation","Marketing analytics and attribution","Fractional CMO services"],
  description:
    "Senior digital marketer with 10+ years of experience across strategy, SEO, CRM automation, paid media and analytics, focused on tech companies and AI startups. Based in Melbourne, Australia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
};

const businessSchema = {
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Nudge Digital",
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/company/nudgedigital/"],
  knowsAbout: ["Go-to-market strategy","SEO","AI search optimisation (GEO/AEO)","Paid media","Email and lifecycle marketing","CRM and marketing automation","Marketing analytics and attribution","Fractional CMO services"],
  areaServed: ["Australia", "Worldwide"],
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Marketing partner for tech companies and AI startups, offering go-to-market strategy, SEO and AI search, paid media, lifecycle email, CRM and automation, analytics, and fractional CMO services.",
  email: "hello@nudgedigital.com.au",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    postalCode: "3000",
    addressCountry: "AU",
  },
  geo: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
  priceRange: "$$",
  currenciesAccepted: "AUD",
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "hello@nudgedigital.com.au", availableLanguage: "English" },
  founder: { "@id": `${SITE_URL}/#person` },
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Nudge Digital",
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-AU",
};

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: "/privacy",
    title: "Privacy Policy | Nudge Digital",
    description: "How Nudge Digital collects, uses and protects personal information.",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/terms",
    title: "Terms of Service | Nudge Digital",
    description: "The terms that apply to Nudge Digital services and this website.",
    priority: 0.3,
    changefreq: "yearly",
  },
  {
    path: "/",
    title: "Nudge Digital — Marketing & Automation for Tech Companies and AI Startups",
    description:
      "Go-to-market, SEO and AI search, paid media, lifecycle email, CRM automation and attribution for tech companies and AI startups. Senior operator, fixed prices, systems set up and running.",
    priority: 1.0,
    changefreq: "weekly",
    schema: [
      websiteSchema,
      personSchema,
      businessSchema,
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What does Nudge Digital do?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nudge Digital is a marketing partner for tech companies and AI startups, run by Harrison. It covers go-to-market strategy, SEO and AI search, paid media, email and lifecycle marketing, CRM and automation, analytics and fractional CMO support.",
            },
          },
          {
            "@type": "Question",
            name: "Is Nudge Digital an agency?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Nudge Digital is one senior marketing operator, Harrison, working directly with tech companies and AI startups. There are no account managers or junior staff in between: the person you speak to is the person who does the work.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Nudge Digital based?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nudge Digital is based in Melbourne, Australia, and works remotely with tech and AI teams across Australia and around the world.",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/services",
    title: "Marketing Services for Tech & AI Companies \u2014 SEO, CRM, Paid, Email | Nudge Digital",
    description:
      "30 marketing services for tech companies and AI startups: strategy, CRM and automation, SEO and AI search, paid media, lifecycle email, analytics and content. Fixed pricing, one senior operator.",
    priority: 0.9,
    changefreq: "monthly",
    schema: [
      {
        "@type": "Service",
        serviceType: "Marketing strategy and implementation for technology companies",
        audience: { "@type": "Audience", audienceType: "Technology companies and AI startups" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Marketing services for tech and AI companies",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Strategy & Go-To-Market", description: "ICP, positioning, launch plans and channel mix for tech products" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Ops & Automation", description: "CRM, lifecycle email, lead scoring and AI workflow automation" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Marketing & Analytics", description: "Paid media, SEO, AI search visibility, attribution and CRO" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand & Content", description: "Messaging, technical content, social and website" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical Fixes", description: "Tracking, site speed, funnel diagnostics and integrations" } },
          ],
        },
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: ["Australia", "Worldwide"],
        description:
          "Full-stack marketing services for tech and AI companies including SEO, AI search, CRM automation, paid media, analytics, and fractional CMO support.",
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  },
  {
    path: "/services-marketplace",
    title: "Fixed-Price Marketing Packages for Tech Companies | Nudge Digital",
    description:
      "Fixed-price marketing packages for tech and AI startups: analytics setup, SEO audits, lifecycle email, CRM builds, paid media setup and more. Clear pricing, clear scope.",
    priority: 0.9,
    changefreq: "weekly",
    schema: breadcrumb([
      { name: "Home", path: "/" },
      { name: "Fixed-Price Packages", path: "/services-marketplace" },
    ]),
  },
  {
    path: "/pricing",
    title: "Pricing \u2014 Marketing Support for Tech & AI Startups | Nudge Digital",
    description:
      "Transparent pricing for tech and AI marketing support: hourly, fixed-price projects, monthly retainers and fractional CMO. No agency overhead, no surprise invoices.",
    priority: 0.8,
    changefreq: "monthly",
    schema: breadcrumb([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  },
  {
    path: "/about",
    title: "About Harrison \u2014 Marketing Partner for Tech & AI Companies | Nudge Digital",
    description:
      "Harrison is a senior digital marketer with 10+ years of experience, now focused on tech companies and AI startups: strategy, automation, channels and analytics, done by one person.",
    priority: 0.7,
    changefreq: "monthly",
    schema: [
      personSchema,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  },
  {
    path: "/how-we-work",
    title: "How I Work \u2014 Process for Tech & AI Marketing | Nudge Digital",
    description:
      "Send a Nudge, get a clear plan and fixed price within 24 hours, approve it, and I build it. No lock-in. Project, retainer and fractional CMO options for tech teams.",
    priority: 0.7,
    changefreq: "monthly",
    schema: [
      {
        "@type": "HowTo",
        name: "How to start working with Nudge Digital",
        step: [
          { "@type": "HowToStep", name: "Send a Nudge", text: "Tell Harrison what's broken, what you need built, or what you want done." },
          { "@type": "HowToStep", name: "Reverse Brief", text: "Harrison researches your situation and sends back a clear scope, price, and timeline." },
          { "@type": "HowToStep", name: "Sign Off", text: "Review the plan, adjust if needed, then approve to start." },
          { "@type": "HowToStep", name: "Execution", text: "Harrison delivers the work, with regular updates and a proper handover." },
        ],
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "How I Work", path: "/how-we-work" },
      ]),
    ],
  },
  {
    path: "/contact",
    title: "Contact \u2014 Send a Nudge | Nudge Digital",
    description:
      "Tell Harrison at Nudge Digital what you are building and what is stuck. Get a clear plan, fixed price and timeline within 24 hours.",
    priority: 0.6,
    changefreq: "yearly",
    schema: [
      businessSchema,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  },
  {
    path: "/testimonials",
    title: "Results & Case Studies \u2014 Tech and AI Marketing | Nudge Digital",
    description:
      "Real results from AI SaaS start-ups, agencies and growing businesses working with Nudge Digital.",
    priority: 0.7,
    changefreq: "monthly",
    schema: [
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Results", path: "/testimonials" },
      ]),
    ],
  },
  {
    path: "/resources",
    title: "Resources \u2014 Marketing for Tech & AI Companies | Nudge Digital",
    description:
      "Practical guides on SEO, AI search, analytics, automation and go-to-market for tech companies and AI startups.",
    priority: 0.6,
    changefreq: "weekly",
  },
  {
    path: "/faq",
    title: "FAQ \u2014 Marketing for Tech & AI Startups | Nudge Digital",
    description:
      "Common questions about working with Nudge Digital: who I work with, pricing, process, tools, automation and AI search.",
    priority: 0.5,
    changefreq: "monthly",
    schema: {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  },
  {
    path: "/calculator",
    title: "Marketing Time & Cost Savings Calculator | Nudge Digital",
    description:
      "Estimate the time and cost you could save with a senior marketing partner and automation, versus an agency or an in-house hire.",
    priority: 0.5,
    changefreq: "monthly",
  },
  // ── Excluded from sitemap/indexing ──────────────────────────────
  { path: "/admin", title: "Admin", description: "Admin", noIndex: true },
  { path: "/admin/login", title: "Admin Login", description: "Admin", noIndex: true },
  { path: "/404", title: "Page Not Found | Nudge Digital", description: "The page you're looking for doesn't exist.", noIndex: true },
];

export const DEFAULT_SEO: SeoRoute = {
  path: "*",
  title: "Nudge Digital \u2014 Marketing & Automation for Tech Companies and AI Startups",
  description:
    "Marketing partner for tech companies and AI startups: strategy, SEO, paid, email, CRM and automation. One senior operator, fixed prices.",
};

/** Find SEO config for a request path, with support for dynamic params like /admin/editor/:id */
export function getSeoForPath(requestPath: string): SeoRoute {
  // exact match first
  const exact = SEO_ROUTES.find((r) => r.path === requestPath);
  if (exact) return exact;

  // strip trailing slash and retry
  if (requestPath.length > 1 && requestPath.endsWith("/")) {
    const stripped = SEO_ROUTES.find((r) => r.path === requestPath.slice(0, -1));
    if (stripped) return stripped;
  }

  // dynamic admin editor route — noindex, doesn't need real schema
  if (requestPath.startsWith("/admin")) {
    return { path: requestPath, title: "Admin", description: "Admin", noIndex: true };
  }

  return DEFAULT_SEO;
}

export { SITE_URL, DEFAULT_OG_IMAGE };

/** True for addresses the site really serves (public pages, plus anything under /admin). Everything else is a 404. */
export function isKnownRoute(requestPath: string): boolean {
  if (requestPath.startsWith("/admin")) return true;
  const p = requestPath.length > 1 && requestPath.endsWith("/") ? requestPath.slice(0, -1) : requestPath;
  return p !== "/404" && p !== "*" && SEO_ROUTES.some((r) => r.path === p);
}
