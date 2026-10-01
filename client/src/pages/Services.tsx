import { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import { ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { PILLARS } from '@/data/services';

const PROOF_POINTS = [
  { stat: "30", label: "Services across 5 disciplines" },
  { stat: "1", label: "Operator. No agency layers" },
  { stat: "Tech-first", label: "Built for tech and AI companies" },
  { stat: "40+", label: "MarTech tools across the stack" },
];

export default function Services() {
  const search = useSearch();
  const [activePillar, setActivePillar] = useState('strategic');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pillarParam = params.get('pillar');
    const serviceParam = params.get('service');
    if (pillarParam) setActivePillar(pillarParam);
    if (serviceParam) setExpandedService(serviceParam);
  }, [search]);

  const currentPillar = PILLARS.find((p) => p.id === activePillar)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            Marketing services for tech and AI companies
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
            Marketing for tech, end to end.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">One operator.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            Strategy, the proven channels and the automation underneath, for tech companies, AI startups and everyone building in that field. Set up, connected and running.
          </p>

          {/* Proof bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {PROOF_POINTS.map((p, i) => (
              <div key={i} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <p className="text-2xl font-extrabold text-accent leading-none mb-1">{p.stat}</p>
                <p className="text-xs text-foreground/55 leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillar Tabs — sticky ────────────────────────────────────── */}
      <div className="sticky top-24 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container py-3">
          <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide pb-1 justify-center">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const active = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => { setActivePillar(pillar.id); setExpandedService(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap flex-shrink-0 text-sm border-2 ${
                    active
                      ? 'bg-accent text-white border-accent shadow-md'
                      : 'bg-background text-foreground/70 border-foreground/15 hover:border-accent hover:text-accent'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{pillar.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Pillar intro panel ──────────────────────────────────────── */}
      <section className={`py-14 bg-gradient-to-br ${currentPillar.color} border-b border-border`}>
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-background/70 backdrop-blur-sm border border-border">
                  {(() => { const Icon = currentPillar.icon; return <Icon className={`w-6 h-6 ${currentPillar.accentColor}`} />; })()}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${currentPillar.badgeColor}`}>
                  {currentPillar.stat}
                </span>
              </div>
              <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${currentPillar.accentColor}`}>{currentPillar.tagline}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">{currentPillar.name}</h2>
              <p className="text-foreground/65 leading-relaxed">{currentPillar.description}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">What you get</p>
              <div className="space-y-3">
                {currentPillar.outcomes.map((o, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/60">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${currentPillar.accentColor}`} />
                    <span className="text-sm font-semibold text-foreground">{o}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-accent hover:gap-3 transition-all cursor-pointer group">
                  Talk about this area <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-xs font-bold text-foreground/35 uppercase tracking-widest mb-8">
            {currentPillar.services.length} services in this area — click any to see what's included
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPillar.services.map((service, idx) => {
              const serviceId = `${activePillar}-${idx}`;
              const isOpen = expandedService === serviceId;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 bg-background ${
                    isOpen
                      ? 'border-accent shadow-lg shadow-accent/10'
                      : 'border-border hover:border-accent/50 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setExpandedService(isOpen ? null : serviceId)}
                    className="w-full text-left p-5 transition-colors hover:bg-accent/3"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold text-foreground leading-snug flex-1">{service.title}</h3>
                      <div className={`flex-shrink-0 p-1 rounded-full transition-all ${isOpen ? 'bg-accent text-white' : 'bg-secondary text-foreground/40'}`}>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.bullets.map((b, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-accent/8 text-accent rounded-full font-medium border border-accent/15">
                          {b}
                        </span>
                      ))}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 bg-accent/3">
                      <div>
                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-wide mb-2">What's included</p>
                        <p className="text-sm text-foreground/70 leading-relaxed">{service.details}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-wide mb-2">Tools I use</p>
                        <div className="flex flex-wrap gap-2">
                          {service.martech.map((tool, i) => (
                            <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                          <Button className="btn-nudge-primary w-full">
                            Send a Nudge about this
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── All pillars overview strip ──────────────────────────────── */}
      <section className="py-16 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Everything I cover</h2>
            <p className="text-foreground/55">Five disciplines. One person who executes across all of them.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const active = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(pillar.id);
                    setExpandedService(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-xl text-left border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    active ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-accent/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg w-fit mb-3 ${active ? 'bg-accent/15' : 'bg-secondary'}`}>
                    <Icon className={`w-5 h-5 ${active ? 'text-accent' : 'text-foreground/60'}`} />
                  </div>
                  <p className={`text-sm font-bold leading-tight mb-1 ${active ? 'text-accent' : 'text-foreground'}`}>{pillar.shortName}</p>
                  <p className="text-xs text-foreground/45">{pillar.stat}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-accent/5">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Not sure where to start?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Tell me what's not working. I'll tell you exactly what I'd fix first and why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary text-lg px-8 py-6">
                Send a Nudge
              </Button>
            </Link>
            <Link href="/services-marketplace" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="text-lg px-8 py-6 border-2">
                Browse fixed-price services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
