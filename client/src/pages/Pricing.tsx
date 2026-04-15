import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Pricing() {
  const [expandedCategory, setExpandedCategory] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  const pricingCategories = [
    {
      id: 0,
      title: 'One-Off Fixes',
      description: 'Quick technical fixes and optimizations',
      pricing: 'Hourly',
      rate: '$75-250/hour',
      examples: [
        'Fix broken tracking or pixels',
        'Audit and optimize GA4 setup',
        'Technical SEO quick fixes',
        'Email template debugging',
        'CRM workflow troubleshooting',
      ],
      details: 'Perfect for specific technical problems that need immediate attention.',
    },
    {
      id: 1,
      title: 'Project-Based',
      description: 'Defined scope with fixed pricing',
      pricing: 'Custom',
      rate: '$5,000-$20,000+',
      examples: [
        'Complete CRM implementation',
        'Website technical audit & fixes',
        'Marketing automation setup',
        'Email Marketing (EDM) automation setup',
        'Database optimization & integration',
        'Technical SEO implementation',
        'Data infrastructure rebuild',
        'Analytics implementation',
      ],
      details: 'Best for well-defined projects with clear deliverables and timelines.',
    },
    {
      id: 2,
      title: 'Strategy Services',
      description: 'Strategic advisory and planning',
      pricing: 'Custom',
      rate: '$3,500-$7,500',
      examples: [
        'Digital marketing audit',
        'Growth strategy development',
        'MarTech stack consulting',
        'Competitive analysis',
        'Roadmap creation',
      ],
      details: 'Get expert strategic guidance to plan your digital marketing direction.',
    },
    {
      id: 3,
      title: 'Implementation Retainer',
      description: 'Ongoing strategic leadership and execution',
      pricing: 'Monthly',
      rate: '$4,000-$10,000+/month',
      examples: [
        'Weekly strategic check-ins',
        'Hands-on technical implementation',
        'Marketing operations management',
        'Growth initiatives & optimization',
        'Monthly performance reporting',
      ],
      details: 'Senior-level expertise without the overhead of a full-time hire.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Indicative Pricing
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Value-based pricing reflecting expertise and impact. All prices in AUD. Custom solutions available.
          </p>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {pricingCategories.map((category, idx) => (
              <div key={category.id} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === idx ? -1 : idx)}
                  className="w-full p-8 flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{category.title}</h3>
                    <p className="text-foreground/60">{category.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-accent font-semibold mb-1">{category.pricing}</p>
                    <p className="text-2xl font-bold text-foreground">{category.rate}</p>
                    <ChevronDown
                      className={`w-6 h-6 text-accent mt-2 transition-transform ${
                        expandedCategory === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {expandedCategory === idx && (
                  <div className="border-t border-border p-8 bg-accent/5 animate-slide-in-down">
                    <p className="text-foreground/70 mb-6">{category.details}</p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Typical Services:</h4>
                      <ul className="space-y-3">
                        {category.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border">
                      <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                        <Button className="btn-nudge-primary text-lg px-8 py-6 w-full">
                          Send a Nudge
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pricing FAQ</h2>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Can you customize a package?</h3>
              <p className="text-foreground/60">
                Absolutely. These are indicative prices. I can tailor solutions based on your specific requirements, scope, and timeline.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">What payment terms do you offer?</h3>
              <p className="text-foreground/60">
                For projects: 50% upfront and 50% upon completion. For retainers: monthly in advance. Flexible terms available for longer commitments.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Do you offer discounts for longer commitments?</h3>
              <p className="text-foreground/60">
                Yes. Longer retainer commitments (6+ months) can include pricing adjustments and priority support.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">How do I know which option is right for me?</h3>
              <p className="text-foreground/60">
                That's what the initial consultation is for. Send me a nudge with your situation, and I'll recommend the best approach for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Discuss Your Growth Strategy
          </h2>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
            Every business is unique. Let me understand your challenges and create a custom solution.
          </p>
          <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
            <Button className="btn-nudge-primary text-lg px-8 py-6">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
