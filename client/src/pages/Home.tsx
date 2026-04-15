import { useState } from 'react';
import { ArrowRight, Zap, TrendingUp, Code, Palette, BarChart3, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

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
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
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

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full glass-panel px-6 py-4 text-left text-foreground/60 hover:text-foreground transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span>What do you need help with?</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button className="btn-nudge-primary text-lg px-8 py-4">
                  Send Us a Nudge
                </Button>
              </Link>
              <Link href="/services">
                <Button className="btn-nudge-secondary text-lg px-8 py-4">
                  Explore Services
                </Button>
              </Link>
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
              I specialize in the technical challenges that most agencies can't solve. Here's where I add the most value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="glass-panel p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/15 rounded-lg text-accent flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-foreground/70">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Real Results</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Here's what my clients have achieved after working together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-panel p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Start Your Nudge?
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Tell me what you need help with. I will respond with a clear plan and pricing within 24 hours.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary text-lg px-8 py-4">
              Send Us a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
