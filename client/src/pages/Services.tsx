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
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            I handle everything from SEO and email marketing to CRM setup, automation, and complete digital strategy. Full-stack digital marketing expertise.
          </p>
        </div>
      </section>

      {/* Pillars Tabs */}
      <section className="py-12 md:py-16 bg-background border-b border-border sticky top-24 z-40">
        <div className="container">
              <div className="flex flex-wrap gap-3 justify-center">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(pillar.id);
                    setExpandedService(null);
                  }}
                  className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all text-base md:text-lg ${
                    activePillar === pillar.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">{pillar.name}</span>
                  <span className="sm:hidden text-xs">{pillar.name.split(' ')[0]}</span>
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
