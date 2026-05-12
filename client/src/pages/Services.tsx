import { useState, useEffect } from 'react';
import { useSearch } from 'wouter';
import { ChevronDown, Zap, TrendingUp, Code, BarChart3, Palette, Lightbulb, Rocket, Target, Database, Settings, Gauge, CheckCircle, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const PILLARS = [
  {
    id: 'strategic',
    name: 'Strategic Advisory & Audits',
    icon: TrendingUp,
    description: 'I analyze your entire digital ecosystem and create a roadmap for growth.',
    services: [
      {
        title: 'Comprehensive Digital Marketing Audit',
        bullets: ['Full-spectrum analysis', 'Competitive benchmarking', 'Gap identification'],
        details: 'Website audit, competitor analysis, MarTech stack review, performance benchmarking, detailed recommendations',
        martech: ['Google Analytics', 'SEMrush', 'Hotjar'],
      },
      {
        title: 'Growth Strategy & Roadmap',
        bullets: ['Strategic planning', 'Opportunity identification', 'Implementation timeline'],
        details: 'Market research, opportunity identification, prioritization, 12-month implementation roadmap',
        martech: ['Miro', 'Notion', 'Looker Studio'],
      },
      {
        title: 'MarTech Stack Consulting',
        bullets: ['Tool evaluation', 'Integration planning', 'Cost optimization'],
        details: 'Stack audit, tool recommendations, integration planning, cost optimization, vendor selection',
        martech: ['Zapier', 'Make', 'Segment'],
      },
      {
        title: 'Competitive Intelligence & Market Mapping',
        bullets: ['Competitor profiling', 'Share of voice analysis', 'Market positioning'],
        details: 'In-depth competitor teardowns, share of voice tracking, positioning matrix, whitespace identification, monthly intelligence reports',
        martech: ['Similarweb', 'SEMrush', 'SparkToro'],
      },
      {
        title: 'Go-To-Market Strategy',
        bullets: ['Launch planning', 'Channel prioritization', 'Audience segmentation'],
        details: 'ICP definition, channel mix strategy, messaging hierarchy, launch sequencing, success metrics and OKR framework',
        martech: ['Notion', 'Miro', 'HubSpot'],
      },
      {
        title: 'Quarterly Business Reviews & Advisory',
        bullets: ['Performance review', 'Strategic recalibration', 'Executive reporting'],
        details: 'Quarterly deep-dive sessions, performance-against-goals analysis, strategic pivots, board-ready reporting, ongoing advisory retainer',
        martech: ['Looker Studio', 'Notion', 'Loom'],
      },
    ],
  },
  {
    id: 'operations',
    name: 'Marketing Operations & Automation',
    icon: Zap,
    description: 'I fix broken workflows and automate your marketing engine.',
    services: [
      {
        title: 'CRM Implementation & Optimization',
        bullets: ['Setup & configuration', 'Workflow automation', 'Data integration'],
        details: 'CRM setup, data migration, workflow automation, team training, ongoing optimization',
        martech: ['HubSpot', 'Salesforce', 'Pipedrive'],
      },
      {
        title: 'Email Marketing & Lifecycle Automation',
        bullets: ['Automation sequences', 'Lifecycle campaigns', 'Segmentation'],
        details: 'Segmentation strategy, email sequences, lifecycle campaigns, A/B testing, performance optimization',
        martech: ['Klaviyo', 'ConvertKit', 'ActiveCampaign'],
      },
      {
        title: 'AI & Workflow Automation',
        bullets: ['Process automation', 'AI integration', 'Efficiency gains'],
        details: 'Workflow design, tool integration, AI implementation, process optimization, ROI tracking',
        martech: ['Zapier', 'Make', 'n8n'],
      },
      {
        title: 'Lead Scoring & Nurture Architecture',
        bullets: ['Scoring model design', 'MQL/SQL thresholds', 'Nurture sequences'],
        details: 'Behavioral and demographic scoring model, MQL/SQL handoff rules, multi-touch nurture flows, sales alert triggers, reporting dashboard',
        martech: ['HubSpot', 'Marketo', 'Salesforce'],
      },
      {
        title: 'Marketing Data & CDP Setup',
        bullets: ['Data unification', 'Audience syncing', 'Identity resolution'],
        details: 'Source connection, identity stitching, audience segment creation, activation to ad platforms, data governance framework',
        martech: ['Segment', 'Amplitude', 'RudderStack'],
      },
      {
        title: 'Reporting Infrastructure & Dashboards',
        bullets: ['Unified data pipeline', 'Automated reporting', 'Stakeholder views'],
        details: 'Data source connections, metric taxonomy, automated weekly and monthly reports, executive and channel-level dashboards, anomaly alerting',
        martech: ['Looker Studio', 'Supermetrics', 'BigQuery'],
      },
    ],
  },
  {
    id: 'performance',
    name: 'Performance Marketing & Analytics',
    icon: BarChart3,
    description: 'I optimize for results and track what actually matters.',
    services: [
      {
        title: 'Advanced Tracking & Attribution',
        bullets: ['GA4 implementation', 'Event tracking', 'Attribution modeling'],
        details: 'GA4 setup, event tracking, cross-domain tracking, attribution modeling, data validation',
        martech: ['Google Analytics 4', 'Mixpanel', 'Amplitude'],
      },
      {
        title: 'Paid Media Strategy & Management',
        bullets: ['Campaign strategy', 'Bid optimization', 'Performance reporting'],
        details: 'Campaign strategy, audience targeting, bid optimization, A/B testing, monthly reporting',
        martech: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'],
      },
      {
        title: 'Technical SEO & Search Authority',
        bullets: ['Site optimization', 'Technical fixes', 'Authority building'],
        details: 'Site structure optimization, schema markup, crawlability fixes, Core Web Vitals, link building',
        martech: ['Screaming Frog', 'Ahrefs', 'Google Search Console'],
      },
      {
        title: 'Conversion Rate Optimization',
        bullets: ['A/B testing', 'Funnel analysis', 'UX optimization'],
        details: 'Heatmap analysis, user testing, A/B testing, funnel optimization, friction point removal',
        martech: ['Hotjar', 'Unbounce', 'Optimizely'],
      },
      {
        title: 'Analytics & Reporting',
        bullets: ['Custom dashboards', 'Automated reporting', 'Data visualization'],
        details: 'Custom dashboards, automated reporting, insights & recommendations, data storytelling',
        martech: ['Looker Studio', 'Tableau', 'Data Studio'],
      },
      {
        title: 'Retargeting & Audience Strategy',
        bullets: ['Audience segmentation', 'Retargeting sequences', 'Suppression logic'],
        details: 'First-party audience build, multi-stage retargeting flows, lookalike seed creation, suppression list management, frequency and fatigue controls',
        martech: ['Meta Ads', 'Google Ads', 'AdRoll'],
      },
      {
        title: 'Customer Lifetime Value Optimization',
        bullets: ['LTV modeling', 'Retention campaigns', 'Upsell sequences'],
        details: 'Cohort LTV analysis, churn prediction signals, win-back campaigns, upsell and cross-sell automation, loyalty programme integration',
        martech: ['Klaviyo', 'Amplitude', 'Segment'],
      },
      {
        title: 'Budget Allocation & Media Mix Modeling',
        bullets: ['Spend analysis', 'Channel efficiency scoring', 'Scenario planning'],
        details: 'Historical spend audit, marginal return curves per channel, recommended allocation, quarterly rebalancing, scenario and sensitivity planning',
        martech: ['Looker Studio', 'Google Sheets', 'Northbeam'],
      },
    ],
  },
  {
    id: 'brand',
    name: 'Brand & Content Enablement',
    icon: Palette,
    description: 'I help you tell your story and build authority.',
    services: [
      {
        title: 'Messaging & Core Narrative',
        bullets: ['Brand positioning', 'Value proposition', 'Messaging framework'],
        details: 'Brand positioning, value proposition development, messaging framework, content pillars',
        martech: ['Notion', 'Figma', 'Brand.ai'],
      },
      {
        title: 'Social Media Strategy & Direction',
        bullets: ['Platform strategy', 'Content calendar', 'Community management'],
        details: 'Platform strategy, content calendar, creative guidelines, community management, engagement tracking',
        martech: ['Buffer', 'Later', 'Sprout Social'],
      },
      {
        title: 'Brand & Creative Assets',
        bullets: ['Asset creation', 'Brand guidelines', 'Creative direction'],
        details: 'Logo design, brand guidelines, templates, asset library, creative direction',
        martech: ['Figma', 'Canva', 'Adobe Creative Suite'],
      },
      {
        title: 'Content Marketing Strategy',
        bullets: ['Editorial planning', 'SEO content mapping', 'Distribution strategy'],
        details: 'Keyword-to-content mapping, editorial calendar, pillar and cluster architecture, distribution playbook, performance tracking framework',
        martech: ['Ahrefs', 'Notion', 'SEMrush'],
      },
      {
        title: 'Thought Leadership & PR Programme',
        bullets: ['Executive positioning', 'Media outreach', 'LinkedIn authority'],
        details: 'Executive voice development, media list curation, pitch creation, LinkedIn content strategy, speaking opportunity pipeline, coverage tracking',
        martech: ['Muck Rack', 'LinkedIn', 'Notion'],
      },
      {
        title: 'Video & Podcast Content Strategy',
        bullets: ['Format planning', 'Production briefs', 'Distribution & repurposing'],
        details: 'Format and cadence strategy, show concept development, recording briefs, repurposing workflow (clips, transcripts, newsletters), platform distribution',
        martech: ['Descript', 'Riverside', 'Buffer'],
      },
    ],
  },
  {
    id: 'technical',
    name: 'Technical Fixes & Optimization',
    icon: Code,
    description: 'I solve the technical problems that agencies overlook.',
    services: [
      {
        title: 'Website Performance & Speed',
        bullets: ['Speed optimization', 'Core Web Vitals', 'Technical fixes'],
        details: 'Core Web Vitals optimization, image optimization, caching, CDN setup, performance monitoring',
        martech: ['PageSpeed Insights', 'GTmetrix', 'Cloudflare'],
      },
      {
        title: 'Tracking & Data Integrity',
        bullets: ['Tracking audit', 'Data validation', 'Implementation fixes'],
        details: 'Tag audit, data validation, duplicate removal, data quality assurance, ongoing monitoring',
        martech: ['Google Tag Manager', 'Segment', 'Tealium'],
      },
      {
        title: 'Broken Funnel & Conversion Diagnostics',
        bullets: ['Funnel analysis', 'Issue identification', 'Optimization'],
        details: 'Funnel analysis, drop-off identification, friction point removal, conversion optimization',
        martech: ['Hotjar', 'FullStory', 'Contentsquare'],
      },
      {
        title: 'Tag Management & GTM Audit',
        bullets: ['Container audit', 'Tag governance', 'Clean implementation'],
        details: 'Full GTM container review, redundant and misfiring tag cleanup, trigger logic refactor, naming convention standards, change governance process',
        martech: ['Google Tag Manager', 'ObservePoint', 'Datadog'],
      },
      {
        title: 'Landing Page & CRO Build',
        bullets: ['High-converting builds', 'A/B test variants', 'Form & CTA optimization'],
        details: 'Landing page design and build, above-the-fold hierarchy, form friction reduction, CTA testing, variant creation for A/B experiments, integration with CRM',
        martech: ['Webflow', 'Unbounce', 'HubSpot'],
      },
      {
        title: 'MarTech Integration & API Connectors',
        bullets: ['System integration', 'API setup', 'Data sync validation'],
        details: 'Point-to-point and middleware integration design, API authentication, field mapping, error handling, bi-directional sync testing and monitoring',
        martech: ['Zapier', 'Make', 'Segment'],
      },
    ],
  },
];

export default function Services() {
  const search = useSearch();
  const [activePillar, setActivePillar] = useState('strategic');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Handle URL parameters to open specific service
  useEffect(() => {
    const params = new URLSearchParams(search);
    const pillarParam = params.get('pillar');
    const serviceParam = params.get('service');

    if (pillarParam) {
      setActivePillar(pillarParam);
    }

    if (serviceParam) {
      setExpandedService(serviceParam);
    }
  }, [search]);

  const currentPillar = PILLARS.find((p) => p.id === activePillar);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            I handle everything from SEO and email marketing to CRM setup, automation, and complete digital strategy. Full-stack digital marketing expertise.
          </p>
        </div>
      </section>

      {/* Pillars Tabs — single scrollable row */}
      <section className="py-6 bg-background border-b border-border sticky top-24 z-40">
        <div className="container">
          <div className="flex flex-nowrap gap-2 justify-center overflow-x-auto scrollbar-hide pb-1">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(pillar.id);
                    setExpandedService(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap flex-shrink-0 text-sm ${
                    activePillar === pillar.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{pillar.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <div className="container">
          {currentPillar && (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{currentPillar.name}</h2>
                <p className="text-lg text-foreground/60">{currentPillar.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {currentPillar.services.map((service, idx) => {
                  const serviceId = `${activePillar}-${idx}`;
                  return (
                  <div key={idx} className="glass-card overflow-hidden flex flex-col">
                    <button
                      onClick={() =>
                        setExpandedService(
                          expandedService === serviceId ? null : serviceId
                        )
                      }
                      className="w-full text-left p-6 hover:bg-accent/5 transition-colors flex-1 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-lg font-bold text-foreground flex-1">{service.title}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                            expandedService === serviceId ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      <ul className="space-y-2">
                        {service.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="text-accent font-bold mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </button>

                    {expandedService === serviceId && (
                      <div className="border-t border-border p-6 bg-accent/5 space-y-4 animate-slide-in-down">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">What's Included</h4>
                          <p className="text-foreground/70 text-sm">{service.details}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-3">MarTech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.martech.map((tool, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                            <Button className="btn-nudge-primary w-full text-lg px-8 py-6">
                              Send a Nudge
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Need Something Custom?
          </h2>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
            Not sure which service is right for you? Let's discuss your specific needs.
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
