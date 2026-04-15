import { Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface PricingPackage {
  name: string;
  description: string;
  priceFrom: number;
  priceTo: number;
  frequency: string;
  features: string[];
  highlighted?: boolean;
}

const packages: PricingPackage[] = [
  {
    name: 'Diagnostic Audit & Growth Blueprint',
    description: 'A 30-day deep dive into your data, tech stack, and funnel.',
    priceFrom: 3500,
    priceTo: 7500,
    frequency: 'One-time',
    features: [
      'Full-spectrum digital presence analysis',
      'Performance benchmarking against competitors',
      'Identification of critical gaps and opportunities',
      'Executive summary and detailed audit report',
      'Actionable recommendations for growth',
      'Clear roadmap you can implement yourself',
    ],
  },
  {
    name: 'Strategic Implementer Retainer',
    description: 'Ongoing strategic leadership and hands-on implementation.',
    priceFrom: 4000,
    priceTo: 10000,
    frequency: 'Monthly',
    features: [
      'Weekly strategic check-ins',
      'Hands-on technical implementation',
      'Managing critical marketing operations',
      'Growth initiatives and optimization',
      'Monthly performance reporting',
      'Proactive optimization and recommendations',
      'Senior-level expertise without full-time overhead',
    ],
    highlighted: true,
  },
  {
    name: 'Technical Sprint & Project Execution',
    description: 'Specific high-impact, one-off projects for critical challenges.',
    priceFrom: 5000,
    priceTo: 20000,
    frequency: 'Project-based',
    features: [
      'CRM migrations and implementations',
      'GA4 and GTM Server-Side setup',
      'Complete website and SEO rebuilds',
      'Rapid expert resolution of technical problems',
      'Immediate impact and long-term stability',
      'Specialist intervention for complex challenges',
      'Deliverables and documentation included',
    ],
  },
];

export default function Pricing() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Indicative Pricing
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl">
            Value-based pricing reflecting expertise and impact. All prices in AUD.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`glass-card p-8 flex flex-col ${
                  pkg.highlighted ? 'ring-2 ring-accent md:scale-105' : ''
                }`}
              >
                {pkg.highlighted && (
                  <div className="mb-4 inline-block">
                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-6">
                  {pkg.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${pkg.priceFrom.toLocaleString()}
                    </span>
                    <span className="text-foreground/60">–</span>
                    <span className="text-4xl font-bold text-foreground">
                      ${pkg.priceTo.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-sm mt-2">{pkg.frequency}</p>
                </div>

                <Link href="/contact">
                  <Button
                    className={`w-full mb-8 ${
                      pkg.highlighted ? 'btn-nudge-primary' : 'btn-nudge-secondary'
                    }`}
                  >
                    Send Us a Nudge
                  </Button>
                </Link>

                <div className="space-y-4 flex-1">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can you customize a package?
              </h3>
              <p className="text-foreground/60">
                Absolutely. These are indicative prices. We can tailor solutions based on your requirements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What payment terms do you offer?
              </h3>
              <p className="text-foreground/60">
                For projects, 50% upfront and 50% upon completion. For retainers, monthly in advance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Do you offer discounts for longer commitments?
              </h3>
              <p className="text-foreground/60">
                Yes. Longer retainer commitments can include pricing adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let's Discuss Your Growth Strategy
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Every business is unique. Let us understand your challenges and create a custom solution.
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
