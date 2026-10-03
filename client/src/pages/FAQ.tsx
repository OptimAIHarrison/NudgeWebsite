import { useState } from 'react';
import PageCTA from '@/components/PageCTA';
import PageHero from '@/components/PageHero';

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
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero eyebrow="FAQ" title="Frequently asked questions" sub="Have questions about working with me? Here are the answers to the most common ones." />

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="max-w-3xl space-y-3">
            {FAQS.map((f) => (
              <details key={f.id} className="glass rounded-xl p-5">
                <summary className="cursor-pointer font-semibold">{f.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </div>
  );
}
