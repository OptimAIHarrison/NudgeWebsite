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
    { id: "who", question: "Who do you work with?", answer: "Tech companies and AI startups, and everyone in that field: SaaS, developer tools, cybersecurity, fintech, healthtech, hardware, consumer tech and more. If you build something technical or innovative, that is where I do my best work." },
    { id: "stage", question: "We are early stage. Is marketing worth it now?", answer: "Usually yes, in the right order. Early on that means clear positioning, a website that explains the product, tracking you can trust and one or two channels done well. I will tell you honestly what to do now and what can wait." },
    { id: "difference", question: "How are you different from an agency?", answer: "I am one senior operator. You deal with me directly, with no account managers or juniors, and I do the work rather than handing it off. I cover strategy, channels and the technical set-up underneath them." },
    { id: "technical", question: "Do you understand technical products?", answer: "Yes. I work with technical founders and teams every week, and I am comfortable going deep on APIs, product-led funnels and technical buyers. I will learn your product properly before I write a word about it." },
    { id: "engagement", question: "What does an engagement look like?", answer: "It starts with a conversation about what is stuck. I come back with a scope, a fixed price and a timeline. Once you approve, I build and ship, then hand over with documentation or stay on to run it." },
    { id: "pricing", question: "How much does it cost?", answer: "Pricing depends on scope. I work hourly, per project at a fixed price, on a monthly retainer or as a fractional CMO. The pricing page shows rates and example projects, and every project is quoted before you commit." },
    { id: "tools", question: "What tools do you work with?", answer: "HubSpot, Salesforce, GA4, Google Tag Manager, Segment, PostHog, Mixpanel, Customer.io, Klaviyo, Clay, Apollo, n8n, Make, Zapier and most major MarTech platforms. If you already use something, I will work in it." },
    { id: "automation", question: "Can you set up automation, and who owns it?", answer: "Yes. I build lead capture, enrichment, scoring, lifecycle email, reporting and AI workflows inside your own accounts, so you own everything. It is documented, and I can maintain it if you want." },
    { id: "ai-search", question: "Can you get us recommended by ChatGPT or Perplexity?", answer: "Nobody can guarantee that. What I can do is improve how AI systems find, understand and cite you: content, structured data, entity clarity and citations, then measure the results." },
    { id: "minimum", question: "Is there a minimum commitment?", answer: "Not for project work. Retainers usually have a three-month minimum so there is time to implement and see results. There is no lock-in beyond that." },
    { id: "where", question: "Where are you based?", answer: "Melbourne, Australia. I work remotely with tech teams across Australia and around the world." },
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
