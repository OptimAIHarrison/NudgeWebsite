import Header from '@/components/Header';
import Footer from '@/components/Footer';

export interface LegalSection { heading: string; body: string[] }

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl py-16 md:py-24">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mono mt-3 text-sm text-foreground/50">Last updated {updated}</p>
        <p className="mt-8 leading-relaxed text-foreground/70">{intro}</p>
        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            {s.body.map((b, i) => (
              <p key={i} className="mt-3 leading-relaxed text-foreground/70">{b}</p>
            ))}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
