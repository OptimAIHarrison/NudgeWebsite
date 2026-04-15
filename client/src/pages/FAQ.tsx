import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 'fractional',
      question: 'What does "fractional" mean?',
      answer: 'Fractional means I work with you part-time, on a flexible basis. You get senior-level expertise without the overhead of a full-time employee. I typically work 10-30 hours per week depending on your needs and the scope of work.',
    },
    {
      id: 'difference',
      question: 'How are you different from an agency?',
      answer: 'I work as a solo practitioner, not a team. This means you get direct access to me—no account managers, no junior staff, no layers of bureaucracy. I focus on technical implementation and strategy, not creative work. I\'m also more flexible and can adapt to your specific needs quickly.',
    },
    {
      id: 'engagement',
      question: 'What does an engagement with you look like?',
      answer: 'It starts with a conversation about your challenges and goals. From there, I\'ll recommend a specific service or combination of services. We\'ll agree on scope, timeline, and pricing. Then I get to work. I provide regular updates and we adjust as needed based on results.',
    },
    {
      id: 'pricing',
      question: 'How much does it cost to work with you?',
      answer: 'Pricing depends on the scope of work. I offer three main packages: Diagnostic Audit & Growth Blueprint ($3,500–$7,500), Strategic Implementer Retainer ($4,000–$10,000+/month), and Technical Sprint & Project Execution ($5,000–$20,000+). Let\'s chat about your specific needs for a custom quote.',
    },
    {
      id: 'minimum',
      question: 'Is there a minimum commitment?',
      answer: 'For project-based work, no. For retainer engagements, I typically ask for a 3-month minimum to ensure we have time to implement and see results. This gives us enough runway to make a real impact.',
    },
    {
      id: 'timeline',
      question: 'How long does a typical project take?',
      answer: 'It depends on the scope. A diagnostic audit might take 2-3 weeks. A full CRM implementation could take 2-3 months. A retainer engagement is ongoing. I\'ll give you a clear timeline upfront so you know what to expect.',
    },
    {
      id: 'industries',
      question: 'What industries do you work with?',
      answer: 'I work with B2B SaaS, B2C e-commerce, agencies, professional services, and more. My expertise is in digital marketing strategy and implementation, which applies across industries. If you\'re in a specific niche, let\'s talk about whether I\'m the right fit.',
    },
    {
      id: 'tools',
      question: 'What tools and platforms do you work with?',
      answer: 'I\'m proficient in Google Analytics 4, Google Tag Manager, HubSpot, Salesforce, Zapier, Make, and most major MarTech platforms. I also have expertise in technical SEO, paid media, and conversion optimization. If there\'s a specific tool you use, I can likely work with it.',
    },
    {
      id: 'results',
      question: 'Can you guarantee results?',
      answer: 'I can\'t guarantee specific results, but I can guarantee I\'ll give you my best effort and focus on measurable outcomes. I\'ll set clear KPIs upfront and track progress regularly. If something isn\'t working, we\'ll adjust the strategy.',
    },
    {
      id: 'communication',
      question: 'How often will we communicate?',
      answer: 'For retainer engagements, I provide weekly or bi-weekly updates depending on your preference. For project work, we\'ll have a kick-off call, regular check-ins, and a final delivery meeting. You can always reach out if you have questions or need updates.',
    },
    {
      id: 'availability',
      question: 'How quickly can you start?',
      answer: 'I typically have availability within 1-2 weeks. If it\'s urgent, I can sometimes start sooner. Let me know your timeline and we\'ll figure it out.',
    },
    {
      id: 'contract',
      question: 'What\'s the contract like?',
      answer: 'I keep contracts simple and straightforward. No legal jargon or surprise clauses. We\'ll agree on scope, timeline, deliverables, and pricing. That\'s it. I\'m easy to work with and I want you to feel confident in our partnership.',
    },
    {
      id: 'payment',
      question: 'What\'s your payment structure?',
      answer: 'For project work, I typically ask for 50% upfront and 50% upon completion. For retainers, it\'s monthly in advance. I\'m flexible on this—let\'s discuss what works best for you.',
    },
    {
      id: 'next-steps',
      question: 'What\'s the next step if I want to work with you?',
      answer: 'Send me a nudge! Tell me about your challenges, goals, and what you\'re looking for. We\'ll have a conversation to see if I\'m the right fit. If we\'re aligned, we\'ll move forward. If not, I\'ll try to point you in the right direction.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            Have questions about working with me? Here are the answers to the most common ones.
          </p>
        </div>
      </section>

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
