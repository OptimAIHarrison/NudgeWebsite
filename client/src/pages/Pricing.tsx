import { useState } from 'react';
import { ChevronDown, Check, Zap, Briefcase, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Pricing() {
  const [hourlyRate, setHourlyRate] = useState(75);
  const [projectScope, setProjectScope] = useState(50);
  const [expandedCategory, setExpandedCategory] = useState(0);

  const pricingTiers = [
    {
      id: 1,
      icon: <Zap className="w-8 h-8" />,
      title: 'Freelance/Contract/Hourly',
      subtitle: 'Quick Fixes & Ad-Hoc Work',
      description: 'Perfect for specific technical problems and quick optimizations',
      baseRate: '$75-100/hour',
      color: 'from-blue-500/15 to-blue-400/5',
      examples: [
        'Fix broken tracking or pixels',
        'GA4 setup & audits',
        'Technical SEO quick fixes',
        'Email template debugging',
        'CRM workflow troubleshooting',
      ],
    },
    {
      id: 2,
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Project-Based',
      subtitle: 'Defined Scope & Deliverables',
      description: 'Well-defined projects with clear scope and fixed timelines',
      baseRate: '$5,000-$25,000+',
      color: 'from-purple-500/15 to-purple-400/5',
      examples: [
        'Complete CRM implementation',
        'Website technical audit & fixes',
        'Marketing automation setup',
        'Email Marketing automation',
        'Database optimization',
        'Technical SEO implementation',
        'Analytics implementation',
      ],
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Retainer/Ongoing',
      subtitle: 'Strategic Leadership & Execution',
      description: 'Senior-level expertise without the overhead of a full-time hire',
      baseRate: '$4,000-$10,000+/month',
      color: 'from-green-500/15 to-green-400/5',
      examples: [
        'Weekly strategic check-ins',
        'Hands-on technical implementation',
        'Marketing operations management',
        'Growth initiatives & optimization',
        'Monthly performance reporting',
      ],
    },
  ];

  const serviceScales = [
    {
      name: 'Strategy & Planning',
      description: 'Digital marketing audit, growth strategy, roadmap creation',
      range: '$3,500-$7,500',
      icon: '📋',
    },
    {
      name: 'Automation & Workflows',
      description: 'CRM setup, email automation, marketing workflows',
      range: '$5,000-$15,000',
      icon: '⚙️',
    },
    {
      name: 'Technical Implementation',
      description: 'GA4 setup, technical SEO, tracking implementation',
      range: '$4,000-$12,000',
      icon: '🔧',
    },
    {
      name: 'Data & Analytics',
      description: 'Database optimization, reporting dashboards, data integration',
      range: '$6,000-$18,000',
      icon: '📊',
    },
    {
      name: 'Full-Service Projects',
      description: 'Complete system builds, end-to-end implementations',
      range: '$15,000-$50,000+',
      icon: '🚀',
    },
  ];

  const calculateProjectCost = () => {
    const baseMultiplier = 1 + projectScope / 100;
    return Math.round(10000 * baseMultiplier);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dynamic Pricing
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Flexible pricing that adapts to your needs. All prices in AUD. These are indicative ranges—custom solutions available based on your specific requirements.
          </p>
        </div>
      </section>

      {/* Three Main Pricing Tiers */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <div key={tier.id} className={`glass-card p-8 border-l-4 border-accent hover:shadow-lg transition-all`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{tier.title}</h3>
                    <p className="text-sm text-accent font-semibold">{tier.subtitle}</p>
                  </div>
                </div>

                <p className="text-foreground/70 mb-4 text-sm">{tier.description}</p>

                <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <p className="text-sm text-foreground/60 mb-1">Starting Rate</p>
                  <p className="text-2xl font-bold text-accent">{tier.baseRate}</p>
                </div>

                <div className="space-y-2">
                  {tier.examples.map((example, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/70">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Pricing Note */}
      <section className="py-12 md:py-16 bg-accent/5 border-y border-accent/20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">💡 Pricing is Flexible</h3>
            <p className="text-foreground/70 text-lg">
              The ranges above are indicative. Final pricing depends on project complexity, scope, timeline, and your specific needs. I work with you to find the right pricing structure that delivers value for both of us.
            </p>
          </div>
        </div>
      </section>

      {/* Service-Based Pricing Scale */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Service-Based Pricing Scale</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Larger projects scale based on complexity and scope
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {serviceScales.map((service, idx) => (
              <div key={idx} className="glass-card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground">{service.name}</h4>
                    <p className="text-sm text-foreground/60 mt-1">{service.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-foreground/60 mb-1">Typical Range</p>
                  <p className="text-xl font-bold text-accent">{service.range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Pricing Calculator */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Project Pricing Example</h2>
              <p className="text-xl text-foreground/60">
                See how pricing scales based on project complexity
              </p>
            </div>

            <div className="glass-card p-8 space-y-8">
              {/* Hourly Rate Slider */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">
                  Hourly Rate: <span className="text-accent">${hourlyRate}/hour</span>
                </label>
                <input
                  type="range"
                  min="75"
                  max="150"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-foreground/50 mt-2">
                  <span>$75/hr (Quick fixes)</span>
                  <span>$150/hr (Complex work)</span>
                </div>
              </div>

              {/* Project Scope Slider */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-4">
                  Project Complexity: <span className="text-accent">{projectScope}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={projectScope}
                  onChange={(e) => setProjectScope(Number(e.target.value))}
                  className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-foreground/50 mt-2">
                  <span>Simple (0%)</span>
                  <span>Complex (200%+)</span>
                </div>
              </div>

              {/* Estimated Cost */}
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6 border border-accent/20">
                <p className="text-sm text-foreground/60 mb-2">Estimated Project Cost</p>
                <p className="text-4xl font-bold text-accent">${calculateProjectCost().toLocaleString()}</p>
                <p className="text-sm text-foreground/50 mt-3">
                  Based on ~{Math.round(calculateProjectCost() / hourlyRate)} hours at ${hourlyRate}/hour
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground/60 mb-4">
                  💡 This is an example. Actual pricing depends on your specific needs, timeline, and project requirements.
                </p>
                <Link href="/contact">
                  <Button className="btn-nudge-primary w-full">
                    Get a Custom Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pricing FAQs</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Can you work within my budget?',
                a: 'Absolutely. I work with clients to find the right engagement model. Whether you need hourly support, a project-based engagement, or a retainer, we can make it work.',
              },
              {
                q: 'What if my project scope changes?',
                a: 'Project-based pricing is fixed for the agreed scope. If scope changes, we adjust the timeline or pricing accordingly. Retainers are flexible and can scale up or down based on needs.',
              },
              {
                q: 'Do you offer discounts for longer engagements?',
                a: 'Yes. Retainer clients and longer-term projects typically receive better rates. Let\'s discuss what works for you.',
              },
              {
                q: 'What\'s included in your pricing?',
                a: 'Pricing includes the work itself, communication, revisions within scope, and documentation. Travel or third-party costs are additional.',
              },
              {
                q: 'How do you determine final pricing?',
                a: 'I consider project complexity, timeline, your business goals, and current workload. We\'ll discuss options and find the best fit.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="glass-card p-6">
                <h4 className="font-bold text-foreground mb-2">{faq.q}</h4>
                <p className="text-foreground/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
            Let's discuss your project and find the right pricing structure for your needs.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary text-lg px-8 py-4">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
