import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

/** Closing call-to-action band shared by every page. */
export default function CtaBand({ title = "Tell me what's stuck. I'll tell you what I'd ship first.", cta = 'Send a Nudge' }: { title?: string; cta?: string }) {
  return (
    <section className="circles circles-dark bg-ink py-16 text-white md:py-20">
      <div className="container">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
        <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
          <Button className="btn-nudge-primary mt-6 px-8 py-6 text-base">{cta}</Button>
        </Link>
      </div>
    </section>
  );
}
