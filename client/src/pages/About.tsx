import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import PageCTA from '@/components/PageCTA';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Zap, Target, Lightbulb, Code, TrendingUp, Briefcase } from 'lucide-react';

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

      <PageHero
        eyebrow="Marketing partner for tech companies and AI startups"
        title="Hi, I'm Harrison. I do the work."
        sub={"Senior digital marketer. Freelancer. Former department head. I have spent over a decade building the systems, strategy and execution that grow revenue, and I now focus on tech companies and AI startups: teams building things worth marketing properly. I have done it across five continents."}
      />

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={i}>
                <p className="mono text-2xl font-semibold text-accent">{s.stat}</p>
                <p className="text-sm text-foreground/55">{s.label}</p>
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

      <section className="border-y border-border bg-secondary/40 py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">What I do</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SKILLS.map((s) => (
              <div key={s.title} className="glass rounded-xl p-5">
                <p className="font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold md:text-3xl">How I operate</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="glass rounded-xl p-5">
                <p className="font-semibold">{v.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </div>
  );
}
