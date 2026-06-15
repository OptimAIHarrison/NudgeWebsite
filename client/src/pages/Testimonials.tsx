import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Zap, Target, BarChart3, Quote, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const TESTIMONIALS = [
  {
    id: 1,
    company: 'PR Agency',
    quote: 'Harrison completely transformed how our agency operates. He built out our website, CRM and content automation from the ground up — and it all works seamlessly together. We\'re saving hours every week and our clients are getting better results.',
    author: 'Kane',
    role: 'Founder',
    category: 'Agency & Automation',
  },
  {
    id: 2,
    company: 'AI SaaS Start-up',
    quote: 'We\'d been battling tracking issues and couldn\'t get our custom site to talk to our analytics. Harrison solved both in no time. He also set up our content automation and now everything just runs. Genuinely impressive.',
    author: 'Scott',
    role: 'Founder',
    category: 'Analytics & Tracking',
  },
  {
    id: 3,
    company: 'Trade Services',
    quote: 'Harrison sorted everything — website, socials, content plan and lead gen. As a tradie, I don\'t have time to figure this stuff out. He made it simple, got it done, and now the leads are coming in consistently.',
    author: 'Justin',
    role: 'Self-Employed Tradie',
    category: 'Lead Generation & Web',
  },
  {
    id: 4,
    company: 'Retail & E-commerce',
    quote: 'We needed a proper online presence and a system to match. Harrison built our Shopify store, set up our email CRM and created templates we actually use. It\'s made a real difference to how we run the business.',
    author: 'Katie',
    role: 'Owner',
    category: 'E-commerce & CRM',
  },
  {
    id: 5,
    company: 'Home Goods Retailer',
    quote: 'Harrison fixed our tracking issues and we saw a 45% improvement in lead quality within 3 months. He found problems we didn\'t even know we had.',
    author: 'Sarah',
    role: 'Marketing Director',
    category: 'Analytics & Tracking',
  },
  {
    id: 6,
    company: 'Tech Startup',
    quote: 'His technical expertise solved problems that were costing us monthly. He came in, diagnosed the issue fast, and fixed it. No fuss.',
    author: 'Adam',
    role: 'Founder',
    category: 'Technical Fixes',
  },
  {
    id: 7,
    company: 'Digital Agency',
    quote: 'As an agency, we rely on Harrison for specialised technical implementation. He delivers every time, on scope, on time — and our clients love the results.',
    author: 'Emma',
    role: 'Agency Director',
    category: 'Agency Partnership',
  },
];

const CASE_STUDIES = [
  {
    id: 1,
    company: 'E-commerce Brand',
    industry: 'Retail',
    icon: TrendingUp,
    color: 'from-emerald-500/20 to-emerald-400/5',
    accentColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    challenge: 'Broken tracking and invisible customer journeys. They were running paid media blind — no idea what was converting or why.',
    solution: 'GA4 full implementation, GTM overhaul, attribution model, checkout funnel fixes, and a live performance dashboard.',
    results: [
      { stat: '+27%', label: 'Conversion rate' },
      { stat: '$50K+', label: 'Additional revenue' },
      { stat: '4 months', label: 'Timeline' },
    ],
    services: ['GA4 Setup', 'GTM Audit', 'CRO', 'Attribution'],
  },
  {
    id: 2,
    company: 'SaaS Company',
    industry: 'Software',
    icon: Zap,
    color: 'from-cyan-500/20 to-cyan-400/5',
    accentColor: 'text-cyan-600',
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    challenge: 'Manual workflows consuming 40 hours a week. No CRM, no automation, sales and marketing running on spreadsheets.',
    solution: 'HubSpot CRM build, lead scoring model, automated nurture sequences, and full sales pipeline configuration.',
    results: [
      { stat: '40hrs', label: 'Saved per week' },
      { stat: '$85K', label: 'Annual savings' },
      { stat: '2 months', label: 'Timeline' },
    ],
    services: ['CRM Build', 'Lead Scoring', 'Email Automation', 'Workflow'],
  },
  {
    id: 3,
    company: 'Marketing Agency',
    industry: 'Agency',
    icon: Target,
    color: 'from-violet-500/20 to-violet-400/5',
    accentColor: 'text-violet-600',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
    challenge: 'Clients demanding technical SEO and implementation that the agency couldn\'t deliver in-house. Risk of losing accounts.',
    solution: 'Embedded as fractional technical resource — delivering SEO audits, implementations, and reporting directly for their clients.',
    results: [
      { stat: '+2', label: 'New revenue streams' },
      { stat: '$15K+', label: 'Monthly client revenue' },
      { stat: 'Ongoing', label: 'Engagement' },
    ],
    services: ['Technical SEO', 'Fractional Support', 'Client Reporting'],
  },
  {
    id: 4,
    company: 'B2B SaaS Platform',
    industry: 'Technology',
    icon: BarChart3,
    color: 'from-amber-500/20 to-amber-400/5',
    accentColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    challenge: 'Multiple data sources, inconsistent reporting, and zero trust in the numbers. Leadership making decisions on bad data.',
    solution: 'Unified tracking infrastructure, clean GTM setup, cross-platform attribution, and custom dashboards per stakeholder.',
    results: [
      { stat: '+34%', label: 'Data accuracy' },
      { stat: '6 weeks', label: 'Timeline' },
      { stat: '1 source', label: 'Of truth' },
    ],
    services: ['Data Infrastructure', 'GTM Cleanup', 'Custom Dashboards'],
  },
];

