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

const SITE_URL = "https://nudgedigital.com.au";
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
  jobTitle: "Digital Marketing Strategist, Implementer & Fixer",
  description:
    "Senior digital marketing strategist, implementer and fixer with 10+ years experience across SEO, CRM automation, paid media, analytics and fractional CMO engagements. Based in Melbourne, Australia.",
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
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Freelance digital marketing strategist, implementer and fixer offering SEO, CRM automation, GA4 analytics, paid media management, email marketing, and fractional CMO services to businesses across Australia.",
  telephone: "+61400000000",
  email: "hello@nudgedigital.com.au",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    postalCode: "3000",
    addressCountry: "AU",
  },
  geo: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "City", name: "Melbourne" },
    { "@type": "City", name: "Sydney" },
    { "@type": "City", name: "Brisbane" },
  ],
  priceRange: "$$",
  currenciesAccepted: "AUD",
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
    path: "/",
    title: "Nudge Digital — Digital Marketing Strategist, Implementer & Fixer | Melbourne, Australia",
    description:
      "Harrison is a senior freelance digital marketing strategist, implementer and fixer in Melbourne. SEO, CRM automation, GA4 analytics, paid media & more. Fixed prices. One person. Real results.",
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
              text: "Nudge Digital is a freelance digital marketing practice run by Harrison, a strategist, implementer and fixer offering SEO, CRM and marketing automation, paid media management, GA4 analytics, email marketing, and fractional CMO services on a project or retainer basis.",
            },
          },
          {
            "@type": "Question",
            name: "Is Nudge Digital an agency?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Nudge Digital is one senior freelance strategist, implementer and fixer, Harrison, working directly with clients. There are no account managers or junior staff — every project is delivered personally.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Nudge Digital based?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Nudge Digital is based in Melbourne, Australia, and works with clients across Melbourne, Sydney, Brisbane, and remotely throughout Australia.",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/services",
    title: "Digital Marketing Services — SEO, CRM, Paid Media & Analytics | Nudge Digital",
    description:
      "Explore 32+ digital marketing services across strategic advisory, marketing automation, performance marketing, brand content, and technical fixes. Fixed pricing, fast delivery.",
    priority: 0.9,
    changefreq: "monthly",
    schema: [
      {
        "@type": "Service",
        serviceType: "Digital Marketing Consulting",
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: { "@type": "Country", name: "Australia" },
        description:
          "Full-stack digital marketing services including SEO, CRM automation, paid media, analytics, and fractional CMO support.",
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  },
  {
    path: "/services-marketplace",
    title: "Service Marketplace — Fixed-Price Digital Marketing Packages | Nudge Digital",
    description:
      "Browse 40+ fixed-price digital marketing services — GA4 setup, SEO audits, email automation, CRM builds, paid media setup, and more. Clear pricing, clear scope.",
    priority: 0.9,
    changefreq: "weekly",
    schema: breadcrumb([
      { name: "Home", path: "/" },
      { name: "Services Marketplace", path: "/services-marketplace" },
    ]),
  },
  {
    path: "/pricing",
    title: "Pricing — Freelance Digital Marketing Rates | Nudge Digital",
    description:
      "Transparent, fixed pricing for freelance digital marketing in Melbourne. Project-based and retainer options. No agency overhead, no surprise invoices.",
    priority: 0.8,
    changefreq: "monthly",
    schema: breadcrumb([
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  },
  {
    path: "/about",
    title: "About Harrison — Digital Marketing Strategist, Implementer & Fixer | Nudge Digital",
    description:
      "10+ years in digital marketing across three continents. Meet Harrison, the strategist, implementer and fixer behind Nudge Digital — honest, hands-on, and outcome-focused.",
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
    title: "How It Works — Our Process | Nudge Digital",
    description:
      "Send a Nudge, get a clear plan within 24 hours, sign off, and we get to work. No lock-in contracts. Project-based or retainer engagements available.",
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
        { name: "How We Work", path: "/how-we-work" },
      ]),
    ],
  },
  {
    path: "/contact",
    title: "Contact — Send a Nudge | Nudge Digital",
    description:
      "Get in touch with Harrison at Nudge Digital. Tell us about your digital marketing challenge and get a clear plan and pricing within 24 hours.",
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
    title: "Customer Success Stories & Testimonials | Nudge Digital",
    description:
      "Real results from real clients — PR agencies, SaaS start-ups, trade services, and e-commerce brands share their experience working with Nudge Digital.",
    priority: 0.7,
    changefreq: "monthly",
    schema: [
      {
        "@type": "AggregateRating",
        itemReviewed: { "@id": `${SITE_URL}/#business` },
        ratingValue: "5",
        bestRating: "5",
        ratingCount: "6",
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Customer Success", path: "/testimonials" },
      ]),
    ],
  },
  {
    path: "/resources",
    title: "Resources & Insights | Nudge Digital",
    description:
      "Practical digital marketing guides, insights, and resources from Nudge Digital — SEO, analytics, automation, and growth strategy.",
    priority: 0.6,
    changefreq: "weekly",
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions | Nudge Digital",
    description:
      "Common questions about working with Nudge Digital — pricing, process, engagement types, and what to expect.",
    priority: 0.5,
    changefreq: "monthly",
  },
  {
    path: "/calculator",
    title: "Marketing Savings Calculator | Nudge Digital",
    description:
      "Estimate how much you could save by working with a freelance digital marketing consultant instead of a full agency or in-house hire.",
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
  title: "Nudge Digital — Digital Marketing Strategist, Implementer & Fixer | Melbourne, Australia",
  description:
    "Senior freelance digital marketing strategist, implementer and fixer in Melbourne. SEO, CRM automation, GA4 analytics, paid media & fractional CMO. Fixed prices. No agency overhead.",
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
