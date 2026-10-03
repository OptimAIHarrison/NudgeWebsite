import { useState } from 'react';
import PageHero from '@/components/PageHero';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQS } from '@/data/faqs';

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQItem[] = FAQS;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <PageHero
        eyebrow={"FAQ"}
        title={"Frequently asked questions"}
        sub={"Have questions about working with me? Here are the answers to the most common ones."}
      />

      {/* FAQs */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-start justify-between hover:bg-accent/5 transition-colors text-left"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === faq.id && (
                  <div className="px-6 pb-6 border-t border-border animate-slide-in-down">
                    <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Send me a nudge and let's chat about your specific situation.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary text-lg px-8 py-4">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
