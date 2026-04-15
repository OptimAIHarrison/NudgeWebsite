import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      company: 'TechStart Co',
      quote: 'Nudge Digital transformed our marketing operations. We saw a 45% improvement in lead quality within 3 months.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Roberts',
      company: 'Growth Ventures',
      quote: 'Their technical expertise solved tracking issues that were costing us thousands monthly. Highly recommended.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      company: 'Digital Agency Pro',
      quote: 'As an agency, we rely on Nudge for specialized technical implementation. They deliver every time.',
      rating: 5,
    },
  ];

  const services = [
    { title: 'Strategic Advisory', description: 'Data-backed roadmaps for growth' },
    { title: 'Marketing Operations', description: 'Automated, scalable systems' },
    { title: 'Performance Marketing', description: 'Measurable ROI and attribution' },
    { title: 'Brand & Content', description: 'Compelling narratives and assets' },
    { title: 'Technical Fixes', description: 'Rapid problem resolution' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 gradient-mesh" />
        </div>

        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-slide-in-up">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Digital Marketing <span className="text-gradient">Strategist & Implementer</span>
                </h1>
                <p className="text-lg md:text-xl text-foreground/70">
                  We architect, implement, and optimize high-performance digital ecosystems that drive predictable, measurable growth.
                </p>
              </div>

              {/* Search Bar */}
              <div className="glass-panel p-2 flex items-center gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  onClick={() => setSearchOpen(true)}
                  className="flex-1 bg-transparent text-foreground placeholder-foreground/50 outline-none px-4 py-2"
                  readOnly
                />
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-accent" />
                </button>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <Button className="btn-nudge-primary w-full sm:w-auto">
                    Send Us a Nudge
                  </Button>
                </Link>
                <Link href="/services">
                  <Button className="btn-nudge-secondary w-full sm:w-auto">
                    Explore Services
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4 text-sm text-foreground/60">
                <div>
                  <p className="font-semibold text-foreground">50+</p>
                  <p>Successful Projects</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">15+</p>
                  <p>Years Combined Experience</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">3</p>
                  <p>Pricing Models</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                {/* Glass Panels */}
                <div className="glass-panel p-8 space-y-4 animate-slide-in-down">
                  <div className="h-32 bg-gradient-to-br from-accent/20 to-purple-400/20 rounded-lg" />
                  <div className="h-4 bg-accent/10 rounded w-3/4" />
                  <div className="h-4 bg-accent/10 rounded w-1/2" />
                </div>
                <div className="glass-panel p-8 absolute -bottom-8 -right-8 w-64 space-y-4 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="h-24 bg-gradient-to-br from-purple-400/20 to-accent/20 rounded-lg" />
                  <div className="h-4 bg-accent/10 rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Five Pillars of Excellence
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Comprehensive solutions across every aspect of digital marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((service, idx) => (
              <Link key={idx} href="/services">
                <a className="glass-card group cursor-pointer">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground/60 mt-2">
                    {service.description}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-foreground/60">
              See what our clients say about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button className="btn-nudge-outline">
                View All Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Digital Marketing?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can architect your growth strategy and implement the systems that drive results.
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
