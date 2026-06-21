import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Target, Lightbulb, Code, TrendingUp, ArrowRight, Globe, Briefcase, Heart } from 'lucide-react';

const SKILLS = [
  { icon: Code, title: 'Technical Implementation', body: 'Tracking, data infrastructure, GTM, analytics, pixels — I fix the things that break silently and cost you every day.' },
  { icon: Zap, title: 'Marketing Automation', body: 'CRM builds, email sequences, lead scoring, workflow design — systems that run without constant babysitting.' },
  { icon: Target, title: 'Performance Marketing', body: 'Paid media, SEO, attribution, CRO — channels managed with data, not guesswork.' },
  { icon: TrendingUp, title: 'Strategy & Roadmapping', body: 'Audits, GTM planning, competitive intelligence — clarity before you spend a dollar.' },
  { icon: Lightbulb, title: 'Brand & Content', body: 'Positioning, messaging, content strategy — helping you tell the right story to the right people.' },
  { icon: Briefcase, title: 'Fractional Leadership', body: 'Senior-level marketing direction without the full-time overhead. I embed in your team and own the outcomes.' },
];

const VALUES = [
  { title: 'Honest over comfortable', body: 'I\'d rather tell you what\'s not working than nod along. You\'re paying for perspective, not reassurance.' },
  { title: 'Execution, not just advice', body: 'I don\'t write recommendations and hand them off. I do the work — implementation, iteration, delivery.' },
  { title: 'Outcomes over activity', body: 'Hours worked and tasks completed don\'t matter. What moved? What grew? What got fixed? That\'s what counts.' },
  { title: 'Your business, treated like mine', body: 'I work with a small number of clients so I can care about each one properly. Not a number in a portfolio.' },
];

const STATS = [
  { stat: '10+', label: 'Years in digital marketing' },
  { stat: '5', label: 'Continents worked across' },
  { stat: '1', label: 'Person you\'re actually dealing with' },
  { stat: '30+', label: 'Tools across the MarTech stack' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            Fractional Digital Marketing Strategist & Implementer
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Hi, I'm Harrison.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">I do the work.</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Senior digital marketer. Freelancer. Former department head. I've spent over a decade helping businesses build the systems, strategy, and execution that actually grow revenue — and I've done it across five continents.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map((s, i) => (
              <div key={i} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <p className="text-2xl font-extrabold text-accent leading-none mb-1">{s.stat}</p>
                <p className="text-xs text-foreground/50 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">

          {/* Chapter 1 */}
          <div className="grid md:grid-cols-5 gap-10 items-start mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">The beginning</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                Started in corporate UK. Left on my own terms.
              </h2>
            </div>
            <div className="md:col-span-3 space-y-4">
              <div className="pl-5 border-l-2 border-accent/40">
                <p className="text-foreground/70 leading-relaxed">
                  I came up through corporate marketing in the UK — database exec, sharp suits, steep learning curve. By the time I was running a department, I was young, driven, and quietly burning out. I didn't have the language for it then, but I knew something had to change.
                </p>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                So I did what made sense to me: I left. Packed light, grew my hair, got some tattoos, and spent a few years moving across the world. Mountains, ocean dives, street food, and freelance digital marketing for clients across time zones. I kept doing the craft I loved — just from better locations.
              </p>
            </div>
          </div>

          {/* Chapter 2 */}
          <div className="grid md:grid-cols-5 gap-10 items-start mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">Australia</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                Ended up here. Stayed for good reason.
              </h2>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-foreground/70 leading-relaxed">
                Eventually Australia won. I did the obligatory fruit picking, spent six months living in the desert (yes, actually), and landed with a team that cared about doing things properly. I ran marketing through some of the most disruptive years in recent memory — COVID, rapid market shifts, the whole thing. We didn't just keep the lights on. I built systems, grew channels, and learned what it means to be accountable for real outcomes.
              </p>
              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5">
                <p className="text-foreground/75 leading-relaxed italic">
                  "Running a department through COVID taught me more about what matters in marketing than any course or conference ever could. When the budget disappears, you find out fast what actually drives growth."
                </p>
              </div>
            </div>
          </div>

          {/* Chapter 3 */}
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">Now</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                Solo. By choice. Fully committed.
              </h2>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-foreground/70 leading-relaxed">
                Now I work for myself — and for the clients who want senior expertise without the agency overhead or the full-time commitment. No account managers. No juniors quietly doing the work while someone else takes the credit. Just me, doing what I'm actually good at, for businesses I give a genuine damn about.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                I work with a small number of clients at a time so I can do each engagement properly. If you're looking for volume, I'm probably not your person. If you're looking for someone who'll get properly into your business and tell you the truth — I might be exactly right.
              </p>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <div className="flex items-center gap-2 mt-2 text-sm font-bold text-accent hover:gap-3 transition-all cursor-pointer group">
                  Let's have a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What I do best ──────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">What I actually do</h2>
            <p className="text-foreground/55 max-w-xl mx-auto">Across five disciplines — from technical fixes to senior strategy. One person who covers the whole stack.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div key={idx} className="rounded-2xl border-2 border-border bg-background p-6 hover:border-accent/50 hover:shadow-md transition-all group">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-foreground mb-2">{skill.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{skill.body}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" onClick={() => window.scrollTo(0, 0)}>
              <button className="text-sm font-bold text-accent hover:opacity-70 transition-opacity">
                See all 32+ services →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">How I work</h2>
            <p className="text-foreground/55">Not a values poster. Just how I actually operate.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border-2 border-border bg-background hover:border-accent/40 transition-all">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-accent/5 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Want to work together?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Tell me what you're trying to solve. I'll tell you honestly if I can help, and what that looks like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary text-lg px-8 py-6">
                Send a Nudge
              </Button>
            </Link>
            <Link href="/services" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="text-lg px-8 py-6 border-2">
                Explore services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
