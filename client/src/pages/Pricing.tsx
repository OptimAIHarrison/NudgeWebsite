import { useState } from 'react';
import { Check, Zap, Briefcase, TrendingUp, Repeat, ChevronDown, ArrowRight, Clock, DollarSign, Shield, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const ENGAGEMENT_MODELS = [
  {
    id: 'hourly',
    icon: Clock,
    label: 'Hourly',
    title: 'Hourly / Ad-hoc',
    tagline: 'Need a hand? Pay for exactly what you use.',
    rate: '$85–$115',
    rateUnit: '/ hour',
    rateSub: 'AUD · based on complexity',
    color: 'from-blue-500/20 to-blue-400/5',
    accentColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    description: 'Best for small, specific tasks where you know roughly what you need and want to keep things flexible. I log hours, you pay for what\'s used — nothing more.',
    bestFor: ['Quick audits', 'Ad-hoc fixes', 'Sanity checks', 'Advice calls'],
    includes: [
      'Scoped before we start so no surprises',
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
    color: 'from-accent/20 to-accent/5',
    accentColor: 'text-accent',
    badgeColor: 'bg-accent/10 text-accent border-accent/25',
    description: 'The most common way I work. You get a clear deliverable, a fixed price, and a defined timeline. I scope it, you approve it, I build it. Simple.',
    bestFor: ['CRM builds', 'Email automation', 'Full analytics setup', 'Website launches'],
    includes: [
      'Written scope & fixed quote before we start',
      'Milestone check-ins throughout',
      'Revisions within agreed scope',
      'Handover with documentation',
      'Post-delivery support (7 days)',
    ],
    cta: 'Get a Quote',
    featured: true,
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
    color: 'from-emerald-500/20 to-emerald-400/5',
    accentColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    description: 'For businesses that want consistent, senior-level marketing support each month — strategy, execution, and accountability — without the overhead of a full-time hire.',
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
    tagline: 'Senior marketing leadership without the full-time cost.',
    rate: 'From $4,500',
    rateUnit: '/ month',
    rateSub: 'AUD · scoped to your team',
    color: 'from-violet-500/20 to-violet-400/5',
    accentColor: 'text-violet-600',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
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
  { q: 'How does the quoting process work?', a: 'Send me a Nudge with what you need. I\'ll come back within 24 hours with a clear scope, fixed price, and timeline. No vague estimates — you see the full picture before committing to anything.' },
  { q: 'What if my project scope changes?', a: 'Project-based pricing is fixed for the agreed scope. If you want to add or change something significant, we\'ll adjust the quote together before moving forward. No nasty surprises.' },
  { q: 'Do you work within a set budget?', a: 'Yes. If you have a budget in mind, tell me upfront and I\'ll scope the work to fit it — or tell you honestly if it\'s not achievable. I\'d rather have that conversation early.' },
  { q: 'Are these prices negotiable?', a: 'Hourly rates are fixed. Project pricing reflects the actual work involved — but if your project is large or ongoing, there\'s room to find a structure that works for both of us.' },
  { q: 'What\'s not included in the price?', a: 'Any third-party tool costs (subscriptions, ad spend, etc.) are separate. I\'ll flag these during scoping so you know exactly what the total investment looks like.' },
  { q: 'Can I start with a small project and scale up?', a: 'Absolutely. Most of my long-term clients started with a single audit or small fix. There\'s no pressure to commit to more than you need right now.' },
];

const EXAMPLE_PROJECTS = [
  { name: 'GA4 + GTM Setup', type: 'Project', price: 'A$750', time: '2–3 days' },
  { name: 'Full Email Suite', type: 'Project', price: 'A$3,800', time: '2–3 weeks' },
  { name: 'HubSpot CRM Build', type: 'Project', price: 'A$1,800', time: '5–7 days' },
  { name: 'Landing Page Build', type: 'Project', price: 'A$1,400', time: '5–7 days' },
  { name: 'Monthly Growth Retainer', type: 'Retainer', price: 'From A$2,000/mo', time: 'Ongoing' },
  { name: 'Paid Media Management', type: 'Retainer', price: 'From A$2,500/mo', time: 'Ongoing' },
];

export default function Pricing() {
  const [activeModel, setActiveModel] = useState('project');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const current = ENGAGEMENT_MODELS.find(m => m.id === activeModel)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            All prices in AUD · GST not included
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Transparent pricing.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">No guesswork.</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Fixed prices on projects. Clear rates on hourly work. Custom scoping for retainers. You always know what you're spending before you commit.
          </p>
        </div>
      </section>

      {/* ── Engagement model selector ───────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">How would you like to work?</h2>
            <p className="text-foreground/50 text-sm">Select a model to see rates, what's included, and what it's best for.</p>
          </div>

          {/* Model toggle tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {ENGAGEMENT_MODELS.map(model => {
              const Icon = model.icon;
              const active = activeModel === model.id;
              return (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                    active
                      ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                      : 'bg-background text-foreground/65 border-foreground/15 hover:border-accent hover:text-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {model.label}
                  {model.featured && <span className="text-xs bg-white/20 rounded-full px-1.5 py-0.5">Popular</span>}
                </button>
              );
            })}
          </div>

          {/* Active model detail panel */}
          <div className={`rounded-3xl border-2 border-accent/30 bg-gradient-to-br ${current.color} overflow-hidden`}>
            <div className="grid md:grid-cols-2 gap-0">

              {/* Left — rate + description */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-background/70 backdrop-blur-sm border border-border">
                    {(() => { const Icon = current.icon; return <Icon className={`w-6 h-6 ${current.accentColor}`} />; })()}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${current.badgeColor}`}>
                    {current.label}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">{current.title}</h3>
                <p className={`text-sm font-bold uppercase tracking-widest mb-5 ${current.accentColor}`}>{current.tagline}</p>

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
                  <p className="text-xs font-bold text-foreground/35 uppercase tracking-widest mb-3">Best for</p>
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
                  <p className="text-xs font-bold text-foreground/35 uppercase tracking-widest mb-4">What's included</p>
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
        </div>
      </section>

      {/* ── Example projects / reference prices ────────────────────── */}
      <section className="py-16 bg-secondary/40 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Example prices for reference</h2>
            <p className="text-foreground/50 text-sm">Common projects and their typical investment. Every project is scoped individually.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXAMPLE_PROJECTS.map((p, i) => (
              <div key={i} className="bg-background rounded-2xl border-2 border-border hover:border-accent/40 p-4 flex items-center justify-between transition-all hover:shadow-md group">
                <div>
                  <p className="font-bold text-foreground text-sm">{p.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
                      p.type === 'Retainer'
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        : 'bg-accent/10 text-accent border-accent/20'
                    }`}>
                      {p.type}
                    </span>
                    <span className="text-xs text-foreground/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {p.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-foreground text-sm">{p.price}</p>
                  <p className="text-xs text-foreground/35 mt-0.5">from</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-foreground/40 mt-6">
            Want exact pricing? <Link href="/services-marketplace" className="text-accent underline">Browse the services shop</Link> for fixed prices on 38+ services.
          </p>
        </div>
      </section>

      {/* ── Honesty section ─────────────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border-2 border-border bg-background flex gap-4">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent h-fit flex-shrink-0"><DollarSign className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Fixed prices on projects</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">You approve the quote before I start. What I quote is what you pay.</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-border bg-background flex gap-4">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent h-fit flex-shrink-0"><Shield className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-foreground mb-1">No lock-in</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">Project-based by default. Retainers only if they make sense for you.</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border-2 border-border bg-background flex gap-4">
              <div className="p-2.5 rounded-xl bg-accent/10 text-accent h-fit flex-shrink-0"><Star className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Scope before payment</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">I scope every project first. No money changes hands until you're happy with the plan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-secondary/30 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Pricing questions</h2>
            <p className="text-foreground/50 text-sm">Everything you'd want to know before reaching out.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border-2 overflow-hidden transition-all ${
                  openFaq === idx ? 'border-accent shadow-md shadow-accent/10' : 'border-border hover:border-accent/40'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                >
                  <span className="font-bold text-foreground text-sm">{faq.q}</span>
                  <div className={`flex-shrink-0 p-1 rounded-full transition-all ${openFaq === idx ? 'bg-accent text-white' : 'bg-secondary text-foreground/40'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-foreground/65 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-accent/5 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Not sure what you need?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Send a Nudge and describe the situation. I'll come back with the right approach and a clear price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary text-lg px-8 py-6">
                Send a Nudge
              </Button>
            </Link>
            <Link href="/services-marketplace" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="text-lg px-8 py-6 border-2">
                Browse fixed-price services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
