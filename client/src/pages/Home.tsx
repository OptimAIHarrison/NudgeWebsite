import { useState, useEffect } from 'react';
import { ArrowRight, Check, Search, Target, Zap, BarChart3, Lightbulb, Code } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const go = () => window.scrollTo(0, 0);

/* Hero centrepiece: every service, set up and running */
const SERVICES = [
  ['Marketing Strategy', 'Roadmap, ICP and channel plan'],
  ['Email Marketing', 'Onboarding and lifecycle flows'],
  ['CRM', 'Pipeline, scoring and routing'],
  ['Content Creation', 'Blogs, case studies, docs'],
  ['SEO & AI Search', 'Ranking, and cited in AI answers'],
  ['Paid Media', 'Google, LinkedIn and Meta'],
  ['Social Media', 'LinkedIn, X and community'],
  ['Analytics & Tracking', 'GA4, attribution, dashboards'],
  ['Marketing Automation', 'Workflows that run themselves'],
  ['Brand & Messaging', 'Positioning, site and sales assets'],
];

function ServicePanel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(-1);
      return;
    }
    const t = setInterval(() => setActive((a) => (a + 1) % SERVICES.length), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative z-10 w-full rounded-xl border border-white/15 bg-white/[0.06] shadow-2xl shadow-black/40 backdrop-blur-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="mono text-xs text-white/60">nudge / marketing-for-tech</span>
        <span className="mono text-xs text-[#5ce1b0] flex items-center gap-1.5">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#5ce1b0]" /> all systems running
        </span>
      </div>
      <ul className="p-3">
        {SERVICES.map(([name, detail], i) => {
          const current = active === i;
          return (
            <li
              key={name}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-300 ${current ? 'bg-[#8041b2]/25' : ''}`}
            >
              <span className={`h-2 w-2 flex-none rounded-full bg-[#5ce1b0] ${current ? 'live-dot' : ''}`} />
              <div className="min-w-0 flex-1">
                <p className="mono text-sm text-white">{name}</p>
                <p className="truncate text-xs text-white/50">{detail}</p>
              </div>
              <span className={`mono text-xs ${current ? 'text-[#b58ce0]' : 'text-white/30'}`}>{current ? 'running' : 'live'}</span>
            </li>
          );
        })}
      </ul>
      <div className="px-4 py-3 border-t border-white/10 mono text-xs text-white/45">
        Set up once. Working in the background.
      </div>
    </div>
  );
}

const PROBLEMS = [
  { problem: 'Signups that never activate', fix: 'Usage-triggered onboarding and lifecycle email, wired to your product events' },
  { problem: 'Pipeline nobody can attribute', fix: 'GA4, GTM, Segment and CRM stitched together so you can see what drives revenue' },
  { problem: 'Invisible in ChatGPT and Perplexity', fix: 'AI-search visibility: content, schema and citations that get you named in answers' },
  { problem: 'Founder-led marketing that has hit a ceiling', fix: 'A senior operator who runs the channels and builds the systems behind them' },
  { problem: 'Tool sprawl and manual lead handling', fix: 'CRM, enrichment, scoring and routing automated end to end in n8n, Make or Zapier' },
];

const WHO = [
  { group: 'Software & AI', items: ['AI & machine learning', 'SaaS & software', 'Developer tools & APIs', 'Data & infrastructure', 'Cybersecurity', 'No-code & automation platforms'] },
  { group: 'Products & hardware', items: ['Consumer tech & gadgets', 'Smart home & wearables', 'Robotics & drones', 'IoT & connected devices', 'Gaming & esports', 'Electric vehicles & mobility'] },
  { group: 'Industry tech', items: ['Fintech & regtech', 'Healthtech & medtech', 'Edtech', 'Proptech & construction tech', 'Cleantech & energy', 'Agritech', 'Legaltech & HR tech', 'Marketplaces & apps', 'IT services & platforms'] },
];

const PILLARS = [
  { icon: Target, name: 'Strategy & GTM', desc: 'ICP, positioning for crowded AI categories, launch plans, channel mix', id: 'strategic' },
  { icon: Zap, name: 'Marketing Ops & Automation', desc: 'CRM, enrichment, scoring, lifecycle flows, AI workflow automation', id: 'operations' },
  { icon: BarChart3, name: 'Performance & Analytics', desc: 'Paid, SEO, attribution, CRO, CAC and payback reporting', id: 'performance' },
  { icon: Lightbulb, name: 'Brand & Content', desc: 'Messaging, technical content, thought leadership, product launches', id: 'brand' },
  { icon: Code, name: 'Technical Fixes', desc: 'Tracking, tags, site speed, integrations, funnel diagnostics', id: 'technical' },
];

