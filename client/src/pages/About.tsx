import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Target, Lightbulb, Code, TrendingUp, Briefcase } from 'lucide-react';

const HUMAN_FACTS = ["Started in UK corporate marketing", "Former department head", "Six months in the desert", "Ocean dives and street food", "Based in Melbourne"];

const SKILLS = [
  { icon: Code, title: 'Technical Implementation', body: 'Tracking, data infrastructure, GTM, analytics, pixels — I fix the things that break silently and cost you every day.' },
  { icon: Zap, title: 'Marketing Automation', body: 'CRM builds, lifecycle email, lead scoring and AI workflows, connected to your product data and running without babysitting.' },
  { icon: Target, title: 'Performance Marketing', body: 'Paid media, SEO, attribution, CRO — channels managed with data, aimed at technical buyers.' },
  { icon: TrendingUp, title: 'Strategy & Roadmapping', body: 'Audits, go-to-market planning and positioning for crowded tech categories. Clarity before you spend a dollar.' },
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
            Marketing partner for tech companies and AI startups
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            Hi, I'm Harrison.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">I do the work.</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Senior digital marketer. Freelancer. Former department head. I have spent over a decade building the systems, strategy and execution that grow revenue, and I now focus on tech companies and AI startups: teams building things worth marketing properly. I have done it across five continents.
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

            {/* The human side */}
      <section className="py-20 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <p className="mono text-sm text-accent mb-3">Beyond the marketing</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                The human behind the dashboards.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {HUMAN_FACTS.map((f) => (
                  <span key={f} className="rounded-md border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-foreground/70 leading-relaxed">
                I started in corporate marketing in the UK: database exec, sharp suits, steep learning curve. By the time I was running a department I was quietly burning out, so I packed light and left. A few years of mountains, ocean dives and street food, with freelance clients across time zones, and then Australia won.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                I've picked fruit, lived in the desert for six months (yes, actually), grown my hair and collected a few tattoos. I ran marketing through COVID, and now I work solo, by choice, with a small number of teams I genuinely give a damn about. These days that means tech companies and AI startups. I'd rather have a straight conversation than send a polished pitch.
              </p>
              <blockquote className="glass rounded-xl p-5 text-sm italic leading-relaxed text-foreground/70">
                "Running a department through COVID taught me more about what matters in marketing than any course or conference ever could. When the budget disappears, you find out fast what actually drives growth."
              </blockquote>
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
