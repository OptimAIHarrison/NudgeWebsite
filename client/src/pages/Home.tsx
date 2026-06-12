import { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb, Target, Rocket, Code, TrendingUp, Bell, Database, LineChart, Zap, BarChart3, Share2, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';


// Each card has its own hand-placed position — desktop + mobile variants
const CARD_CONFIGS = [
  // LEFT SIDE
  { service: 'Strategy',          top: '9%',  left: '18%',  mTop: '5%',   mLeft: '18%',             size: 'md' as const, delay: 0.0  },
  { service: 'Automation',        top: '28%', left: '13%',   mTop: '12%',  mLeft: '8%',             size: 'lg' as const, delay: 0.02  },
  { service: 'Email',             top: '46%', left: '16%',  mTop: '20%',  mLeft: '13%',             size: 'sm' as const, delay: 0.04  },
  { service: 'Growth',            top: '59%', left: '14%',   mTop: '31%',  mLeft: '7%',             size: 'md' as const, delay: 0.06 },
  { service: 'Social Media',      top: '18%', left: '31%',  mTop: '41%',  mLeft: '6%',             size: 'sm' as const, delay: 0.08  },

  // RIGHT SIDE
  { service: 'CRM',               top: '11%',  right: '17%', mTop: '7%',              mRight: '17%', size: 'lg' as const, delay: 0.01 },
  { service: 'SEO',               top: '28%', right: '13%',  mTop: '14%',             mRight: '10%', size: 'sm' as const, delay: 0.03 },
  { service: 'Insights',          top: '43%', right: '15%', mTop: '23%',             mRight: '7%', size: 'md' as const, delay: 0.05 },
  { service: 'Ads',               top: '58%', right: '18%', mTop: '31%',             mRight: '15%', size: 'sm' as const, delay: 0.07 },
  { service: 'Content Marketing', top: '21%', right: '30%', mTop: '42%',             mRight: '8%', size: 'md' as const, delay: 0.10 },
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
  activeCard,
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
  activeCard: number;
  top: string;
  left?: string;
  right?: string;
  mTop?: string;
  mLeft?: string;
  mRight?: string;
}) {
  const data = SERVICE_DATA[service];
  const isPinging = activeCard === cardIndex;

  const iconMap = (sz: 'sm' | 'md' | 'lg', mobile = false): Record<string, React.ReactNode> => {
    const cls = mobile ? 'w-5 h-5' : sz === 'lg' ? 'w-8 h-8' : sz === 'md' ? 'w-7 h-7' : 'w-6 h-6';
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
        className="absolute hidden lg:block animate-nudge-pop rounded-2xl overflow-hidden"
        style={{
          top,
          ...(left  ? { left  } : {}),
          ...(right ? { right } : {}),
          animationDelay: `${delay}s`,
          animationDuration: '0.5s',
          zIndex: 20,
          transform: isPinging ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
          boxShadow: isPinging ? '0 16px 40px rgba(0,0,0,0.15)' : '0 4px 16px rgba(0,0,0,0.06)',
          opacity: isPinging ? 1 : 0.92,
          transition: 'transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease',
          background: 'transparent',
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
            backdrop-blur-md
            transition-all duration-200 ease-out
            hover:scale-[1.08] hover:border-white/60 hover:-translate-y-0.5
            cursor-pointer block
          `}
        >
          <div className="absolute top-2 right-2.5 flex items-center gap-1.5">
            <Bell className="w-3 h-3 text-gray-400/70" />
            <span
              className="rounded-full bg-accent block"
              style={{
                width: '8px',
                height: '8px',
                transform: isPinging ? 'scale(1.5)' : 'scale(1)',
                opacity: isPinging ? 1 : 0.45,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
              }}
            />
          </div>
          <div className={`flex-shrink-0 mt-0.5 ${data.accent}`}>{iconMap(size)[data.icon]}</div>
          <div className="min-w-0 pr-4">
            <p className={`font-semibold text-gray-800 leading-tight ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{service}</p>
            <p className="text-gray-500 leading-tight mt-0.5 text-xs">{data.subtitle}</p>
          </div>
        </Link>
      </div>

      {/* ── Mobile card ── */}
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
            opacity: isPinging ? 0.35 : 0.18,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{ width: '100px', padding: '8px 10px' }}
            className={`flex items-center gap-2 relative rounded-xl ${data.color} border border-white/30 backdrop-blur-sm`}
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
  const [activeCard, setActiveCard] = useState(0);

  // Sporadic pings — random card, 600ms flash, 800–1800ms random gap
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const total = CARD_CONFIGS.length;
    let lastIdx = -1;

    const ping = () => {
      let idx: number;
      do { idx = Math.floor(Math.random() * total); } while (idx === lastIdx);
      lastIdx = idx;
      setActiveCard(idx);
      // Flash on for ~350ms (half bounce cycle), off gap ~350ms — matches 0.7s bounce
      timeoutId = setTimeout(() => {
        setActiveCard(-1);
        const gap = 300 + Math.random() * 150;
        timeoutId = setTimeout(ping, gap);
      }, 350);
    };

    timeoutId = setTimeout(ping, 350);
    return () => clearTimeout(timeoutId);
  }, []);

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
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <style>{`
                @keyframes nudge-bounce {
                  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8,0,1,1); }
                  50%       { transform: translateY(-18px); animation-timing-function: cubic-bezier(0,0,0.2,1); }
                }
                .nudge-logo-bounce { animation: nudge-bounce 0.7s infinite; }
              `}</style>
              {/*
                Group width estimate: circle(38) + gap(8) + "NUDGE" text ≈ 228px = 274px total.
                ViewBox = 300 wide. Group starts at x=13 so it's centred: (300-274)/2=13.
              */}
              <svg
                width="300" height="64"
                viewBox="0 0 300 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="NUDGE"
                className="nudge-logo-bounce"
              >
                <circle cx="32" cy="32" r="19" fill="#8040B2"/>
                <text
                  x="61"
                  y="32"
                  fill="currentColor"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif"
                  fontWeight="800"
                  fontSize="52"
                  letterSpacing="2"
                  dominantBaseline="central"
                >NUDGE</text>
              </svg>
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

      {/* ── Credibility bar ──────────────────────────────────────── */}
      <section className="py-10 border-b border-border bg-background">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '10+', label: 'Years in digital marketing' },
              { stat: '32+', label: 'Services across 5 disciplines' },
              { stat: '1', label: 'Person. Full accountability.' },
              { stat: '40+', label: 'MarTech tools in the stack' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-extrabold text-accent leading-none mb-1">{s.stat}</p>
                <p className="text-xs text-foreground/50 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The problem I solve ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest mb-4 block">The gap I fill</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
                Agencies miss the details.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">I live in them.</span>
              </h2>
              <p className="text-foreground/65 leading-relaxed mb-6">
                Most agencies sell strategy. What actually breaks businesses is the execution — broken tracking, disconnected tools, automations that half-work, data nobody trusts. I fix the things that quietly cost you every day, and build the systems that actually scale.
              </p>
              <p className="text-foreground/65 leading-relaxed mb-8">
                Not a junior getting their reps in. Not a generalist with a nice deck. A senior operator who's run departments, navigated crises, and delivered across every channel — now working directly for you.
              </p>
              <Link href="/about" onClick={() => window.scrollTo(0, 0)}>
                <div className="flex items-center gap-2 text-sm font-bold text-accent hover:gap-3 transition-all cursor-pointer group">
                  About me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { problem: 'Tracking that lies to you', fix: 'GA4, GTM, attribution — rebuilt from scratch and validated' },
                { problem: 'Manual workflows eating hours', fix: 'CRM automation, email sequences, AI-assisted processes' },
                { problem: 'Paid media spend with no visibility', fix: 'Proper attribution, ROAS clarity, audience strategy' },
                { problem: 'SEO done once and forgotten', fix: 'Technical foundation, keyword mapping, content that ranks' },
                { problem: 'Strategy with no execution', fix: 'I write the plan and deliver it — no hand-offs' },
              ].map((row, i) => (
                <div key={i} className="rounded-xl border-2 border-border hover:border-accent/40 bg-background p-4 transition-all group">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 border-foreground/20 group-hover:border-accent transition-colors flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-foreground/20 group-hover:bg-accent transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground/35 uppercase tracking-wide line-through decoration-foreground/20 mb-0.5">{row.problem}</p>
                      <p className="text-sm font-semibold text-foreground">{row.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services overview ─────────────────────────────────────── */}
      <section className="py-20 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">What I do</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Five disciplines. One operator.</h2>
            <p className="text-foreground/55 max-w-xl mx-auto">From big-picture strategy to the technical details no one else wants to touch — I cover the full stack.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-3 mb-10">
            {[
              { icon: TrendingUp, name: 'Strategy & Audits', desc: 'Roadmaps, audits, GTM planning, competitive intel' },
              { icon: Zap, name: 'Marketing Ops', desc: 'CRM, automation, lead scoring, data infrastructure' },
              { icon: BarChart3, name: 'Performance', desc: 'Paid media, SEO, attribution, CRO, analytics' },
              { icon: Lightbulb, name: 'Brand & Content', desc: 'Positioning, messaging, content strategy, social' },
              { icon: Code, name: 'Technical Fixes', desc: 'Tracking, GTM, funnel diagnostics, integrations' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="rounded-2xl border-2 border-border bg-background p-5 hover:border-accent/50 hover:shadow-md transition-all group text-center">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent w-fit mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-extrabold text-foreground text-sm mb-1.5">{s.name}</p>
                  <p className="text-xs text-foreground/50 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/services" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary px-7 py-4">Explore all services</Button>
            </Link>
            <Link href="/services-marketplace" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="px-7 py-4 border-2">Browse fixed-price shop</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="py-20 md:py-24 border-t border-border bg-background">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">The process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">From Nudge to done.</h2>
            <p className="text-foreground/55">No lengthy proposals. No kickoff marathons. Just focused execution.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connector line desktop */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent/30 via-accent to-accent/30" />

            {[
              { num: '01', title: 'Send a Nudge', body: 'Tell me what\'s broken or what you need. No brief required — plain language is fine.' },
              { num: '02', title: 'I scope & quote', body: 'I come back with a clear plan, fixed price, and timeline. You know everything before you commit.' },
              { num: '03', title: 'You approve', body: 'Happy with the plan? Say the word. No contracts, no retainers unless you want one.' },
              { num: '04', title: 'I deliver', body: 'Fast, focused execution with regular updates. Delivered with documentation and proper handover.' },
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 rounded-2xl bg-accent text-white flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg shadow-accent/20">
                  <span className="text-2xl font-extrabold">{step.num}</span>
                </div>
                <h3 className="font-extrabold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/how-we-work" onClick={() => window.scrollTo(0, 0)}>
              <div className="flex items-center gap-2 text-sm font-bold text-accent hover:gap-3 transition-all cursor-pointer group justify-center">
                See how it works in detail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Results / proof ───────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-widest mb-3 block">Client results</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">What actually happened.</h2>
            <p className="text-foreground/55">Real projects. Real numbers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                company: 'E-commerce Brand',
                tag: 'Analytics & CRO',
                tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                quote: 'Harrison fixed our tracking and we saw a 45% improvement in lead quality within 3 months.',
                author: 'Sarah Chen, Marketing Director',
                stat: '+67%', statLabel: 'conversion rate',
                metric: '$500K+ additional revenue',
              },
              {
                company: 'SaaS Company',
                tag: 'CRM & Automation',
                tagColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
                quote: 'His technical expertise solved problems that were costing us thousands monthly. No fuss, just fixed.',
                author: 'Michael Roberts, CEO',
                stat: '40hrs', statLabel: 'saved per week',
                metric: '$120K annual savings',
              },
              {
                company: 'Marketing Agency',
                tag: 'Fractional Support',
                tagColor: 'bg-violet-100 text-violet-700 border-violet-200',
                quote: 'We rely on Harrison for specialised implementation. Delivers every time, on scope, on time.',
                author: 'Emma Wilson, Agency Director',
                stat: '+3', statLabel: 'new revenue streams',
                metric: '$50K+ monthly client revenue',
              },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl border-2 border-border bg-background p-6 flex flex-col hover:border-accent/40 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-foreground">{c.company}</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.tagColor}`}>{c.tag}</span>
                </div>
                <p className="text-sm text-foreground/65 italic leading-relaxed mb-5 flex-1">"{c.quote}"</p>
                <p className="text-xs text-foreground/40 mb-5">— {c.author}</p>
                <div className="border-t border-border pt-4">
                  <p className="text-3xl font-extrabold text-accent leading-none mb-0.5">{c.stat}</p>
                  <p className="text-xs text-foreground/50 mb-1">{c.statLabel}</p>
                  <p className="text-xs font-semibold text-foreground/65">{c.metric}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/testimonials" onClick={() => window.scrollTo(0, 0)}>
              <div className="flex items-center gap-2 text-sm font-bold text-accent hover:gap-3 transition-all cursor-pointer group justify-center">
                See all case studies <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-accent/5 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Ready to stop guessing<br />and start growing?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Tell me what's not working. I'll tell you what I'd fix first, what it costs, and when it'll be done.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary text-lg px-8 py-6">
                Send a Nudge
              </Button>
            </Link>
            <Link href="/pricing" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="text-lg px-8 py-6 border-2">
                See pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