const CHANNELS = [
  ['SEO', 'Docs, integration and "alternative to" pages that rank; technical SEO for JavaScript-heavy sites'],
  ['AI search', 'Being cited in ChatGPT, Perplexity, Gemini and Google AI Overviews'],
  ['Paid media', 'Google, LinkedIn and Meta aimed at technical buyers, measured against pipeline, not clicks'],
  ['Email & lifecycle', 'Trial, onboarding and expansion sequences triggered by what users do in the product'],
  ['Content', 'Technical blogs, changelogs, case studies and founder-led LinkedIn that sound like you'],
  ['Social & community', 'LinkedIn, X, Reddit and the Slack and Discord communities your buyers are in'],
  ['Brand', 'Positioning, narrative, website and sales collateral that make a new category legible'],
];

const STACK = ['HubSpot', 'Salesforce', 'Segment', 'GA4', 'GTM', 'PostHog', 'Mixpanel', 'Looker Studio', 'Customer.io', 'Klaviyo', 'Clay', 'Apollo', 'n8n', 'Make', 'Zapier', 'Slack', 'Notion', 'Figma'];

const STEPS = [
  { n: '1', title: 'Send a Nudge', body: 'Tell me what is stuck: pipeline, tracking, launch, positioning. Plain language is fine.' },
  { n: '2', title: 'Scope and quote', body: 'A clear plan, a fixed price and a timeline, usually within two working days.' },
  { n: '3', title: 'Build and ship', body: 'I set it up, connect it to your stack and test it with real data. Weekly updates, no account managers.' },
  { n: '4', title: 'Run and improve', body: 'Documented handover, or I stay on to run the channels and keep tuning. Your call.' },
];

