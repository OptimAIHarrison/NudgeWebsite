import { useState, useRef } from 'react';
import PageCTA from '@/components/PageCTA';
import PageHero from '@/components/PageHero';
import { Check, Briefcase, TrendingUp, Repeat, ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const ENGAGEMENT_MODELS = [
  {
    id: 'hourly',
    featured: true,
    icon: Clock,
    label: 'Hourly',
    title: 'Hourly / Ad-hoc',
    tagline: 'Need a hand? Pay for exactly what you use.',
    rate: '$85–$115',
    rateUnit: '/ hour',
    rateSub: 'AUD · based on complexity',
    color: 'from-accent/15 to-accent/[0.04]',
    accentColor: 'text-accent',
    badgeColor: 'bg-accent/10 text-accent border-accent/25',
    description: 'Best for small, specific tasks where you know roughly what you need and want to keep things flexible. I log hours, you pay for what\'s used — nothing more.',
    bestFor: ['Quick audits', 'Ad-hoc fixes', 'Sanity checks', 'Advice calls'],
    includes: [
      'Scoped before I start so no surprises',
      'Invoiced on completion',
      'Minimum 1 hour',
      'Same-week availability where possible',
    ],
    cta: 'Start with a Nudge',
  },
  {
    id: 'project',
    icon: Briefcase,
    label: 'Project',
    title: 'Project-Based',
    tagline: 'Fixed price. Fixed scope. No surprises.',
    rate: '$1,000–$6,000+',
    rateUnit: '',
    rateSub: 'AUD · avg project $2,500',
    color: 'from-accent/15 to-accent/[0.04]',
    accentColor: 'text-accent',
    badgeColor: 'bg-accent/10 text-accent border-accent/25',
    description: 'The most common way I work. You get a clear deliverable, a fixed price, and a defined timeline. I scope it, you approve it, I build it. Simple.',
    bestFor: ['CRM builds', 'Email automation', 'Full analytics setup', 'Website launches'],
    includes: [
      'Written scope & fixed quote before I start',
      'Milestone check-ins throughout',
      'Revisions within agreed scope',
      'Handover with documentation',
      'Post-delivery support (7 days)',
    ],
    cta: 'Get a Quote',
  },
  {
    id: 'retainer',
    icon: Repeat,
    label: 'Retainer',
    title: 'Monthly Retainer',
    tagline: 'Ongoing support, strategy, and execution.',
    rate: 'From $2,000',
    rateUnit: '/ month',
    rateSub: 'AUD · custom to your needs',
    color: 'from-accent/15 to-accent/[0.04]',
    accentColor: 'text-accent',
    badgeColor: 'bg-accent/10 text-accent border-accent/25',
    description: 'For tech teams that want consistent, senior-level marketing support each month — strategy, execution, and accountability — without the overhead of a full-time hire.',
    bestFor: ['Ongoing paid media', 'Monthly reporting', 'CRO testing', 'Growth strategy'],
    includes: [
      'Defined monthly hours & deliverables',
      'Weekly check-in calls',
      'Priority response time',
      'Access across all service areas',
      'Monthly performance review',
      'Scales up or down as needed',
    ],
    cta: 'Discuss a Retainer',
  },
  {
    id: 'fractional',
    icon: TrendingUp,
    label: 'Fractional CMO',
    title: 'Fractional CMO',
    tagline: 'Senior marketing leadership for your tech team, without the full-time cost.',
    rate: 'From $4,500',
    rateUnit: '/ month',
    rateSub: 'AUD · scoped to your team',
    color: 'from-accent/15 to-accent/[0.04]',
    accentColor: 'text-accent',
    badgeColor: 'bg-accent/10 text-accent border-accent/25',
    description: 'I embed into your business as your senior marketing lead — setting direction, managing channels, directing any existing team or vendors, and owning the results.',
    bestFor: ['Startups scaling up', 'Teams without a marketing lead', 'Board-level reporting', 'Full marketing ownership'],
    includes: [
      'Dedicated strategic direction',
      'Channel & vendor management',
      'Team direction & upskilling',
      'Board-ready reporting',
      'Full access across all disciplines',
      'Quarterly business reviews',
    ],
    cta: 'Let\'s Talk',
  },
];

const FAQS = [
  { q: 'How does the quoting process work?', a: 'Send me a Nudge with what you need. I\'ll come back within 24 hours and then within a week with a clear scope, fixed price, and timeline. No vague estimates — you see the full picture before committing to anything.' },
  { q: 'What if my project scope changes?', a: 'Project-based pricing is fixed for the agreed scope. If you want to add or change something significant, I\'ll adjust the quote with you before moving forward. No nasty surprises.' },
  { q: 'Do you work within a set budget?', a: 'Yes. If you have a budget in mind, tell me upfront and I\'ll scope the work to fit it — or tell you honestly if it\'s not achievable. I\'d rather have that conversation early.' },
  { q: 'Are these prices negotiable?', a: 'Hourly rates are fixed. Project pricing reflects the actual work involved — but if your project is large or ongoing, there\'s room to find a structure that works for both of us.' },
  { q: 'What\'s not included in the price?', a: 'Any third-party tool costs (subscriptions, ad spend, etc.) are separate. I\'ll flag these during scoping so you know exactly what the total investment looks like.' },
  { q: 'Can I start with a small project and scale up?', a: 'Absolutely. Most of my long-term clients started with a single audit or small fix. There\'s no pressure to commit to more than you need right now.' },
];

const EXAMPLE_PROJECTS = [
  { name: 'Analytics & Tracking Setup (GA4, GTM, Segment)', type: 'Project', price: 'A$750', time: '2–3 days' },
  { name: 'Lifecycle Email Suite (onboarding to win-back)', type: 'Project', price: 'A$3,800', time: '2–3 weeks' },
  { name: 'HubSpot CRM Build', type: 'Project', price: 'A$1,800', time: '5–7 days' },
  { name: 'Product Landing Page Build', type: 'Project', price: 'A$1,400', time: '5–7 days' },
  { name: 'Monthly Growth Retainer', type: 'Retainer', price: 'From A$2,000/mo', time: 'Ongoing' },
  { name: 'Paid Media Management', type: 'Retainer', price: 'From A$2,500/mo', time: 'Ongoing' },
];

export default function Pricing() {
  const [activeModel, setActiveModel] = useState('hourly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const current = ENGAGEMENT_MODELS.find(m => m.id === activeModel)!;
  const idx = ENGAGEMENT_MODELS.findIndex(m => m.id === activeModel);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const touchX = useRef<number | null>(null);

  // Carousel: wraps around at both ends
  const goTo = (i: number) => {
    const n = (i + ENGAGEMENT_MODELS.length) % ENGAGEMENT_MODELS.length;
    setDir(i > idx ? 'next' : 'prev');
    setActiveModel(ENGAGEMENT_MODELS[n].id);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goTo(idx + 1);
    if (e.key === 'ArrowLeft') goTo(idx - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <PageHero
        eyebrow={"Transparent pricing"}
        title={"Pricing for tech and AI teams"}
        sub={"Pick the model that suits your situation. Every project is scoped and quoted before you commit. Third-party tool costs and ad spend are separate."}
      />

      {/* ── Engagement model selector ───────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">How would you like to work?</h2>
            <p className="text-foreground/50 text-sm">Hourly is the quickest way to start. Swipe or use the tabs to see the other ways to work together.</p>
          </div>

          {/* Model toggle tabs */}
          <div role="tablist" aria-label="How to work together" onKeyDown={onKey} className="flex flex-wrap gap-2 justify-center mb-10">
            {ENGAGEMENT_MODELS.map(model => {
              const Icon = model.icon;
              const active = activeModel === model.id;
              return (
                <button
                  key={model.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => goTo(ENGAGEMENT_MODELS.indexOf(model))}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                    active
                      ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                      : 'bg-background text-foreground/65 border-foreground/15 hover:border-accent hover:text-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {model.label}
                  {model.featured && (
                    <span className={`text-xs rounded-full px-1.5 py-0.5 ${active ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}>Start here</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active model detail panel */}
          <div
            onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) goTo(idx + (dx < 0 ? 1 : -1));
            }}
          >
          <div key={current.id} className={`pricing-slide-${dir} rounded-3xl border-2 border-accent/30 bg-gradient-to-br ${current.color} overflow-hidden`}>
            <div className="grid md:grid-cols-2 gap-0">

              {/* Left — rate + description */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-background/70 backdrop-blur-sm border border-border">
                    {(() => { const Icon = current.icon; return <Icon className={`w-6 h-6 ${current.accentColor}`} />; })()}
                  </div>
                  <span className={`mono text-xs  px-3 py-1 rounded-full border ${current.badgeColor}`}>
                    {current.label}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">{current.title}</h3>
                <p className={`text-sm font-bold mono mb-5 ${current.accentColor}`}>{current.tagline}</p>

                {/* Big rate display */}
                <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-5 border border-border/60 mb-6">
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-wide mb-1">Rate</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">{current.rate}</span>
                    {current.rateUnit && <span className="text-lg text-foreground/50 font-semibold">{current.rateUnit}</span>}
                  </div>
                  <p className="text-xs text-foreground/40 mt-1">{current.rateSub}</p>
                </div>

                <p className="text-foreground/65 leading-relaxed text-sm mb-6">{current.description}</p>

                <div>
                  <p className="mono text-xs text-foreground/35 mb-3">Best for</p>
                  <div className="flex flex-wrap gap-2">
                    {current.bestFor.map((item, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 bg-background/60 border border-border rounded-full text-foreground/65 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — what's included + CTA */}
              <div className="p-8 md:p-10 flex flex-col">
                <div className="flex-1">
                  <p className="mono text-xs text-foreground/35 mb-4">What's included</p>
                  <ul className="space-y-3 mb-8">
                    {current.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-background/70 flex items-center justify-center flex-shrink-0 mt-0.5 border border-border">
                          <Check className={`w-3 h-3 ${current.accentColor}`} />
                        </div>
                        <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                    <Button className="btn-nudge-primary w-full text-base py-5">
                      {current.cta} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/services-marketplace" onClick={() => window.scrollTo(0, 0)}>
                    <button className={`w-full text-sm font-semibold py-3 text-center transition-colors ${current.accentColor} hover:opacity-70`}>
                      Browse fixed-price services →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => goTo(idx - 1)}
              aria-label="Previous option"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {ENGAGEMENT_MODELS.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${m.label}`}
                  className={`h-2.5 rounded-full transition-all ${i === idx ? 'w-7 bg-accent' : 'w-2.5 bg-accent/25 hover:bg-accent/50'}`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo(idx + 1)}
              aria-label="Next option"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-foreground/45">{idx + 1} of {ENGAGEMENT_MODELS.length}</p>
          </div>
        </div>
      </section>

      {/* Example prices */}
      <section className="border-y border-border bg-secondary/40 py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">Example prices for reference</h2>
          <p className="mt-2 text-foreground/60">Common projects and their typical investment. Every project is scoped individually.</p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-background">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-foreground/50">
                <tr>
                  <th className="p-4">Project</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {EXAMPLE_PROJECTS.map((e) => (
                  <tr key={e.name}>
                    <td className="p-4 font-medium">{e.name}</td>
                    <td className="p-4 text-foreground/60">{e.type}</td>
                    <td className="mono p-4 text-accent">{e.price}</td>
                    <td className="p-4 text-foreground/60">{e.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing questions */}
      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">Pricing questions</h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="glass rounded-xl p-5">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </div>
  );
}
