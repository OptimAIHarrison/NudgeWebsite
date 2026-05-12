import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Lightbulb, Rocket, Target, Code, TrendingUp, CheckCircle, Bell, Database, LineChart, Zap, BarChart3, Share2, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663532599876/9u4P3ot5rXMeEQxrn76eMy/nudgewebsite_0d4b2e8a.png';

// Each card has its own hand-placed position — desktop + mobile variants
const CARD_CONFIGS = [
  // LEFT SIDE
  { service: 'Strategy',          top: '9%',  left: '13%',  mTop: '7%',   mLeft: '9%',             size: 'md' as const, delay: 0.0  },
  { service: 'Automation',        top: '28%', left: '8%',   mTop: '20%',  mLeft: '5%',             size: 'lg' as const, delay: 0.1  },
  { service: 'Email',             top: '46%', left: '11%',  mTop: '35%',  mLeft: '10%',             size: 'sm' as const, delay: 0.2  },
  { service: 'Growth',            top: '59%', left: '9%',   mTop: '50%',  mLeft: '4%',             size: 'md' as const, delay: 0.3  },
  { service: 'Social Media',      top: '18%', left: '26%',  mTop: '64%',  mLeft: '3%',             size: 'sm' as const, delay: 0.4  },

  // RIGHT SIDE
  { service: 'CRM',               top: '11%',  right: '12%', mTop: '7%',              mRight: '10%', size: 'lg' as const, delay: 0.05 },
  { service: 'SEO',               top: '28%', right: '8%',  mTop: '20%',             mRight: '7%', size: 'sm' as const, delay: 0.15 },
  { service: 'Insights',          top: '43%', right: '10%', mTop: '35%',             mRight: '4%', size: 'md' as const, delay: 0.25 },
  { service: 'Ads',               top: '58%', right: '13%', mTop: '50%',             mRight: '12%', size: 'sm' as const, delay: 0.35 },
  { service: 'Content Marketing', top: '21%', right: '25%', mTop: '64%',             mRight: '5%', size: 'md' as const, delay: 0.45 },
];

const SERVICE_DATA: Record<string, { icon: string; color: string; accent: string; subtitle: string }> = {
  'SEO':             { icon: 'LineChart', color: 'bg-blue-200/40',    accent: 'text-blue-500',    subtitle: 'Technical optimization' },
  'Email':           { icon: 'Zap',      color: 'bg-orange-200/40',  accent: 'text-orange-500',  subtitle: 'Automation & sequences' },
  'CRM':             { icon: 'Database', color: 'bg-green-200/40',   accent: 'text-green-600',   subtitle: 'System setup & flows' },
  'Ads':             { icon: 'Zap',      color: 'bg-yellow-200/40',  accent: 'text-yellow-600',  subtitle: 'Campaign management' },
  'Insights':        { icon: 'BarChart3',color: 'bg-rose-200/40',    accent: 'text-rose-500',    subtitle: 'Actionable insights' },
  'Strategy':        { icon: 'Target',   color: 'bg-pink-200/40',    accent: 'text-pink-500',    subtitle: 'Planning & roadmap' },
  'Automation':      { icon: 'Rocket',   color: 'bg-cyan-200/40',    accent: 'text-cyan-600',    subtitle: 'Workflow automation' },
  'Growth':          { icon: 'TrendingUp',color:'bg-emerald-200/40', accent: 'text-emerald-600', subtitle: 'Growth optimization' },
  'Social Media':    { icon: 'Share2',   color: 'bg-amber-200/40',   accent: 'text-amber-600',   subtitle: 'Strategy & scheduling' },
  'Content Marketing':{ icon:'FileText', color: 'bg-lime-200/40',    accent: 'text-lime-700',    subtitle: 'Copy, blogs & assets' },
};

