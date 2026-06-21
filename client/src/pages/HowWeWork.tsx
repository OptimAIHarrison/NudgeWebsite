import { useState } from 'react';
import { MessageSquare, Lightbulb, Zap, CheckCircle, Clock, DollarSign, User, ArrowRight, Repeat, Package, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    number: '01',
    title: 'Send a Nudge',
    description: 'Tell me what\'s broken, what you need built, or what you want done. No brief required — just tell me in plain language what\'s going on.',
    icon: MessageSquare,
    detail: 'I read every message personally. Whether it\'s "fix my tracking" or "I need a full CRM setup", I\'ll understand what you need and come back fast.',
    time: 'You respond in minutes',
  },
  {
    number: '02',
    title: 'I Dig In & Reverse Brief',
    description: 'I research your situation, ask the right questions, and send back a clear scope — what I\'ll do, what it costs, and when it\'ll be done.',
    icon: Lightbulb,
    detail: 'No vague proposals. You get a specific plan: deliverables, timeline, and a fixed price. You know exactly what you\'re getting before you commit to anything.',
    time: 'Within a week',
  },
  {
    number: '03',
    title: 'You Sign Off',
    description: 'Review the plan, ask questions, adjust the scope. When you\'re happy, you give the green light and we get moving.',
    icon: CheckCircle,
    detail: 'No lock-in contracts, no retainer commitments unless you want one. Project-based by default — pay for what you need, when you need it.',
    time: 'On your timeline',
  },
  {
    number: '04',
    title: 'I Get to Work',
    description: 'Fast, focused execution. I keep you updated without drowning you in updates. Delivered on time, built to last.',
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
    description: 'Need senior marketing leadership without a full-time hire? I embed in your team and run the marketing function.',
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
  const [expandedStep, setExpandedStep] = useState<string | null>('01');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            Freelancer · Project-based · No agency overhead
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Simple process.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Real results.</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
            You send a Nudge. We chat. I get to work. No lengthy proposals, no retainer lock-ins, no hand-offs to juniors. Just focused execution from one senior digital marketer.
          </p>
          <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
            <Button className="btn-nudge-primary text-lg px-8 py-5">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Process steps ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">How it works</h2>
            <p className="text-foreground/55">Four steps from "I need help" to "it's done".</p>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-transparent" />

            <div className="space-y-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                const isOpen = expandedStep === step.number;
                return (
                  <div key={step.number} className="relative">
                    <button
                      onClick={() => setExpandedStep(isOpen ? null : step.number)}
                      className={`w-full text-left rounded-2xl border-2 p-6 transition-all duration-200 flex items-start gap-5 ${
                        isOpen
                          ? 'border-accent bg-accent/3 shadow-lg shadow-accent/10'
                          : 'border-border bg-background hover:border-accent/40 hover:shadow-md'
                      }`}
                    >
                      {/* Step icon */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                        isOpen ? 'bg-accent text-white' : 'bg-secondary text-foreground/50'
                      }`}>
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isOpen ? 'text-accent' : 'text-foreground/35'}`}>
                              Step {step.number}
                            </p>
                            <h3 className="text-xl md:text-2xl font-extrabold text-foreground mb-1">{step.title}</h3>
                            <p className="text-foreground/60 text-sm leading-relaxed">{step.description}</p>
                          </div>
                          <div className="flex-shrink-0 flex flex-col items-end gap-2 mt-1">
                            <span className="text-xs text-foreground/40 bg-secondary rounded-full px-2.5 py-1 border border-border whitespace-nowrap">
                              {step.time}
                            </span>
                            <div className={`p-1 rounded-full ${isOpen ? 'bg-accent/10' : 'bg-secondary'}`}>
                              <ArrowRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90 text-accent' : 'text-foreground/30'}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-2 ml-0 md:ml-21 px-6 py-4 rounded-2xl bg-accent/5 border border-accent/15">
                        <p className="text-sm text-foreground/70 leading-relaxed">{step.detail}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── How I can engage ────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">How we can work together</h2>
            <p className="text-foreground/55 max-w-xl mx-auto">Pick the model that suits your situation. No lock-in unless you want it.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {ENGAGEMENT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className={`rounded-2xl border-2 p-6 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    type.highlight
                      ? 'border-accent bg-accent/3 shadow-md shadow-accent/10'
                      : 'border-border bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl ${type.highlight ? 'bg-accent text-white' : 'bg-secondary text-foreground/60'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                      type.highlight
                        ? 'bg-accent/10 text-accent border-accent/25'
                        : 'bg-secondary text-foreground/50 border-border'
                    }`}>
                      {type.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-foreground/60 mb-5 leading-relaxed flex-1">{type.description}</p>

                  <div>
                    <p className="text-xs font-bold text-foreground/35 uppercase tracking-widest mb-2.5">Examples</p>
                    <div className="flex flex-wrap gap-1.5">
                      {type.examples.map((ex, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-background border border-border rounded-full text-foreground/60">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why me ──────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Why work with me directly</h2>
            <p className="text-foreground/55">Not an agency. Not a platform. One person who does the work.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {WHY_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex gap-4 p-5 rounded-2xl border-2 border-border bg-background hover:border-accent/40 transition-all">
                  <div className="flex-shrink-0 p-2.5 rounded-xl bg-accent/10 text-accent h-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{point.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{point.body}</p>
                  </div>
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
            Ready to get started?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Tell me what you need. I'll come back with a clear plan, a fixed price, and a start date.
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
