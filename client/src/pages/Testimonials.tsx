import { useState } from 'react';
import { TrendingUp, Zap, Target, BarChart3, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const TESTIMONIALS = [
  {
    id: 1,
    company: 'PR Agency',
    quote: 'Honestly didn\'t expect the turnaround to be this fast. Harrison came in, figured out what we actually needed (not just what we asked for), and built it. Website, CRM, automations — all talking to each other. We\'ve clawed back hours every single week.',
    author: 'Kane',
    role: 'Founder',
    category: 'Agency & Automation',
    initials: 'K',
    color: 'bg-violet-500',
    featured: true,
  },
  {
    id: 2,
    company: 'AI SaaS Start-up',
    quote: 'We\'d thrown money at this problem before and gotten nowhere. Harrison looked at it for about ten minutes and knew exactly what was wrong. Tracking fixed, site integrated, content automated. I genuinely don\'t know how he works this fast.',
    author: 'Scott',
    role: 'Founder',
    category: 'Analytics & Tracking',
    initials: 'S',
    color: 'bg-cyan-500',
    featured: false,
  },
  {
    id: 3,
    company: 'Trade Services',
    quote: 'Look, I lay pipes for a living. I don\'t do websites or "content strategies." Harrison spoke to me like a normal person, didn\'t overcomplicate it, and just got it done. Phone\'s been ringing ever since. That\'s all I needed.',
    author: 'Justin',
    role: 'Self-Employed Tradie',
    category: 'Lead Generation & Web',
    initials: 'J',
    color: 'bg-amber-500',
    featured: false,
  },
  {
    id: 4,
    company: 'Retail & E-commerce',
    quote: 'We\'d been putting off sorting the online side of things for way too long. Harrison made it painless. The Shopify store looks great, the email flows are running, and for the first time I actually feel like the business has a proper system behind it.',
    author: 'Katie',
    role: 'Owner',
    category: 'E-commerce & CRM',
    initials: 'K',
    color: 'bg-rose-500',
    featured: true,
  },
  {
    id: 5,
    company: 'Home Goods Retailer',
    quote: 'Our data was a mess and we didn\'t even realise how bad it was until Harrison showed us. Within three months of him fixing the tracking, our lead quality was up 45%. It\'s the kind of thing that sounds boring until you see the numbers.',
    author: 'Sarah',
    role: 'Marketing Director',
    category: 'Analytics & Tracking',
    initials: 'S',
    color: 'bg-emerald-500',
    featured: false,
  },
  {
    id: 6,
    company: 'Tech Startup',
    quote: 'Every dev we\'d spoken to wanted to rebuild everything from scratch. Harrison just fixed it. Identified the issue, explained it clearly, sorted it out. Didn\'t oversell, didn\'t drag it out. Exactly what you want.',
    author: 'Adam',
    role: 'Founder',
    category: 'Technical Fixes',
    initials: 'A',
    color: 'bg-blue-500',
    featured: false,
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
    company: 'PR Agency',
    industry: 'Agency',
    icon: Target,
    color: 'from-violet-500/20 to-violet-400/5',
    accentColor: 'text-violet-600',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
    challenge: 'The agency had no cohesive digital infrastructure — website, CRM, and content were all disconnected and running manually. Time was being lost across every part of the business.',
    solution: 'Built the website, CRM, and content automation from the ground up — fully integrated so every system talks to each other without manual intervention.',
    results: [
      { stat: 'Hours', label: 'Saved every week' },
      { stat: 'Full stack', label: 'Built from scratch' },
      { stat: 'Ongoing', label: 'Engagement' },
    ],
    services: ['Website Build', 'CRM Setup', 'Content Automation', 'Systems Integration'],
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
  { stat: 'Weeks', label: 'Saved in trying to diagnose GTM problems' },
  { stat: '40hrs/wk', label: 'Saved through automation for a SaaS team' },
  { stat: '+67%', label: 'Conversion rate improvement for e-commerce' },
  { stat: '5+', label: 'Industries served and growing' },
];

export default function Testimonials() {
  const [activeStudy, setActiveStudy] = useState(0);

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
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">What clients say</h2>
            <p className="text-foreground/50">In their own words — unedited.</p>
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className={`break-inside-avoid rounded-2xl border-2 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  t.featured
                    ? 'border-accent/40 bg-accent/3 shadow-md shadow-accent/5'
                    : 'border-border bg-background hover:border-accent/30'
                }`}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-foreground/75 leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>

                {/* Author row */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground text-sm leading-tight">{t.author}</p>
                    <p className="text-xs text-foreground/45 leading-tight">{t.role} · {t.company}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold border bg-secondary text-foreground/50 border-border flex-shrink-0">
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