function ServiceNotification({
  service,
  size,
  delay,
  cardIndex,
  top,
  left,
  right,
  mTop,
  mLeft,
  mRight,
}: {
  service: string;
  size: 'sm' | 'md' | 'lg';
  delay: number;
  cardIndex: number;
  top: string;
  left?: string;
  right?: string;
  mTop?: string;
  mLeft?: string;
  mRight?: string;
}) {
  const data = SERVICE_DATA[service];

  // Mobile: all icons tiny
  const iconMap = (sz: 'sm' | 'md' | 'lg', mobile = false): Record<string, React.ReactNode> => {
    const cls = mobile ? 'w-4 h-4' : sz === 'lg' ? 'w-8 h-8' : sz === 'md' ? 'w-7 h-7' : 'w-6 h-6';
    return {
      LineChart:  <LineChart  className={cls} />,
      Zap:        <Zap        className={cls} />,
      Database:   <Database   className={cls} />,
      BarChart3:  <BarChart3  className={cls} />,
      Target:     <Target     className={cls} />,
      Rocket:     <Rocket     className={cls} />,
      TrendingUp: <TrendingUp className={cls} />,
      Share2:     <Share2     className={cls} />,
      FileText:   <FileText   className={cls} />,
    };
  };

  const desktopWidths  = { sm: '176px', md: '210px', lg: '240px' };
  const desktopPadding = { sm: '12px 14px', md: '14px 16px', lg: '16px 18px' };

  return (
    <>
      {/* ── Desktop card ── */}
      <div
        className={`absolute hidden lg:block animate-nudge-pop nudge-card-${cardIndex}`}
        style={{
          top,
          ...(left  ? { left  } : {}),
          ...(right ? { right } : {}),
          animationDelay: `${delay}s`,
          animationDuration: '0.5s',
          zIndex: 20,
        }}
      >
        <Link
          href="/services"
          onClick={() => window.scrollTo(0, 0)}
          style={{ width: desktopWidths[size], padding: desktopPadding[size] }}
          className={`
            flex items-start gap-3 relative
            rounded-2xl
            ${data.color}
            border border-white/35
            shadow-lg shadow-black/8
            backdrop-blur-md
            transition-all duration-200 ease-out
            hover:scale-[1.08] hover:shadow-xl hover:shadow-black/12 hover:border-white/60 hover:-translate-y-0.5
            cursor-pointer block
          `}
        >
          <div className="absolute top-2 right-2.5 flex items-center gap-1.5">
            <Bell className="w-3 h-3 text-gray-400/70" />
            <span
              className="rounded-full bg-accent block"
              style={{ width: '8px', height: '8px', animation: `nudge-dot-flash 2s ease-in-out infinite ${delay * 0.4}s` }}
            />
          </div>
          <div className={`flex-shrink-0 mt-0.5 ${data.accent}`}>{iconMap(size)[data.icon]}</div>
          <div className="min-w-0 pr-4">
            <p className={`font-semibold text-gray-800 leading-tight ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{service}</p>
            <p className="text-gray-500 leading-tight mt-0.5 text-xs">{data.subtitle}</p>
          </div>
        </Link>
      </div>

      {/* ── Mobile card — tiny, very transparent, pointer-events-none so they don't block taps ── */}
      {(mTop !== undefined) && (
        <div
          className="absolute block lg:hidden animate-nudge-pop"
          style={{
            top: mTop,
            ...(mLeft  ? { left: mLeft   } : {}),
            ...(mRight ? { right: mRight } : {}),
            animationDelay: `${delay}s`,
            animationDuration: '0.5s',
            zIndex: 10,
            opacity: 0.18,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{ width: '100px', padding: '8px 10px' }}
            className={`
              flex items-center gap-2 relative
              rounded-xl
              ${data.color}
              border border-white/30
              backdrop-blur-sm
            `}
          >
            <div className={`flex-shrink-0 ${data.accent}`}>{iconMap(size, true)[data.icon]}</div>
            <p className="font-semibold text-gray-800 leading-tight text-xs truncate">{service}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  // Advance one card at a time — 1.2s ping on, then 3s rest before next
  useEffect(() => {
    let cardIdx = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const next = () => {
      setActiveCard(cardIdx);
      cardIdx = (cardIdx + 1) % CARD_CONFIGS.length;
      // card stays "active" for 1200ms, then 3000ms silence before the next one
      timeoutId = setTimeout(() => {
        setActiveCard(-1);
        timeoutId = setTimeout(next, 3000);
      }, 1200);
    };

    // Small initial delay so page loads before anything fires
    timeoutId = setTimeout(next, 1500);
    return () => clearTimeout(timeoutId);
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

      {/* ── Hero Section ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Soft lavender background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 40%, #e8e0f5 0%, #ddd6f0 35%, #cec6e8 65%, #bfb8dc 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        {/* Service Notification Cards */}
        <div className="absolute inset-0">
          {CARD_CONFIGS.map((card, idx) => (
            <ServiceNotification
              key={card.service}
              service={card.service}
              size={card.size}
              delay={card.delay}
              cardIndex={idx}
              activeCard={activeCard}
              top={card.top}
              left={'left' in card ? card.left : undefined}
              right={'right' in card ? card.right : undefined}
              mTop={'mTop' in card ? card.mTop : undefined}
              mLeft={'mLeft' in card ? card.mLeft : undefined}
              mRight={'mRight' in card ? card.mRight : undefined}
            />
          ))}
        </div>

        {/* Centre content */}
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

      {/* ── What I Do Best ───────────────────────────────────────── */}
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

      {/* ── Testimonials ─────────────────────────────────────────── */}
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

      {/* ── Case Studies ─────────────────────────────────────────── */}
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

      {/* ── Why Work With Me ─────────────────────────────────────── */}
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
