import { useState } from 'react';
import PageCTA from '@/components/PageCTA';
import PageHero from '@/components/PageHero';
import { TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const TESTIMONIALS = [
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
];

const CASE_STUDIES = [
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
];

const IMPACT_STATS = [
  { stat: 'Weeks', label: 'Saved in trying to diagnose GTM problems' },
  { stat: '40hrs/wk', label: 'Saved through automation for a SaaS team' },
  { stat: '+67%', label: 'Conversion rate improvement for e-commerce' },
  { stat: '5+', label: 'Industries served and growing' },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Real clients · Real results"
        title="Results that speak for themselves."
        sub="From AI and SaaS teams to growing businesses: fixing broken tracking, building full marketing systems and getting automation running."
      />

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {IMPACT_STATS.map((s, i) => (
              <div key={i}>
                <p className="mono text-2xl font-semibold text-accent">{s.stat}</p>
                <p className="text-sm text-foreground/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="circles border-y border-border bg-secondary/40 py-14 md:py-20">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.company} className={`glass relative m-0 flex flex-col rounded-xl p-6 ${i < 2 ? '!border-accent/60' : ''}`}>
                {i === 0 && <span className="ndot absolute right-4 top-4" aria-hidden />}
                <p className="font-semibold">{t.company}</p>
                <blockquote className="m-0 mt-3 flex-1 text-sm italic leading-relaxed text-foreground/70">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-xs text-foreground/50">
                  {t.author} · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">Case studies</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {CASE_STUDIES.map((c) => (
              <div key={c.company} className="glass rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{c.company}</p>
                  <span className="mono text-xs text-foreground/50">{c.industry}</span>
                </div>
                {c.challenge && (
                  <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                    <span className="font-semibold text-foreground">Challenge: </span>
                    {c.challenge}
                  </p>
                )}
                {c.solution && (
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    <span className="font-semibold text-foreground">Solution: </span>
                    {c.solution}
                  </p>
                )}
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
                  {(c.results as any[]).map((r, i) => (
                    <div key={i}>
                      <p className="mono font-semibold text-accent">{r.stat ?? r}</p>
                      <p className="text-xs text-foreground/55">{r.label ?? ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </div>
  );
}
