import { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import PageCTA from '@/components/PageCTA';
import { PILLARS } from '@/data/services';

export default function Services() {
  const search = useSearch();
  const [activePillar, setActivePillar] = useState(PILLARS[0].id);
  const [openId, setOpenId] = useState<string | null>(null);

  // Deep links from Home, the footer and site search: /services?pillar=…&service=…
  useEffect(() => {
    const params = new URLSearchParams(search);
    const p = params.get('pillar');
    const s = params.get('service');
    if (p && PILLARS.some((x) => x.id === p)) setActivePillar(p);
    if (s) {
      setOpenId(s);
      setTimeout(() => document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
    }
  }, [search]);

  const pillar = PILLARS.find((p) => p.id === activePillar) ?? PILLARS[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Marketing services for tech and AI companies"
        title="Marketing for tech, end to end. One operator."
        sub="Strategy, the proven channels and the automation underneath, for tech companies, AI startups and everyone building in that field. Set up, connected and running."
      />

      <section className="py-14 md:py-20">
        <div className="container">
          <div role="tablist" aria-label="Service areas" className="flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={p.id === pillar.id}
                onClick={() => {
                  setActivePillar(p.id);
                  setOpenId(null);
                }}
                className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                  p.id === pillar.id ? 'border-accent bg-accent text-white' : 'border-border hover:border-accent'
                }`}
              >
                {p.shortName} <span className="mono text-xs opacity-70">{p.stat}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="mono text-sm text-accent">{pillar.tagline}</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">{pillar.name}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground/65">{pillar.description}</p>
            </div>
            <ul className="space-y-2">
              {pillar.outcomes.map((o) => (
                <li key={o} className="glass flex gap-3 rounded-lg px-4 py-3 text-sm font-medium">
                  <span className="text-accent">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-3">
            {pillar.services.map((s, i) => {
              const id = `${pillar.id}-${i}`;
              const open = openId === id;
              return (
                <div key={id} id={id} className="glass rounded-xl p-5">
                  <button
                    onClick={() => setOpenId(open ? null : id)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.bullets.map((b) => (
                          <span key={b} className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`mono text-sm text-accent transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {open && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-sm leading-relaxed text-foreground/70">{s.details}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {s.martech.map((m) => (
                          <span key={m} className="mono rounded-md border border-accent/30 px-2 py-0.5 text-xs text-accent">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </div>
  );
}
