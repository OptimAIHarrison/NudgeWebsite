import { useState } from 'react';
import { Search, MessageSquare, Lightbulb, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: 1,
    title: 'Search What You Need',
    description: 'From "fix my tags" to "write a welcome email", type it in and see how we can help.',
    icon: Search,
    details: [
      'Use our search to find the exact service you need',
      'Browse our five pillars of expertise',
      'Get clarity on what we can deliver',
    ],
  },
  {
    number: 2,
    title: 'Send Us a Brief Nudge',
    description: 'No service is too large or too small. Tell us what is stuck, what you need, or what you want done.',
    icon: MessageSquare,
    details: [
      'Quick, simple contact form',
      'No jargon required',
      'We understand your challenge',
    ],
  },
  {
    number: 3,
    title: 'We Research & Reverse Brief',
    description: 'We check the details, dig in, and send back a clear plan, pricing, and timeframes.',
    icon: Lightbulb,
    details: [
      'We understand your business',
      'Clear plan and pricing',
      'You are on the same page before we dive in',
    ],
  },
  {
    number: 4,
    title: 'We Get to Work',
    description: 'You sign off, and we get to the doing. Fast, focused, and without the fluff.',
    icon: Zap,
    details: [
      'Rapid execution',
      'Regular updates',
      'Measurable results',
    ],
  },
];

export default function HowWeWork() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How We Work
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl">
            A simple, transparent process designed to get you results fast.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute left-12 top-24 bottom-0 w-1 bg-gradient-to-b from-accent to-accent/20" />
                  )}

                  <button
                    onClick={() => setExpandedStep(expandedStep === step.number ? null : step.number)}
                    className="w-full glass-card p-8 flex items-start gap-6 hover:border-accent/50 transition-all text-left"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-400">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-accent mb-1">Step {step.number}</p>
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-foreground/60">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedStep === step.number && (
                    <div className="glass-panel p-8 mt-4 animate-slide-in-down">
                      <h4 className="font-semibold text-foreground mb-4">What This Includes:</h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-accent font-bold mt-1">•</span>
                            <span className="text-foreground/80">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why This Process Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6">
              <h3 className="font-semibold text-foreground mb-3">No Surprises</h3>
              <p className="text-foreground/60 text-sm">
                You know exactly what you are getting, how much it costs, and when it will be done before we start.
              </p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-semibold text-foreground mb-3">Fast Turnaround</h3>
              <p className="text-foreground/60 text-sm">
                We respond within 24 hours and get to work immediately. No delays, no excuses.
              </p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-semibold text-foreground mb-3">Clear Communication</h3>
              <p className="text-foreground/60 text-sm">
                We use plain language and avoid jargon. You always know what is happening.
              </p>
            </div>
            <div className="glass-panel p-6">
              <h3 className="font-semibold text-foreground mb-3">Results Focused</h3>
              <p className="text-foreground/60 text-sm">
                We measure success by your outcomes, not by hours worked or tasks completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Nudge?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Tell us what you need help with. We will respond with a clear plan and pricing within 24 hours.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-accent hover:bg-white/90 px-8 py-3 rounded-lg font-semibold">
              Send Us a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
