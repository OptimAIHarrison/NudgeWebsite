import { useState } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface CaseStudy {
  id: string;
  company: string;
  contact: string;
  role: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  quote: string;
  rating: number;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    company: 'TechStart Co',
    contact: 'Sarah Chen',
    role: 'Marketing Director',
    challenge: 'Broken tracking setup leading to inaccurate ROI reporting on paid campaigns.',
    solution: 'Implemented GA4 with Server-Side Tagging and fixed all tracking issues.',
    result: 'Accurate attribution and 45% improvement in lead quality within 3 months.',
    metric: '45% improvement in lead quality',
    quote: 'Nudge Digital transformed our marketing operations. We saw a 45% improvement in lead quality within 3 months.',
    rating: 5,
  },
  {
    id: '2',
    company: 'Growth Ventures',
    contact: 'Michael Roberts',
    role: 'CEO',
    challenge: 'CRM system was underutilized and not integrated with marketing automation.',
    solution: 'Full CRM implementation with custom workflows and marketing automation integration.',
    result: 'Sales team productivity increased by 60%, better lead nurturing.',
    metric: '60% increase in sales productivity',
    quote: 'Their technical expertise solved tracking issues that were costing us thousands monthly. Highly recommended.',
    rating: 5,
  },
  {
    id: '3',
    company: 'Digital Agency Pro',
    contact: 'Emma Wilson',
    role: 'Agency Director',
    challenge: 'Needed specialized technical support for complex client implementations.',
    solution: 'Became their trusted technical partner for CRM, tracking, and optimization.',
    result: 'Delivered 8 successful client projects with 100% client satisfaction.',
    metric: '8 successful projects, 100% satisfaction',
    quote: 'As an agency, we rely on Nudge for specialized technical implementation. They deliver every time.',
    rating: 5,
  },
  {
    id: '4',
    company: 'E-Commerce Plus',
    contact: 'David Lee',
    role: 'Head of Marketing',
    challenge: 'Website conversion rate was 1.2%, losing significant revenue.',
    solution: 'Comprehensive CRO audit, A/B testing program, and funnel optimization.',
    result: 'Conversion rate increased to 2.8%, generating an extra $500k annually.',
    metric: '$500k additional annual revenue',
    quote: 'The CRO work paid for itself within the first month. Exceptional results.',
    rating: 5,
  },
  {
    id: '5',
    company: 'SaaS Innovators',
    contact: 'Lisa Zhang',
    role: 'VP of Growth',
    challenge: 'Multiple marketing tools not communicating, data silos everywhere.',
    solution: 'MarTech stack audit, tool consolidation, and API integrations.',
    result: 'Unified data platform, 35% reduction in marketing tech costs.',
    metric: '35% reduction in tech costs',
    quote: 'They simplified our entire tech stack and saved us thousands. Best decision we made.',
    rating: 5,
  },
  {
    id: '6',
    company: 'B2B Services Ltd',
    contact: 'James Murphy',
    role: 'Marketing Manager',
    challenge: 'SEO strategy was non-existent, losing organic traffic to competitors.',
    solution: 'Technical SEO audit, site optimization, and content strategy.',
    result: 'Organic traffic increased by 120%, top 3 rankings for 15 keywords.',
    metric: '120% increase in organic traffic',
    quote: 'Their technical SEO expertise is unmatched. We are now dominating search.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Success Stories
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl">
            Real results from real clients. See how we have helped businesses transform their digital marketing.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="glass-card flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{study.company}</h3>
                    <p className="text-sm text-foreground/60">{study.contact}, {study.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(study.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground/70 italic">"{study.quote}"</p>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-xs font-semibold text-accent uppercase mb-1">Challenge</p>
                    <p className="text-sm text-foreground/70">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-accent uppercase mb-1">Our Solution</p>
                    <p className="text-sm text-foreground/70">{study.solution}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-accent uppercase">Result</p>
                        <p className="text-sm font-semibold text-foreground">{study.metric}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
            Let us help you achieve measurable results and transform your digital marketing.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
