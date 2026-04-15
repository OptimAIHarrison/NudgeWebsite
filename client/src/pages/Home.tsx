import { useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Code, BarChart3, CheckCircle, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663532599876/9u4P3ot5rXMeEQxrn76eMy/nudgewebsite_0d4b2e8a.png';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: 'Strategic Advisory',
      description: 'I help you map out your digital strategy and identify the biggest opportunities.',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: 2,
      title: 'Marketing Operations',
      description: 'I fix your broken CRM, automate your workflows, and get your data flowing.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: 3,
      title: 'Performance Marketing',
      description: 'I optimize your tracking, improve your conversions, and maximize your ROI.',
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      id: 4,
      title: 'Technical Implementation',
      description: 'I handle the hard technical stuff that most agencies overlook.',
      icon: <Code className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      id: 1,
      company: 'TechStart Co',
      quote: 'Harrison fixed our tracking issues and we saw a 45% improvement in lead quality within 3 months.',
      author: 'Sarah Chen',
      role: 'Marketing Director',
      metric: '+45% Lead Quality',
    },
    {
      id: 2,
      company: 'Growth Ventures',
      quote: 'His technical expertise solved problems that were costing us thousands monthly.',
      author: 'Michael Roberts',
      role: 'CEO',
      metric: '$50K+ Monthly Savings',
    },
    {
      id: 3,
      company: 'Digital Agency Pro',
      quote: 'As an agency, we rely on Harrison for specialized technical implementation. He delivers every time.',
      author: 'Emma Wilson',
      role: 'Agency Director',
      metric: '100% On-Time Delivery',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-hero opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>

        {/* Animated background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Content */}
        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img src={LOGO_URL} alt="Nudge Digital" className="h-24 w-auto" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Your Digital Marketing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                  Strategist & Implementer
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                I solve the technical problems that agencies overlook. Strategy, implementation, and results—all from one person you can trust.
              </p>
            </div>

            {/* Liquid Glass Container for Search & CTAs */}
            <div className="glass-panel p-8 md:p-10 max-w-2xl mx-auto space-y-6 mt-8">
              {/* Search Bar */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full px-6 py-4 text-left text-foreground/60 hover:text-foreground transition-colors group bg-white/50 rounded-lg border border-white/30 hover:bg-white/70"
              >
                <div className="flex items-center justify-between">
                  <span>What do you need help with?</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="flex-1">
                  <Button className="btn-nudge-primary text-lg px-8 py-4 w-full">
                    Send a Nudge
                  </Button>
                </Link>
                <button className="flex-1 px-8 py-4 text-lg font-semibold text-accent border-2 border-accent rounded-lg hover:bg-accent/10 transition-colors">
                  <Link href="/services">Explore Services</Link>
                </button>
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
              I handle everything from SEO and email marketing to CRM setup, automation, and complete digital strategy. Full-stack digital marketing expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="glass-card group hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                    {service.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-foreground/60">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success / Testimonials */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Client Success Stories</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Real results from real clients. See how I've helped businesses solve their toughest digital marketing challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-accent mb-2">{testimonial.metric}</div>
                  <p className="text-sm text-foreground/60">{testimonial.company}</p>
                </div>
                <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Work With Nudge</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              I'm not an agency. I'm a fractional strategist who gets results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Technical Expertise</h3>
              <p className="text-foreground/60">I solve the technical problems that agencies overlook or charge premium rates for.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Full-Stack Solution</h3>
              <p className="text-foreground/60">From strategy to implementation, I handle everything you need for digital success.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Proven Results</h3>
              <p className="text-foreground/60">Real improvements in lead quality, conversions, and ROI for every client.</p>
            </div>
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
