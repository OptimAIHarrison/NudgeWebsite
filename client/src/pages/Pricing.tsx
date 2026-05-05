import { useState } from 'react';
import { Check, Zap, Briefcase, TrendingUp, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Pricing() {
  const [expandedTier, setExpandedTier] = useState(-1);

  const pricingTiers = [
    {
      id: 1,
      icon: <Zap className="w-8 h-8" />,
      title: 'Freelance/Contract/Hourly',
      subtitle: 'Flexible hourly work',
      rate: '$75-100/hour',
      description: 'Perfect for specific technical problems and quick optimizations',
      color: 'from-blue-500/15 to-blue-400/5',
      examples: [
        'Fix broken tracking or pixels',
        'GA4 setup & audits',
        'Technical SEO quick fixes',
        'Email template debugging',
        'CRM workflow troubleshooting',
      ],
      note: 'Based on work complexity',
    },
    {
      id: 2,
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Quick Fixes',
      subtitle: 'Urgent technical issues',
      rate: '$85-115/hour',
      description: 'Emergency fixes and rapid problem-solving',
      color: 'from-orange-500/15 to-orange-400/5',
      examples: [
        'Broken tracking recovery',
        'Urgent pixel fixes',
        'Critical CRM issues',
        'Data integrity problems',
        'Performance optimization',
      ],
      note: 'Based on complexity of the mess',
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Project-Based',
      subtitle: 'Defined scope work',
      rate: '$1,000+ (avg $2,500)',
      description: 'Well-defined projects with clear deliverables',
      color: 'from-green-500/15 to-green-400/5',
      examples: [
        'Complete CRM implementation',
        'Website technical audit & fixes',
        'Marketing automation setup',
        'Email Marketing automation',
        'Database optimization',
        'Technical SEO implementation',
        'Analytics implementation',
      ],
      note: 'Grows based on scope & services needed',
    },
    {
      id: 4,
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Retainer/Ongoing',
      subtitle: 'Strategic leadership',
      rate: 'Custom',
      description: 'Senior-level expertise without the overhead',
      color: 'from-purple-500/15 to-purple-400/5',
      examples: [
        'Weekly strategic check-ins',
        'Hands-on technical implementation',
        'Marketing operations management',
        'Growth initiatives & optimization',
        'Monthly performance reporting',
        'Ongoing support & guidance',
      ],
      note: 'Tailored to your needs',
    },
  ];

  const customServices = [
    {
      icon: '🚀',
      title: 'Something Off the Charts?',
      description: 'Have a unique project or need something completely custom?',
      action: 'Get a Custom Quote',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Transparent Pricing
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Choose the engagement model that works for you. All prices in AUD.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={tier.id}
                onClick={() => setExpandedTier(expandedTier === idx ? -1 : idx)}
                className={`glass-card cursor-pointer transition-all duration-300 hover:shadow-lg border border-border group overflow-hidden ${
                  expandedTier === idx ? 'ring-2 ring-accent/50' : ''
                }`}
                style={{
                  animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform flex-shrink-0">
                    {tier.icon}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-foreground text-base leading-snug">{tier.title}</h3>
                    <p className="text-xs text-foreground/60 mt-1">{tier.subtitle}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-foreground/60 mb-1">Rate</p>
                  <p className="text-xl font-bold text-accent">{tier.rate}</p>
                </div>

                <p className="text-sm text-foreground/70 mb-4 line-clamp-3">{tier.description}</p>
                </div>

                {expandedTier === idx && (
                  <div className="px-6 pb-6 border-t border-border animate-fade-in max-h-96 overflow-y-auto">
                    <div className="pt-4">
                      <p className="text-xs font-semibold text-foreground/60 mb-3 uppercase">What's Included</p>
                      <ul className="space-y-2">
                        {tier.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-foreground/60 mb-2">💡 {tier.note}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom Quote Section */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center border border-border hover:border-accent/60 transition-colors" style={{ animation: 'slideIn 0.5s ease-out 0.4s both' }}>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-lg bg-accent/10 text-accent">
                  <Sparkles className="w-8 h-8" />
                </div>
              </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Need Something Tailored?</h3>
            <p className="text-foreground/70 mb-6">
              Every business is unique. If none of the above fit perfectly, let's create a custom solution that works for you.
            </p>
              <Link href="/contact">
                <Button className="btn-nudge-primary text-lg px-8 py-4">
                  Get a Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flexibility Note */}
      <section className="py-12 md:py-16 bg-accent/5 border-y border-accent/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">💡 Flexible & Transparent</h3>
            <p className="text-foreground/70 text-lg">
              The ranges above are indicative. Final pricing depends on project complexity, scope, timeline, and your specific needs. I work with you to find the right pricing structure that delivers value for both of us.
            </p>
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
                q: 'What if I need something completely different?',
                a: 'That\'s fine. I work with all kinds of projects. If your needs don\'t fit neatly into one of the pricing tiers above, let\'s chat about a custom solution.',
              },
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
              <div key={idx} className="glass-card p-6 hover:shadow-lg transition-all border border-border" style={{ animation: `slideIn 0.5s ease-out ${idx * 0.05}s both` }}>
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
