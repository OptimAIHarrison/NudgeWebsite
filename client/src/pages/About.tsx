import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Target, Lightbulb, Code, Rocket, TrendingUp } from 'lucide-react';

export default function About() {
  const whatIDosBest = [
    {
      title: 'Solving Technical Problems',
      description: 'Fixing tracking, data integrity, and technical SEO issues that agencies overlook.',
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: 'Creating Systems',
      description: 'Building automated workflows, CRM systems, and marketing operations that scale.',
      icon: <Rocket className="w-8 h-8" />,
    },
    {
      title: 'Strategy & Implementation',
      description: 'Not just planning—actually executing and delivering measurable results.',
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: 'Ideation & Creation',
      description: 'Developing new approaches, creative solutions, and innovative implementations.',
      icon: <Lightbulb className="w-8 h-8" />,
    },
    {
      title: 'Fractional Leadership',
      description: 'Senior-level expertise without the overhead of a full-time hire or agency costs.',
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: 'Trusted Partnership',
      description: 'One person you can trust. No agency layers, no hidden costs, just results.',
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'I\'ll tell you what\'s working and what isn\'t. No fluff, no BS.',
    },
    {
      title: 'Results-Focused',
      description: 'Everything I do is tied to measurable outcomes. If it doesn\'t move the needle, I don\'t do it.',
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
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-mesh relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            I'm Harrison, a fractional Digital Marketing Strategist & Implementer. I help businesses solve their toughest digital marketing challenges.
          </p>
        </div>
      </section>

      {/* What I Do Best */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What I Do Best</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              I handle everything from SEO and email marketing to CRM setup, automation, and complete digital strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whatIDosBest.map((item, idx) => (
              <div key={idx} className="glass-card group hover:scale-105 transition-transform p-8">
                <div className="p-4 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide">About Me</p>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Marketer. Wanderer. Recovering corporate machine.
              </h2>
              <p className="text-lg text-foreground/60 font-medium">
                Digital Marketing | Growth Strategy | Solo Operator
              </p>
            </div>

            {/* First paragraph with quote box */}
            <div className="space-y-6">
              <div className="pl-6 border-l-4 border-accent/50 py-4">
                <p className="text-lg text-foreground leading-relaxed">
                  I started out in corporate UK — Database Executive, sharp suit, sharpening my elbows on the way up. By the time I was running the marketing department, I was way too young, way too caffeinated, and burning out before I even had the vocabulary for it.
                </p>
              </div>

              <p className="text-lg text-foreground leading-relaxed">
                So I did what any sensible person does. I packed a bag, grew my hair out, got a nose piercing, collected a few tattoos, and went to see the world. I climbed mountains, dove to the depths, ate everything I could get my hands on, and worked my way through more varieties of beer than I'd care to admit. All the while, I kept doing what I love — freelance and contract digital marketing for clients across the globe. I think I still have the anklet somewhere.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-8">
              <div className="bg-secondary/50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">10+</p>
                <p className="text-sm text-foreground/70">years in digital marketing</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">3</p>
                <p className="text-sm text-foreground/70">continents worked across</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">1</p>
                <p className="text-sm text-foreground/70">suspiciously surviving anklet</p>
              </div>
            </div>

            {/* Second section */}
            <p className="text-lg text-foreground leading-relaxed">
              Eventually, gravity (and a working visa) pulled me to Australia. I did my fruit picking, spent six months living in the desert — yes, really — and then got back to what I do best. I landed with a team that actually gave a damn about growth; not just the company's, but mine. I ran the marketing department through some of the most chaotic, uncharted years in recent memory — COVID, market upheaval, the whole circus. I didn't just survive it. I built something.
            </p>

            {/* Highlighted quote */}
            <div className="bg-secondary/30 border-l-4 border-accent rounded-lg p-8 my-8">
              <p className="text-lg text-foreground leading-relaxed">
                Now I've gone solo. No more org chart, no more committees. Just me, my craft, and the clients smart enough to see the value. You're not hiring an agency. You're getting a seasoned, tattooed, well-travelled marketing operator who has run departments, navigated crises, freelanced across time zones, and genuinely loves this stuff.
              </p>
            </div>

            {/* Closing */}
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                I know my stuff. I'm easy to work with. And I'll probably be the most interesting person in your Zoom call. You're welcome.
              </p>

              <div className="pt-6 border-t border-border/50 space-y-3">
                <p className="text-sm font-semibold text-foreground/60">— A thought —</p>
                <p className="text-lg text-foreground leading-relaxed">
                  Imagine if I posted this on LinkedIn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">My Values</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              These principles guide everything I do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map((value, idx) => (
              <div key={idx} className="glass-card p-8">
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
          <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
            <Button className="btn-nudge-primary text-lg px-8 py-6">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
