import { useState } from 'react';
import PageCTA from '@/components/PageCTA';
import PageHero from '@/components/PageHero';
import { MessageSquare, Lightbulb, Zap, CheckCircle, Clock, DollarSign, User, Repeat, Package, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    number: '01',
    title: 'Send a Nudge',
    description: 'Tell me what you are building and what is stuck: pipeline, tracking, a launch, positioning. No brief required, plain language is fine.',
    icon: MessageSquare,
    detail: 'I read every message personally. Whether it\'s "fix my tracking" or "I need a full CRM setup", I\'ll understand what you need and come back fast.',
    time: 'You respond in minutes',
  },
  {
    number: '02',
    title: 'I Dig In & Reverse Brief',
    description: 'I look at your product, market and current stack, ask the right questions, and send back a clear scope: what I will do, what it costs and when it will be live.',
    icon: Lightbulb,
    detail: 'No vague proposals. You get a specific plan: deliverables, timeline, and a fixed price. You know exactly what you\'re getting before you commit to anything.',
    time: 'Within a week',
  },
  {
    number: '03',
    title: 'You Sign Off',
    description: 'Review the plan, ask questions, adjust the scope. When you\'re happy, you give the green light and I get moving.',
    icon: CheckCircle,
    detail: 'No lock-in contracts, no retainer commitments unless you want one. Project-based by default — pay for what you need, when you need it.',
    time: 'On your timeline',
  },
  {
    number: '04',
    title: 'I Get to Work',
    description: 'I build it, connect it to your stack and test it with real data. Short updates, no meeting overload, documented so your team owns it.',
    icon: Zap,
    detail: 'You get regular check-ins, not radio silence. And when it\'s done, I hand over properly — documentation, walkthrough, and support to make sure it sticks.',
    time: 'Fast turnaround',
  },
];

const ENGAGEMENT_TYPES = [
  {
    icon: Package,
    title: 'One-Off Projects',
    description: 'Need something specific done? Pick a service, get a fixed price, done. No ongoing commitment.',
    examples: ['GA4 setup', 'Email sequence build', 'SEO audit', 'Landing page'],
    tag: 'Most common',
    highlight: true,
  },
  {
    icon: Repeat,
    title: 'Ongoing Retainer',
    description: 'Want consistent support each month? A retainer gives you regular hours and a dedicated focus on your growth.',
    examples: ['Monthly reporting', 'Paid media management', 'CRO testing', 'Strategy advisory'],
    tag: 'Great for scaling',
    highlight: false,
  },
  {
    icon: Layers,
    title: 'Fractional CMO',
    description: 'Need a senior marketing lead without a full-time hire? I embed in your tech team and run the marketing function.',
    examples: ['Team direction', 'Channel ownership', 'Vendor management', 'Board reporting'],
    tag: 'Senior expertise',
    highlight: false,
  },
];

const WHY_POINTS = [
  {
    icon: User,
    title: 'One person. Full accountability.',
    body: 'You deal with me directly — not an account manager passing messages to a junior. I do the work, I own the outcome.',
  },
  {
    icon: DollarSign,
    title: 'Fixed prices. No surprises.',
    body: 'You know the cost before you commit. No scope creep billing, no surprise invoices. What I quote is what you pay.',
  },
  {
    icon: Clock,
    title: 'Fast. Actually fast.',
    body: 'I respond within 24 hours and start work immediately on sign-off. No onboarding weeks, no project kickoff meetings that last a month.',
  },
  {
    icon: CheckCircle,
    title: 'No lock-in.',
    body: 'Project-based by default. Retainers available if you want them — but you\'re never locked into something that isn\'t working.',
  },
];

export default function HowWeWork() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="How I work"
        title="From Nudge to done."
        sub={'Four steps from "I need help" to "it is done". No lengthy proposals, no kickoff marathons.'}
      />

      <section className="py-14 md:py-20">
        <div className="container">
          <ol className="grid gap-4 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="glass rounded-xl p-5">
                <span className="mono flex items-center gap-2 text-sm text-accent">
                  <span className="ndot ndot-sm" aria-hidden />
                  Step {i + 1}
                </span>
                <p className="mt-2 font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">Ways to work together</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ENGAGEMENT_TYPES.map((t) => (
              <div key={t.title} className="glass rounded-xl p-5">
                <p className="font-semibold">{t.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">Why work with me directly</h2>
          <p className="mt-2 text-foreground/60">Not an agency. Not a platform. One person who does the work.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {WHY_POINTS.map((w) => (
              <div key={w.title} className="glass rounded-xl p-5">
                <p className="font-semibold">{w.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{w.body}</p>
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
