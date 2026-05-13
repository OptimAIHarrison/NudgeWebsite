import { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import { ChevronDown, Zap, TrendingUp, Code, BarChart3, Palette, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const PILLARS = [
  {
    id: 'strategic',
    name: 'Strategic Advisory & Audits',
    shortName: 'Strategy',
    icon: TrendingUp,
    color: 'from-violet-500/15 to-purple-500/5',
    accentColor: 'text-violet-600',
    badgeColor: 'bg-violet-100 text-violet-700 border-violet-200',
    stat: '6 services',
    tagline: 'Clarity before action.',
    description: 'I analyse your entire digital ecosystem — channels, tools, data, competition — and turn it into a clear, prioritised roadmap. No fluff, no generic frameworks. A plan built around your actual situation.',
    outcomes: ['Know exactly where to focus', 'Eliminate wasted spend', 'Roadmap with clear ROI'],
    services: [
      { title: 'Comprehensive Digital Marketing Audit', bullets: ['Full-spectrum analysis', 'Competitive benchmarking', 'Gap identification'], details: 'Website audit, competitor analysis, MarTech stack review, performance benchmarking, detailed recommendations', martech: ['Google Analytics', 'SEMrush', 'Hotjar'] },
      { title: 'Growth Strategy & Roadmap', bullets: ['Strategic planning', 'Opportunity identification', 'Implementation timeline'], details: 'Market research, opportunity identification, prioritization, 12-month implementation roadmap', martech: ['Miro', 'Notion', 'Looker Studio'] },
      { title: 'MarTech Stack Consulting', bullets: ['Tool evaluation', 'Integration planning', 'Cost optimization'], details: 'Stack audit, tool recommendations, integration planning, cost optimization, vendor selection', martech: ['Zapier', 'Make', 'Segment'] },
      { title: 'Competitive Intelligence & Market Mapping', bullets: ['Competitor profiling', 'Share of voice analysis', 'Market positioning'], details: 'In-depth competitor teardowns, share of voice tracking, positioning matrix, whitespace identification, monthly intelligence reports', martech: ['Similarweb', 'SEMrush', 'SparkToro'] },
      { title: 'Go-To-Market Strategy', bullets: ['Launch planning', 'Channel prioritization', 'Audience segmentation'], details: 'ICP definition, channel mix strategy, messaging hierarchy, launch sequencing, success metrics and OKR framework', martech: ['Notion', 'Miro', 'HubSpot'] },
      { title: 'Quarterly Business Reviews & Advisory', bullets: ['Performance review', 'Strategic recalibration', 'Executive reporting'], details: 'Quarterly deep-dive sessions, performance-against-goals analysis, strategic pivots, board-ready reporting, ongoing advisory retainer', martech: ['Looker Studio', 'Notion', 'Loom'] },
    ],
  },
  {
    id: 'operations',
    name: 'Marketing Operations & Automation',
    shortName: 'Operations',
    icon: Zap,
    color: 'from-cyan-500/15 to-blue-500/5',
    accentColor: 'text-cyan-600',
    badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    stat: '6 services',
    tagline: 'Fix the engine. Scale the machine.',
    description: 'Broken workflows, manual processes, and disconnected tools cost you time and money every day. I build the automated marketing engine underneath your business — CRM, email, data, integrations — so everything runs without constant intervention.',
    outcomes: ['Hours saved every week', 'Leads never fall through gaps', 'Systems that scale with you'],
    services: [
      { title: 'CRM Implementation & Optimization', bullets: ['Setup & configuration', 'Workflow automation', 'Data integration'], details: 'CRM setup, data migration, workflow automation, team training, ongoing optimization', martech: ['HubSpot', 'Salesforce', 'Pipedrive'] },
      { title: 'Email Marketing & Lifecycle Automation', bullets: ['Automation sequences', 'Lifecycle campaigns', 'Segmentation'], details: 'Segmentation strategy, email sequences, lifecycle campaigns, A/B testing, performance optimization', martech: ['Klaviyo', 'ConvertKit', 'ActiveCampaign'] },
      { title: 'AI & Workflow Automation', bullets: ['Process automation', 'AI integration', 'Efficiency gains'], details: 'Workflow design, tool integration, AI implementation, process optimization, ROI tracking', martech: ['Zapier', 'Make', 'n8n'] },
      { title: 'Lead Scoring & Nurture Architecture', bullets: ['Scoring model design', 'MQL/SQL thresholds', 'Nurture sequences'], details: 'Behavioral and demographic scoring model, MQL/SQL handoff rules, multi-touch nurture flows, sales alert triggers, reporting dashboard', martech: ['HubSpot', 'Marketo', 'Salesforce'] },
      { title: 'Marketing Data & CDP Setup', bullets: ['Data unification', 'Audience syncing', 'Identity resolution'], details: 'Source connection, identity stitching, audience segment creation, activation to ad platforms, data governance framework', martech: ['Segment', 'Amplitude', 'RudderStack'] },
      { title: 'Reporting Infrastructure & Dashboards', bullets: ['Unified data pipeline', 'Automated reporting', 'Stakeholder views'], details: 'Data source connections, metric taxonomy, automated weekly and monthly reports, executive and channel-level dashboards, anomaly alerting', martech: ['Looker Studio', 'Supermetrics', 'BigQuery'] },
    ],
  },
  {
    id: 'performance',
    name: 'Performance Marketing & Analytics',
    shortName: 'Performance',
    icon: BarChart3,
    color: 'from-emerald-500/15 to-green-500/5',
    accentColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    stat: '8 services',
    tagline: 'Track everything. Optimise what matters.',
    description: 'Paid media, SEO, attribution, CRO — I manage the channels that drive revenue and build the measurement frameworks to prove it. Every decision backed by data. Every dollar accountable.',
    outcomes: ['Clear attribution across channels', 'Higher ROAS on paid media', 'Conversion lifts from CRO'],
    services: [
      { title: 'Advanced Tracking & Attribution', bullets: ['GA4 implementation', 'Event tracking', 'Attribution modeling'], details: 'GA4 setup, event tracking, cross-domain tracking, attribution modeling, data validation', martech: ['Google Analytics 4', 'Mixpanel', 'Amplitude'] },
      { title: 'Paid Media Strategy & Management', bullets: ['Campaign strategy', 'Bid optimization', 'Performance reporting'], details: 'Campaign strategy, audience targeting, bid optimization, A/B testing, monthly reporting', martech: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'] },
      { title: 'Technical SEO & Search Authority', bullets: ['Site optimization', 'Technical fixes', 'Authority building'], details: 'Site structure optimization, schema markup, crawlability fixes, Core Web Vitals, link building', martech: ['Screaming Frog', 'Ahrefs', 'Google Search Console'] },
      { title: 'Conversion Rate Optimization', bullets: ['A/B testing', 'Funnel analysis', 'UX optimization'], details: 'Heatmap analysis, user testing, A/B testing, funnel optimization, friction point removal', martech: ['Hotjar', 'Unbounce', 'Optimizely'] },
      { title: 'Analytics & Reporting', bullets: ['Custom dashboards', 'Automated reporting', 'Data visualization'], details: 'Custom dashboards, automated reporting, insights & recommendations, data storytelling', martech: ['Looker Studio', 'Tableau', 'Data Studio'] },
      { title: 'Retargeting & Audience Strategy', bullets: ['Audience segmentation', 'Retargeting sequences', 'Suppression logic'], details: 'First-party audience build, multi-stage retargeting flows, lookalike seed creation, suppression list management, frequency and fatigue controls', martech: ['Meta Ads', 'Google Ads', 'AdRoll'] },
      { title: 'Customer Lifetime Value Optimization', bullets: ['LTV modeling', 'Retention campaigns', 'Upsell sequences'], details: 'Cohort LTV analysis, churn prediction signals, win-back campaigns, upsell and cross-sell automation, loyalty programme integration', martech: ['Klaviyo', 'Amplitude', 'Segment'] },
      { title: 'Budget Allocation & Media Mix Modeling', bullets: ['Spend analysis', 'Channel efficiency scoring', 'Scenario planning'], details: 'Historical spend audit, marginal return curves per channel, recommended allocation, quarterly rebalancing, scenario and sensitivity planning', martech: ['Looker Studio', 'Google Sheets', 'Northbeam'] },
    ],
  },
  {
    id: 'brand',
    name: 'Brand & Content Enablement',
    shortName: 'Brand & Content',
    icon: Palette,
    color: 'from-pink-500/15 to-rose-500/5',
    accentColor: 'text-pink-600',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    stat: '6 services',
    tagline: 'A story worth telling. Told well.',
    description: 'Brand positioning, messaging frameworks, content strategy, social direction — I help you define what you stand for and build the content engine to say it consistently. Awareness that actually converts.',
    outcomes: ['Clear, compelling positioning', 'Content that builds authority', 'Consistent voice across channels'],
    services: [
      { title: 'Messaging & Core Narrative', bullets: ['Brand positioning', 'Value proposition', 'Messaging framework'], details: 'Brand positioning, value proposition development, messaging framework, content pillars', martech: ['Notion', 'Figma', 'Brand.ai'] },
      { title: 'Social Media Strategy & Direction', bullets: ['Platform strategy', 'Content calendar', 'Community management'], details: 'Platform strategy, content calendar, creative guidelines, community management, engagement tracking', martech: ['Buffer', 'Later', 'Sprout Social'] },
      { title: 'Brand & Creative Assets', bullets: ['Asset creation', 'Brand guidelines', 'Creative direction'], details: 'Logo design, brand guidelines, templates, asset library, creative direction', martech: ['Figma', 'Canva', 'Adobe Creative Suite'] },
      { title: 'Content Marketing Strategy', bullets: ['Editorial planning', 'SEO content mapping', 'Distribution strategy'], details: 'Keyword-to-content mapping, editorial calendar, pillar and cluster architecture, distribution playbook, performance tracking framework', martech: ['Ahrefs', 'Notion', 'SEMrush'] },
      { title: 'Thought Leadership & PR Programme', bullets: ['Executive positioning', 'Media outreach', 'LinkedIn authority'], details: 'Executive voice development, media list curation, pitch creation, LinkedIn content strategy, speaking opportunity pipeline, coverage tracking', martech: ['Muck Rack', 'LinkedIn', 'Notion'] },
      { title: 'Video & Podcast Content Strategy', bullets: ['Format planning', 'Production briefs', 'Distribution & repurposing'], details: 'Format and cadence strategy, show concept development, recording briefs, repurposing workflow (clips, transcripts, newsletters), platform distribution', martech: ['Descript', 'Riverside', 'Buffer'] },
    ],
  },
  {
    id: 'technical',
    name: 'Technical Fixes & Optimization',
    shortName: 'Technical',
    icon: Code,
    color: 'from-amber-500/15 to-orange-500/5',
    accentColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    stat: '6 services',
    tagline: 'The fixes agencies miss.',
    description: 'Broken tracking, slow sites, leaky funnels, messy GTM containers — these are the problems that silently cost you conversions every day. I find them, fix them, and make sure they stay fixed.',
    outcomes: ['Accurate data you can trust', 'Faster site, better rankings', 'Funnels that convert'],
    services: [
      { title: 'Website Performance & Speed', bullets: ['Speed optimization', 'Core Web Vitals', 'Technical fixes'], details: 'Core Web Vitals optimization, image optimization, caching, CDN setup, performance monitoring', martech: ['PageSpeed Insights', 'GTmetrix', 'Cloudflare'] },
      { title: 'Tracking & Data Integrity', bullets: ['Tracking audit', 'Data validation', 'Implementation fixes'], details: 'Tag audit, data validation, duplicate removal, data quality assurance, ongoing monitoring', martech: ['Google Tag Manager', 'Segment', 'Tealium'] },
      { title: 'Broken Funnel & Conversion Diagnostics', bullets: ['Funnel analysis', 'Issue identification', 'Optimization'], details: 'Funnel analysis, drop-off identification, friction point removal, conversion optimization', martech: ['Hotjar', 'FullStory', 'Contentsquare'] },
      { title: 'Tag Management & GTM Audit', bullets: ['Container audit', 'Tag governance', 'Clean implementation'], details: 'Full GTM container review, redundant and misfiring tag cleanup, trigger logic refactor, naming convention standards, change governance process', martech: ['Google Tag Manager', 'ObservePoint', 'Datadog'] },
      { title: 'Landing Page & CRO Build', bullets: ['High-converting builds', 'A/B test variants', 'Form & CTA optimization'], details: 'Landing page design and build, above-the-fold hierarchy, form friction reduction, CTA testing, variant creation for A/B experiments, integration with CRM', martech: ['Webflow', 'Unbounce', 'HubSpot'] },
      { title: 'MarTech Integration & API Connectors', bullets: ['System integration', 'API setup', 'Data sync validation'], details: 'Point-to-point and middleware integration design, API authentication, field mapping, error handling, bi-directional sync testing and monitoring', martech: ['Zapier', 'Make', 'Segment'] },
    ],
  },
];

const PROOF_POINTS = [
  { stat: '32+', label: 'Services across 5 disciplines' },
  { stat: '1', label: 'Person. No agency layers' },
  { stat: 'Full-stack', label: 'Strategy through to implementation' },
  { stat: '40+', label: 'MarTech tools across the stack' },
];

export default function Services() {
  const search = useSearch();
  const [activePillar, setActivePillar] = useState('strategic');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const pillarParam = params.get('pillar');
    const serviceParam = params.get('service');
    if (pillarParam) setActivePillar(pillarParam);
    if (serviceParam) setExpandedService(serviceParam);
  }, [search]);

  const currentPillar = PILLARS.find((p) => p.id === activePillar)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            Full-stack digital marketing expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
            Everything digital.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">One person.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            From strategy and audits to CRM setup, paid media, SEO, and technical fixes — I cover the full digital marketing stack. No hand-offs, no agency layers, no gaps.
          </p>

          {/* Proof bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {PROOF_POINTS.map((p, i) => (
              <div key={i} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border">
                <p className="text-2xl font-extrabold text-accent leading-none mb-1">{p.stat}</p>
                <p className="text-xs text-foreground/55 leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillar Tabs — sticky ────────────────────────────────────── */}
      <div className="sticky top-24 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container py-3">
          <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide pb-1">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const active = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => { setActivePillar(pillar.id); setExpandedService(null); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap flex-shrink-0 text-sm border-2 ${
                    active
                      ? 'bg-accent text-white border-accent shadow-md'
                      : 'bg-background text-foreground/70 border-foreground/15 hover:border-accent hover:text-accent'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{pillar.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Pillar intro panel ──────────────────────────────────────── */}
      <section className={`py-14 bg-gradient-to-br ${currentPillar.color} border-b border-border`}>
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-background/70 backdrop-blur-sm border border-border">
                  {(() => { const Icon = currentPillar.icon; return <Icon className={`w-6 h-6 ${currentPillar.accentColor}`} />; })()}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${currentPillar.badgeColor}`}>
                  {currentPillar.stat}
                </span>
              </div>
              <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${currentPillar.accentColor}`}>{currentPillar.tagline}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">{currentPillar.name}</h2>
              <p className="text-foreground/65 leading-relaxed">{currentPillar.description}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">What you get</p>
              <div className="space-y-3">
                {currentPillar.outcomes.map((o, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/60">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${currentPillar.accentColor}`} />
                    <span className="text-sm font-semibold text-foreground">{o}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-accent hover:gap-3 transition-all cursor-pointer group">
                  Talk about this area <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-xs font-bold text-foreground/35 uppercase tracking-widest mb-8">
            {currentPillar.services.length} services in this area — click any to see what's included
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPillar.services.map((service, idx) => {
              const serviceId = `${activePillar}-${idx}`;
              const isOpen = expandedService === serviceId;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 bg-background ${
                    isOpen
                      ? 'border-accent shadow-lg shadow-accent/10'
                      : 'border-border hover:border-accent/50 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setExpandedService(isOpen ? null : serviceId)}
                    className="w-full text-left p-5 transition-colors hover:bg-accent/3"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold text-foreground leading-snug flex-1">{service.title}</h3>
                      <div className={`flex-shrink-0 p-1 rounded-full transition-all ${isOpen ? 'bg-accent text-white' : 'bg-secondary text-foreground/40'}`}>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.bullets.map((b, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-accent/8 text-accent rounded-full font-medium border border-accent/15">
                          {b}
                        </span>
                      ))}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-5 pb-5 pt-4 space-y-4 bg-accent/3">
                      <div>
                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-wide mb-2">What's included</p>
                        <p className="text-sm text-foreground/70 leading-relaxed">{service.details}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-wide mb-2">Tools I use</p>
                        <div className="flex flex-wrap gap-2">
                          {service.martech.map((tool, i) => (
                            <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                          <Button className="btn-nudge-primary w-full">
                            Send a Nudge about this
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── All pillars overview strip ──────────────────────────────── */}
      <section className="py-16 bg-secondary/40 border-t border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Everything I cover</h2>
            <p className="text-foreground/55">Five disciplines. One person who executes across all of them.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const active = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(pillar.id);
                    setExpandedService(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-4 rounded-xl text-left border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    active ? 'border-accent bg-accent/5' : 'border-border bg-background hover:border-accent/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg w-fit mb-3 ${active ? 'bg-accent/15' : 'bg-secondary'}`}>
                    <Icon className={`w-5 h-5 ${active ? 'text-accent' : 'text-foreground/60'}`} />
                  </div>
                  <p className={`text-sm font-bold leading-tight mb-1 ${active ? 'text-accent' : 'text-foreground'}`}>{pillar.shortName}</p>
                  <p className="text-xs text-foreground/45">{pillar.stat}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-accent/10 via-background to-accent/5">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Not sure where to start?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-xl mx-auto">
            Tell me what's not working. I'll tell you exactly what I'd fix first and why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary text-lg px-8 py-6">
                Send a Nudge
              </Button>
            </Link>
            <Link href="/services-marketplace" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="text-lg px-8 py-6 border-2">
                Browse fixed-price services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
