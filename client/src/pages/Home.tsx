import { useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Code, BarChart3, CheckCircle, Sparkles, ChevronLeft, ChevronRight, Lightbulb, Rocket, Target, Palette } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663532599876/9u4P3ot5rXMeEQxrn76eMy/nudgewebsite_0d4b2e8a.png';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
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
  ];

  const caseStudies = [
    {
      id: 1,
      company: 'E-commerce Brand',
      challenge: 'Broken tracking and low conversion rates',
      solution: 'Implemented GA4, fixed funnel issues, optimized checkout',
      result: '+67% Conversions',
      metric: '$500K+ Additional Revenue',
    },
    {
      id: 2,
      company: 'SaaS Company',
      challenge: 'Manual workflows wasting 40 hours/week',
      solution: 'Built CRM automation and email sequences',
      result: '40 Hours/Week Saved',
      metric: '$120K Annual Savings',
    },
    {
      id: 3,
      company: 'Marketing Agency',
      challenge: 'Clients needed technical SEO expertise',
      solution: 'Provided fractional technical SEO services',
      result: '+3 New Revenue Streams',
      metric: '$50K+ Monthly Revenue',
    },
  ];

  const whatIDosBest = [
    {
      title: 'Solving Technical Problems',
      description: 'Fixing tracking, data integrity, and technical SEO issues that agencies overlook.',
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: 'Creating Systems',
      description: 'Building automated workflows, CRM systems, and marketing operations that scale.',
      icon: <Rocket className="w-8 h-8" />,
    },
    {
      title: 'Strategy & Implementation',
      description: 'Not just planning—actually executing and delivering measurable results.',
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: 'Ideation & Creation',
      description: 'Developing new approaches, creative solutions, and innovative implementations.',
      icon: <Lightbulb className="w-8 h-8" />,
    },
    {
      title: 'Fractional Leadership',
      description: 'Senior-level expertise without the overhead of a full-time hire or agency costs.',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: 'Trusted Partnership',
      description: 'One person you can trust. No agency layers, no hidden costs, just results.',
      icon: <CheckCircle className="w-8 h-8" />,
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
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex justify-center mb-4">
              <img src={LOGO_URL} alt="Nudge Digital" className="h-24 w-auto" />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Your Digital Marketing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                  Strategist & Implementer
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                I solve the technical problems that agencies overlook. Fixing, creating, and implementing—all from one person you can trust.
              </p>
            </div>

            {/* Liquid Glass Container */}
            <div className="max-w-3xl mx-auto mt-8 p-8 md:p-10 space-y-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl hover:shadow-accent/20 transition-shadow">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full px-6 py-4 text-left text-foreground/60 hover:text-foreground transition-colors group bg-white/50 rounded-lg border border-white/30 hover:bg-white/70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">What do you need help with?</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="flex-1" onClick={() => window.scrollTo(0, 0)}>
                  <Button className="btn-nudge-primary text-lg px-8 py-6 w-full">
                    Send a Nudge
                  </Button>
                </Link>
                <Link href="/services" className="flex-1" onClick={() => window.scrollTo(0, 0)}>
                  <Button className="w-full px-8 py-6 text-lg font-semibold text-accent border-2 border-accent rounded-lg hover:bg-accent/10 transition-colors bg-transparent">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Best */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What I Do Best</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              I handle everything from SEO and email marketing to CRM setup, automation, and complete digital strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whatIDosBest.map((item, idx) => (
              <div key={idx} className="glass-card group hover:scale-105 transition-transform p-8">
                <div className="p-4 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Clients Say</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Real feedback from people I've worked with.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-12">
              <div className="mb-8">
                <p className="text-2xl text-foreground italic mb-6">"{testimonials[testimonialIndex].quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonials[testimonialIndex].author}</p>
                  <p className="text-foreground/60">{testimonials[testimonialIndex].role} at {testimonials[testimonialIndex].company}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-accent" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === testimonialIndex ? 'bg-accent w-8' : 'bg-accent/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Success Stories</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Measurable results from real clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study) => (
              <div key={study.id} className="glass-card p-8">
                <div className="mb-6">
                  <p className="text-sm text-accent font-semibold mb-2">CASE STUDY</p>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{study.company}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Challenge</p>
                      <p className="text-foreground font-medium">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Solution</p>
                      <p className="text-foreground font-medium">{study.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="text-sm text-foreground/60 mb-2">Result</p>
                  <p className="text-3xl font-bold text-accent mb-2">{study.result}</p>
                  <p className="text-foreground/70">{study.metric}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button className="btn-nudge-primary text-lg px-8 py-4">
                View All Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Work With Nudge */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-accent/5 to-accent/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Work With Me</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              No agency. No overheads. Just expertise and results.
            </p>
          </div>

          <div className="text-center">
            <Link href="/testimonials">
              <Button className="btn-nudge-primary text-lg px-8 py-4">
                Explore Client Success
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
