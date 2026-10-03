import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

/** Shared dark call-to-action band used at the foot of content pages. */
export default function PageCTA() {
  return (
    <section className="circles circles-dark bg-ink py-16 text-white">
      <div className="container">
        <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
          Tell me what's stuck. I'll tell you what I'd ship first.
        </h2>
        <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
          <Button className="btn-nudge-primary mt-6 px-8 py-6 text-base">Send a Nudge</Button>
        </Link>
      </div>
    </section>
  );
}
