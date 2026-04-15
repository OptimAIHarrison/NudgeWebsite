import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Target, Lightbulb } from 'lucide-react';

export default function About() {
  const [searchOpen, setSearchOpen] = useState(false);

  const expertise = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Technical Deep Dives',
      description: 'I solve the technical problems that most agencies overlook—tracking, data integrity, and conversion path diagnostics.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Strategic Implementation',
      description: 'I don\'t just advise—I implement. I get my hands dirty and deliver results.',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Fractional Leadership',
      description: 'I work as your fractional Digital Marketing Strategist & Implementer, giving you access to senior-level expertise without the overhead.',
    },
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'I\'ll tell you what\'s working and what isn\'t. No fluff, no BS.',
    },
    {
      title: 'Results-Focused',
      description: 'Everything I do is tied to measurable outcomes. If it doesn\'t move the needle, we don\'t do it.',
    },
    {
      title: 'Technical Excellence',
      description: 'I stay on top of the latest tools, platforms, and best practices in digital marketing.',
    },
    {
      title: 'Partnership Mindset',
      description: 'I treat your business like it\'s my own. Your success is my success.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            I'm Harrison, a fractional Digital Marketing Strategist & Implementer. I help businesses solve their toughest digital marketing challenges.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl mx-auto">
          <div className="glass-panel p-8 md:p-12 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">My Story</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                I've spent the last decade working in digital marketing—from agency side to in-house roles. I've seen it all: broken tracking setups, CRMs that nobody uses, marketing operations that are a mess, and agencies that promise the world but deliver mediocrity.
              </p>
            </div>

            <div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                That's when I realized something: most businesses don't need another full-time hire or another agency. They need someone who can come in, understand their specific challenges, and actually fix them. Someone who knows the technical side as well as the strategic side.
              </p>
            </div>

            <div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                So I decided to go fractional. Now I work with businesses that need senior-level digital marketing expertise without the overhead of a full-time employee or the frustration of a traditional agency.
              </p>
            </div>

            <div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                I focus on the technical stuff that matters: fixing your tracking, optimizing your conversions, building your MarTech stack, and implementing strategies that actually work. I'm not here to make you feel good—I'm here to make your business better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What I Do Best</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              My unique combination of strategic thinking and technical expertise sets me apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertise.map((item, idx) => (
              <div key={idx} className="glass-panel p-8">
                <div className="p-4 bg-accent/15 rounded-lg text-accent w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Values</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              These principles guide everything I do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map((value, idx) => (
              <div key={idx} className="glass-panel p-8">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                </div>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Let's talk about your digital marketing challenges and how I can help.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary text-lg px-8 py-4">
              Send Us a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
