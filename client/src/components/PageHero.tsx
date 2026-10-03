import type { ReactNode } from 'react';

/** Shared page header: left-aligned, mono eyebrow, faint translucent circles behind. */
export default function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="circles border-b border-border bg-secondary/40">
      <div className="container py-14 md:py-20">
        {eyebrow && <p className="mono mb-3 text-sm text-accent">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/60">{sub}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
