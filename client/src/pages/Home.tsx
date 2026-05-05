import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Lightbulb, Rocket, Target, Code, TrendingUp, CheckCircle, Bell, Database, LineChart, Zap, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663532599876/9u4P3ot5rXMeEQxrn76eMy/nudgewebsite_0d4b2e8a.png';

// Service Notification Component
function ServiceNotification({ 
  delay, 
  position, 
  service,
  size = 'md'
}: { 
  delay: number; 
  position: 'tl' | 'tr' | 'bl' | 'br' | 'cl' | 'cr';
  service: string;
  size?: 'sm' | 'md';
}) {
  const positionClasses = {
    'tl': 'top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-20',
    'tr': 'top-1/3 right-1/3 translate-x-1/2 -translate-y-1/2 hidden lg:block z-20',
    'bl': 'top-2/3 left-1/3 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-20',
    'br': 'top-2/3 right-1/3 translate-x-1/2 -translate-y-1/2 hidden lg:block z-20',
    'cl': 'top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 hidden lg:block z-20',
    'cr': 'top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 hidden lg:block z-20',
  };

  const sizeClasses = {
    'sm': 'max-w-lg p-5',
    'md': 'max-w-xl p-6',
  };

  const iconSize = {
    'sm': 'w-10 h-10',
    'md': 'w-12 h-12',
  };

  const textSize = {
    'sm': 'text-sm',
    'md': 'text-base',
  };

  const services: Record<string, { icon: React.ReactNode; color: string }> = {
    'SEO': { icon: <LineChart className={iconSize[size]} />, color: 'from-blue-500/15 to-blue-400/5' },
    'Email': { icon: <Zap className={iconSize[size]} />, color: 'from-orange-500/15 to-orange-400/5' },
    'CRM': { icon: <Database className={iconSize[size]} />, color: 'from-green-500/15 to-green-400/5' },
    'Analytics': { icon: <BarChart3 className={iconSize[size]} />, color: 'from-purple-500/15 to-purple-400/5' },
    'Strategy': { icon: <Target className={iconSize[size]} />, color: 'from-pink-500/15 to-pink-400/5' },
    'Automation': { icon: <Rocket className={iconSize[size]} />, color: 'from-cyan-500/15 to-cyan-400/5' },
  };

  const serviceData = services[service] || services['SEO'];

  return (
    <div
      className={`absolute ${positionClasses[position]} animate-nudge-pop z-5`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: '0.6s',
      }}
    >
      <div className={`${sizeClasses[size]} rounded-lg backdrop-blur-sm bg-gradient-to-br ${serviceData.color} border border-white/5 shadow-sm hover:shadow-md transition-all duration-300 group hover:scale-105 flex items-start justify-between gap-2`}>
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-0.5 text-accent/50 group-hover:text-accent/70 transition-colors">
            {serviceData.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-foreground/80 ${textSize[size]} truncate`}>{service}</p>
            <p className={`text-foreground/50 ${textSize[size]} leading-tight mt-0.5 line-clamp-2`}>
              {service === 'SEO' && 'Technical optimization'}
              {service === 'Email' && 'Automation & sequences'}
              {service === 'CRM' && 'System setup & flows'}
              {service === 'Analytics' && 'Tracking & reporting'}
              {service === 'Strategy' && 'Planning & roadmap'}
              {service === 'Automation' && 'Workflow automation'}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1">
          <Bell className={`${iconSize[size]} text-accent/60`} style={{ animation: `pulse-notification 3s ease-in-out infinite ${delay * 0.5}s` }} />
          <div className="rounded-full bg-accent" style={{ width: size === 'sm' ? '6px' : '8px', height: size === 'sm' ? '6px' : '8px', animation: `pulse-notification 3s ease-in-out infinite ${delay * 0.6}s` }}></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [notifications, setNotifications] = useState<Array<{ 
    id: number; 
    delay: number; 
    position: 'tl' | 'tr' | 'bl' | 'br' | 'cl' | 'cr';
    service: string;
    size: 'sm' | 'md';
  }>>([]);

  useEffect(() => {
    const positions: Array<'tl' | 'tr' | 'bl' | 'br' | 'cl' | 'cr'> = ['tl', 'tr', 'bl', 'br', 'cl', 'cr'];
    const services = ['SEO', 'Email', 'CRM', 'Analytics', 'Strategy', 'Automation'];
    const sizes: Array<'sm' | 'md'> = ['md', 'sm', 'md', 'sm', 'md', 'sm'];

    const generatedNotifications = positions.map((position, idx) => ({
      id: idx,
      delay: idx * 0.15,
      position,
      service: services[idx],
      size: sizes[idx],
    }));
    setNotifications(generatedNotifications);
  }, []);

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

        {/* Floating background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Service Notification Cards */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {notifications.map((notif) => (
            <ServiceNotification 
              key={notif.id} 
              delay={notif.delay} 
              position={notif.position}
              service={notif.service}
              size={notif.size}
            />
          ))}
        </div>

        <div className="container relative z-40 max-w-5xl mx-auto px-4">
          <div className="text-center space-y-6 animate-fade-in">
            {/* Animated Logo */}
            <div className="flex justify-center mb-4">
              <img src={LOGO_URL} alt="Nudge Digital" className="h-24 w-auto animate-bounce" style={{ animationDuration: '3s' }} />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Your Digital Marketing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                  Strategist & Implementer
                </span>
              </h1>
              <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                I fix the technical problems agencies overlook. From SEO audits to CRM automation, email sequences to analytics—I handle it all. One person. Real results.
              </p>
            </div>

            {/* CTA Container */}
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

      {/* Testimonials */}
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

      {/* Why Work With Me */}
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