const IMPACT_STATS = [
  { stat: '$500K+', label: 'Additional revenue driven for one client' },
  { stat: '40hrs/wk', label: 'Saved through automation for a SaaS team' },
  { stat: '+67%', label: 'Conversion rate improvement for e-commerce' },
  { stat: '4+', label: 'Industries served and growing' },
];

export default function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeStudy, setActiveStudy] = useState(0);

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const study = CASE_STUDIES[activeStudy];
  const StudyIcon = study.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            Real clients · Real results · No fluff
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Results that<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">speak for themselves.</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-10">
            From fixing broken tracking to building full marketing systems — here's what actually happened when clients brought me in.
          </p>

          {/* Impact stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {IMPACT_STATS.map((s, i) => (
              <div key={i} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <p className="text-2xl font-extrabold text-accent leading-none mb-1">{s.stat}</p>
                <p className="text-xs text-foreground/50 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">What clients say</h2>
            <p className="text-foreground/50">Direct quotes from people I've worked with.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => setTestimonialIndex(idx)}
                className={`rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                  testimonialIndex === idx
                    ? 'border-accent bg-accent/3 shadow-lg shadow-accent/10'
                    : 'border-border bg-background hover:border-accent/40 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Quote className={`w-6 h-6 flex-shrink-0 mt-0.5 ${testimonialIndex === idx ? 'text-accent' : 'text-foreground/20'}`} />
                  <p className={`text-sm leading-relaxed italic ${testimonialIndex === idx ? 'text-foreground' : 'text-foreground/65'}`}>
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.author}</p>
                    <p className="text-xs text-foreground/50">{t.role} · {t.company}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    testimonialIndex === idx
                      ? 'bg-accent/10 text-accent border-accent/25'
                      : 'bg-secondary text-foreground/40 border-border'
                  }`}>
                    {t.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies — interactive ───────────────────────────────── */}
      <section className="py-20 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Case studies</h2>
            <p className="text-foreground/50">Select a project to see what happened.</p>
          </div>

          {/* Case study selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {CASE_STUDIES.map((s, idx) => {
              const Icon = s.icon;
              const active = activeStudy === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStudy(idx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    active ? 'border-accent bg-accent/5 shadow-md shadow-accent/10' : 'border-border bg-background'
                  }`}
                >
                  <div className={`p-2 rounded-lg w-fit mb-2 ${active ? 'bg-accent/15' : 'bg-secondary'}`}>
                    <Icon className={`w-4 h-4 ${active ? 'text-accent' : 'text-foreground/50'}`} />
                  </div>
                  <p className={`text-sm font-bold leading-tight ${active ? 'text-accent' : 'text-foreground'}`}>{s.company}</p>
                  <p className="text-xs text-foreground/40 mt-0.5">{s.industry}</p>
                </button>
              );
            })}
          </div>

          {/* Active case study detail */}
          <div className={`rounded-3xl border-2 border-accent/30 bg-gradient-to-br ${study.color} overflow-hidden`}>
            <div className="grid md:grid-cols-2">

              {/* Left — challenge + solution */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-background/70 border border-border">
                    <StudyIcon className={`w-6 h-6 ${study.accentColor}`} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-foreground text-xl">{study.company}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${study.badgeColor}`}>{study.industry}</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">The Challenge</p>
                    <p className="text-sm text-foreground/70 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2">What I Did</p>
                    <p className="text-sm text-foreground/70 leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-2.5">Services Used</p>
                    <div className="flex flex-wrap gap-2">
                      {study.services.map((s, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-background/60 border border-border rounded-full text-foreground/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — results */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-6">The Results</p>
                  <div className="space-y-4">
                    {study.results.map((r, i) => (
                      <div key={i} className="bg-background/60 backdrop-blur-sm rounded-2xl p-5 border border-border/60">
                        <p className={`text-4xl font-extrabold ${study.accentColor} leading-none mb-1`}>{r.stat}</p>
                        <p className="text-sm text-foreground/55">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                    <Button className="btn-nudge-primary w-full py-5">
                      Get similar results <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value proposition strip ─────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Why clients keep coming back</h2>
            <p className="text-foreground/50">Not what I say — what the pattern of results shows.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: CheckCircle, title: 'Problems diagnosed fast', body: 'I don\'t spend weeks in discovery. I come in, assess the situation, and tell you what\'s actually wrong — usually within days.' },
              { icon: Zap, title: 'Execution, not just advice', body: 'I don\'t write recommendations and hand them to someone else. I do the work — implementation, testing, optimisation.' },
              { icon: Clock, title: 'Results you can measure', body: 'Every engagement starts with clear success metrics. You always know if it worked, by how much, and why.' },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="rounded-2xl border-2 border-border bg-background p-6 hover:border-accent/40 transition-all">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-accent/5 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Want results like these?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Tell me what's not working. I'll tell you exactly what I'd do about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary text-lg px-8 py-6">
                Send a Nudge
              </Button>
            </Link>
            <Link href="/services" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="text-lg px-8 py-6 border-2">
                Explore services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