const PROOF = [
  { company: 'AI SaaS Start-up', tag: 'Analytics & Tracking', quote: "We'd thrown money at this problem before and gotten nowhere. Harrison looked at it for ten minutes and knew exactly what was wrong.", author: 'Scott · Founder', stat: '100%', label: 'tracking accuracy', metric: 'Analytics and automation fully connected' },
  { company: 'PR Agency', tag: 'Agency & Automation', quote: 'Harrison came in, figured out what we actually needed (not just what we asked for), and built it. Website, CRM, automations, all talking to each other.', author: 'Kane · Founder', stat: 'Hours', label: 'clawed back every week', metric: 'Full agency stack built from scratch' },
  { company: 'Trade Services', tag: 'Lead Generation & Web', quote: "Harrison spoke to me like a normal person, didn't overcomplicate it, and just got it done. Phone's been ringing ever since.", author: 'Justin · Self-Employed Tradie', stat: 'Consistent', label: 'inbound leads', metric: 'Website, socials and lead gen live' },
];

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero text-white">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#8041b2]/30 blur-3xl" aria-hidden />
        <div className="page-gutter relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mono mb-5 text-sm text-[#b58ce0]">A marketing partner for tech and AI startups</p>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl">
              You've built something amazing. Nudge knows how to market it.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Nudge is a marketing partner for tech companies and AI startups, and everything in that field: SaaS, dev tools, cybersecurity, fintech, hardware. Strategy, email, CRM, content, SEO and paid, plus the automation underneath, set up and running, with one senior operator accountable for it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" onClick={go}>
                <Button className="btn-nudge-primary px-7 py-6 text-base">Send a Nudge</Button>
              </Link>
              <Link href="/services" onClick={go}>
                <Button variant="outline" className="border-white/25 bg-transparent px-7 py-6 text-base text-white hover:bg-white/10 hover:text-white">
                  See what I run
                </Button>
              </Link>
              <button
                onClick={() => setSearchOpen(true)}
                className="mono inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Search className="h-4 w-4" aria-hidden />
                or search the site
              </button>
            </div>
          </div>
          <div className="relative">
            {/* Decorative rings, centred on the panel */}
            <div className="absolute left-1/2 top-1/2 hidden h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:block" aria-hidden />
            <div className="absolute left-1/2 top-1/2 hidden h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] lg:block" aria-hidden />
            <ServicePanel />
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-border">
        <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            ['10+ years', 'in digital marketing'],
            ['30 services', 'across five disciplines'],
            ['40+ tools', 'in the MarTech stack'],
            ['1 operator', 'no hand-offs, full accountability'],
          ].map(([a, b]) => (
            <div key={a}>
              <p className="mono flex items-center gap-2 text-xl font-semibold text-accent">
                <span className="ndot ndot-sm" aria-hidden />
                {a}
              </p>
              <p className="text-sm text-foreground/55">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              You built something technical. Marketing it is a different system.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-foreground/65">
              Technical buyers distrust fluff, products change weekly, and categories form overnight. Generic agencies bring a template. I come from the execution side: tracking, CRM, automation and channels, so the work fits how tech companies actually sell and grow.
            </p>
            <Link href="/about" onClick={go}>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                About Nudge <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <ul className="glass divide-y divide-accent/10 rounded-xl">
            {PROBLEMS.map((r) => (
              <li key={r.problem} className="p-5">
                <p className="text-sm text-foreground/45 line-through">{r.problem}</p>
                <p className="mt-1 font-medium">{r.fix}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who */}
      <section className="border-y border-border bg-secondary/40 py-14">
        <div className="container">
          <h2 className="h-dot text-2xl font-bold md:text-3xl">Built for teams in tech</h2>
          <p className="mt-2 max-w-2xl text-foreground/60">From software and AI to the products people hold in their hands. If it is technology, I can market it.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {WHO.map((g) => (
              <div key={g.group}>
                <p className="mb-3 text-sm font-semibold text-accent">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((w) => (
                    <span key={w} className="rounded-md border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm font-medium backdrop-blur">{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="py-20 md:py-24">
        <div className="container">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Five disciplines, one operator.</h2>
          <p className="mt-3 max-w-xl text-foreground/60">From go-to-market strategy to the integration nobody else wants to touch.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {PILLARS.map(({ icon: Icon, name, desc, id }) => (
              <Link key={id} href={`/services#${id}`} onClick={go}>
                <div className="group relative h-full rounded-xl border border-accent/15 bg-accent/[0.04] p-5 backdrop-blur transition-colors hover:border-accent hover:bg-accent/[0.08]">
                  <span className="ndot absolute right-4 top-4 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden />
                  <Icon className="mb-4 h-5 w-5 text-accent" />
                  <p className="font-semibold">{name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/55">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Channels, tech edition */}
      <section className="circles border-t border-border bg-secondary/40 py-20 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Traditional marketing, done the way tech buys.</h2>
            <p className="mt-4 text-foreground/60">Every proven channel, adapted for technical audiences, long evaluation cycles and product-led funnels.</p>
          </div>
          <dl className="glass divide-y divide-accent/10 rounded-xl">
            {CHANNELS.map(([k, v]) => (
              <div key={k} className="grid gap-1 p-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="mono text-sm font-medium text-accent">{k}</dt>
                <dd className="text-sm text-foreground/70">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Automation + stack */}
      <section className="circles circles-dark bg-ink py-20 text-white md:py-24">
        <div className="container">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Set up. Connected. Running.</h2>
          <p className="mt-4 max-w-2xl text-white/65">
            Lead capture, enrichment, scoring, routing, lifecycle email, reporting and AI-assisted workflows, built into your existing stack and documented so your team owns it. Automation that works on a Tuesday when nobody is watching.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span key={s} className="mono glass-dark rounded-md px-3 py-1.5 text-xs text-white/75">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold md:text-4xl">From Nudge to done.</h2>
          <p className="mt-3 text-foreground/60">No lengthy proposals, no kickoff marathons.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {STEPS.map((s) => (
              <li key={s.n} className="glass rounded-xl p-5">
                <span className="mono flex items-center gap-2 text-sm text-accent"><span className="ndot ndot-sm" aria-hidden />Step {s.n}</span>
                <p className="mt-2 font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{s.body}</p>
              </li>
            ))}
          </ol>
          <Link href="/how-we-work" onClick={go}>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">See the process in detail <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>

      {/* Proof */}
      <section className="circles border-t border-border bg-secondary/40 py-20 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold md:text-4xl">What actually happened.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PROOF.map((c, i) => (
              <figure key={c.company} className={`glass relative flex flex-col rounded-xl p-6 ${i === 0 ? '!border-accent/60' : ''}`}>
                {i === 0 && <span className="ndot absolute right-4 top-4" aria-hidden />}
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{c.company}</p>
                  <span className="mono text-xs text-foreground/50">{c.tag}</span>
                </div>
                <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-foreground/70">"{c.quote}"</blockquote>
                <figcaption className="mt-4 text-xs text-foreground/50">{c.author}</figcaption>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="mono text-2xl font-semibold text-accent">{c.stat}</p>
                  <p className="text-xs text-foreground/55">{c.label}</p>
                  <p className="mt-1 text-xs font-medium text-foreground/70">{c.metric}</p>
                </div>
              </figure>
            ))}
          </div>
          <Link href="/testimonials" onClick={go}>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">All case studies <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="circles circles-dark bg-ink py-20 text-white md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">Tell me what's stuck. I'll tell you what I'd ship first.</h2>
          <p className="mt-4 text-lg text-white/65">What I'd fix, what it costs and when it will be live, in plain terms.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" onClick={go}><Button className="btn-nudge-primary px-8 py-6 text-base">Send a Nudge</Button></Link>
            <Link href="/pricing" onClick={go}>
              <Button variant="outline" className="border-white/25 bg-transparent px-8 py-6 text-base text-white hover:bg-white/10 hover:text-white">See pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
