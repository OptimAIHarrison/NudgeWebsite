import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function About() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Nudge Digital
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl">
            We are digital marketing strategists and implementers who solve the hard technical problems that agencies overlook.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We architect, implement, and optimize high-performance digital ecosystems that drive predictable, measurable growth. We specialize in the technical "hard bits" that agencies overlook and founders struggle with.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Why We Exist</h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-4">
                Marketing is getting more technical, and your data is getting messier. We saw businesses struggling with:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70">Tracking that doesn't work, leading to wasted ad spend</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70">CRM systems that are broken or underutilized</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70">Agencies that are great at creative but terrible at execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70">Founders who have the strategy but lack the hands to implement</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We do not believe in fluff. No long-winded reports, no unnecessary meetings, no bloated price tags. We focus on delivering measurable results through:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="glass-panel p-6">
                  <h3 className="font-semibold text-foreground mb-2">Technical Mastery</h3>
                  <p className="text-sm text-foreground/60">
                    We handle the complex technical challenges that most agencies cannot.
                  </p>
                </div>
                <div className="glass-panel p-6">
                  <h3 className="font-semibold text-foreground mb-2">Strategic Thinking</h3>
                  <p className="text-sm text-foreground/60">
                    We do not just execute; we help you think through the right strategy.
                  </p>
                </div>
                <div className="glass-panel p-6">
                  <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                  <p className="text-sm text-foreground/60">
                    We move quickly and deliver results without unnecessary delays.
                  </p>
                </div>
                <div className="glass-panel p-6">
                  <h3 className="font-semibold text-foreground mb-2">Clear Communication</h3>
                  <p className="text-sm text-foreground/60">
                    We explain things in plain language, not marketing jargon.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who We Work With</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We are the trusted partner for:
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70"><strong>Scaling Founders</strong> who need to fix their marketing infrastructure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70"><strong>Agency Directors</strong> who need specialized technical support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span className="text-foreground/70"><strong>CMOs and Marketing Leaders</strong> who need fractional senior expertise</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Let's Talk About Your Growth
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
            We would love to understand your challenges and discuss how we can help.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary">
              Send Us a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
