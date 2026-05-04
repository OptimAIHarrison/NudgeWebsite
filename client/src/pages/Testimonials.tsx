import { useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      company: 'TechStart Co',
      quote: 'Harrison fixed our tracking issues and we saw a 45% improvement in lead quality within 3 months.',
      author: 'Sarah Chen',
      role: 'Marketing Director',
    },
    {
      id: 2,
      company: 'Growth Ventures',
      quote: 'His technical expertise solved problems that were costing us thousands monthly.',
      author: 'Michael Roberts',
      role: 'CEO',
    },
    {
      id: 3,
      company: 'Digital Agency Pro',
      quote: 'As an agency, we rely on Harrison for specialized technical implementation. He delivers every time.',
      author: 'Emma Wilson',
      role: 'Agency Director',
    },
    {
      id: 4,
      company: 'E-commerce Collective',
      quote: 'The ROI improvement was immediate. Best investment we made in our marketing stack.',
      author: 'James Liu',
      role: 'Founder',
    },
  ];

  const caseStudies = [
    {
      id: 1,
      company: 'E-commerce Brand',
      industry: 'Retail',
      challenge: 'Broken tracking and low conversion rates. They were losing visibility into customer journeys.',
      solution: 'Implemented GA4, fixed funnel issues, optimized checkout flow, and set up proper attribution.',
      result: '+67% Conversions',
      metric: '$500K+ Additional Revenue',
      timeline: '4 months',
    },
    {
      id: 2,
      company: 'SaaS Company',
      industry: 'Software',
      challenge: 'Manual workflows wasting 40 hours/week. No automation, no CRM integration.',
      solution: 'Built CRM automation, email sequences, and integrated marketing operations.',
      result: '40 Hours/Week Saved',
      metric: '$120K Annual Savings',
      timeline: '2 months',
    },
    {
      id: 3,
      company: 'Marketing Agency',
      industry: 'Agency',
      challenge: 'Clients needed technical SEO expertise that they couldn\'t deliver in-house.',
      solution: 'Provided fractional technical SEO services and implementation support.',
      result: '+3 New Revenue Streams',
      metric: '$50K+ Monthly Revenue',
      timeline: 'Ongoing',
    },
    {
      id: 4,
      company: 'B2B SaaS Platform',
      industry: 'Technology',
      challenge: 'Complex tracking setup with multiple data sources causing reporting inconsistencies.',
      solution: 'Unified data infrastructure, implemented proper tracking, built custom dashboards.',
      result: '+34% Data Accuracy',
      metric: 'Better Decision Making',
      timeline: '6 weeks',
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Success & Testimonials
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Real results from real clients. See how I've helped businesses solve their toughest digital marketing challenges.
          </p>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Clients Say</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Direct feedback from people I've worked with.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-12">
              <div className="mb-8">
                <p className="text-2xl text-foreground italic mb-6">"{testimonials[testimonialIndex].quote}"</p>
                <div>
                  <p className="font-semibold text-foreground text-lg">{testimonials[testimonialIndex].author}</p>
                  <p className="text-foreground/60">{testimonials[testimonialIndex].role} at {testimonials[testimonialIndex].company}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  className="p-3 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-accent" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`transition-all ${
                        idx === testimonialIndex ? 'bg-accent w-8 h-2 rounded-full' : 'bg-accent/30 w-2 h-2 rounded-full'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-3 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-accent" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Case Studies</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Detailed breakdowns of projects and the measurable impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {caseStudies.map((study) => (
              <div key={study.id} className="glass-card p-8 hover:scale-105 transition-transform">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{study.company}</h3>
                      <p className="text-sm text-accent font-semibold mt-1">{study.industry}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-foreground/60 font-semibold mb-2">Challenge</p>
                      <p className="text-foreground/80">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 font-semibold mb-2">Solution</p>
                      <p className="text-foreground/80">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm text-foreground/60 font-semibold mb-2">Result</p>
                  <p className="text-3xl font-bold text-accent mb-2">{study.result}</p>
                  <p className="text-foreground/70 mb-4">{study.metric}</p>
                  <p className="text-sm text-foreground/60">Timeline: {study.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
            Let's discuss your challenges and create a custom solution.
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
