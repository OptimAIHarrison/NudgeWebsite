import { useState } from 'react';
import { ChevronDown, Zap, TrendingUp, Code, Palette, BarChart3, Lock, Mail, Settings, Layers } from 'lucide-react';
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
        description: 'Full analysis of your current strategy, tools, and performance',
        details: 'Website audit, competitor analysis, MarTech stack review, performance benchmarking',
        martech: 'Google Analytics, SEMrush, Hotjar',
      },
      {
        title: 'Growth Strategy & Roadmap Development',
        description: 'Custom 12-month strategy tailored to your business',
        details: 'Market research, opportunity identification, prioritization, implementation timeline',
        martech: 'Miro, Notion, Looker Studio',
      },
      {
        title: 'Marketing Technology (MarTech) Stack Consulting',
        description: 'Optimize your tools and integrations',
        details: 'Stack audit, tool recommendations, integration planning, cost optimization',
        martech: 'Zapier, Make, Segment',
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
        description: 'Get your CRM working for you, not against you',
        details: 'Setup, data migration, workflow automation, team training',
        martech: 'HubSpot, Salesforce, Pipedrive',
      },
      {
        title: 'Email Marketing (EDM) & Lifecycle Automation',
        description: 'Automated nurture sequences that convert',
        details: 'Segmentation strategy, email sequences, lifecycle campaigns, A/B testing',
        martech: 'Klaviyo, ConvertKit, ActiveCampaign',
      },
      {
        title: 'AI & Workflow Automation',
        description: 'Eliminate manual tasks with intelligent automation',
        details: 'Workflow design, tool integration, AI implementation, process optimization',
        martech: 'Zapier, Make, n8n',
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
        description: 'Know exactly where your conversions come from',
        details: 'GA4 setup, event tracking, cross-domain tracking, attribution modeling',
        martech: 'Google Analytics 4, Mixpanel, Amplitude',
      },
      {
        title: 'Paid Media Strategy & Management',
        description: 'Maximize ROI on every ad dollar spent',
        details: 'Campaign strategy, audience targeting, bid optimization, reporting',
        martech: 'Google Ads, Meta Ads, LinkedIn Ads',
      },
      {
        title: 'Technical SEO & Search Authority',
        description: 'Dominate search results with technical excellence',
        details: 'Site structure optimization, schema markup, crawlability fixes, Core Web Vitals',
        martech: 'Screaming Frog, Ahrefs, Google Search Console',
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        description: 'Get more from your existing traffic',
        details: 'Heatmap analysis, user testing, A/B testing, funnel optimization',
        martech: 'Hotjar, Unbounce, Optimizely',
      },
      {
        title: 'Analytics & Reporting',
        description: 'Dashboards that tell the real story',
        details: 'Custom dashboards, automated reporting, insights & recommendations',
        martech: 'Looker Studio, Tableau, Data Studio',
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
        title: 'Messaging Hierarchy & Core Narrative Development',
        description: 'Crystal clear messaging that resonates',
        details: 'Brand positioning, value proposition, messaging framework, content pillars',
        martech: 'Notion, Figma, Brand.ai',
      },
      {
        title: 'Social Media Strategy & Creative Direction',
        description: 'Social presence that drives real engagement',
        details: 'Platform strategy, content calendar, creative guidelines, community management',
        martech: 'Buffer, Later, Sprout Social',
      },
      {
        title: 'Brand & Creative Assets Development',
        description: 'Professional assets that elevate your brand',
        details: 'Logo design, brand guidelines, templates, asset library',
        martech: 'Figma, Canva, Adobe Creative Suite',
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
        title: 'Website Performance & Speed Optimization',
        description: 'Lightning-fast sites that convert better',
        details: 'Core Web Vitals optimization, image optimization, caching, CDN setup',
        martech: 'PageSpeed Insights, GTmetrix, Cloudflare',
      },
      {
        title: 'Tracking & Data Integrity Cleanups',
        description: 'Fix your broken data and tracking',
        details: 'Tag audit, data validation, duplicate removal, data quality assurance',
        martech: 'Google Tag Manager, Segment, Tealium',
      },
      {
        title: 'Broken Funnel & Conversion Path Diagnostics',
        description: 'Find and fix where you\'re losing customers',
        details: 'Funnel analysis, drop-off identification, friction point removal, optimization',
        martech: 'Hotjar, FullStory, Contentsquare',
      },
    ],
  },
];

export default function Services() {
  const [activePillar, setActivePillar] = useState('strategic');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const currentPillar = PILLARS.find((p) => p.id === activePillar);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              What I Offer
            </h1>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
              I handle everything from SEO and email marketing to CRM setup, automation, and complete digital strategy. Full-stack digital marketing expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Tabs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 overflow-x-auto pb-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    activePillar === pillar.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-card text-foreground hover:bg-card/80'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{pillar.name}</span>
                  <span className="sm:hidden text-sm">{pillar.name.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Pillar Content */}
          {currentPillar && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-foreground mb-4">{currentPillar.name}</h2>
                <p className="text-xl text-foreground/60">{currentPillar.description}</p>
              </div>

              {/* Services */}
              <div className="space-y-4">
                {currentPillar.services.map((service, idx) => (
                  <div key={idx} className="glass-card">
                    <button
                      onClick={() =>
                        setExpandedService(
                          expandedService === `${activePillar}-${idx}` ? null : `${activePillar}-${idx}`
                        )
                      }
                      className="w-full text-left flex items-start justify-between gap-4 p-6"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{service.title}</h3>
                        <p className="text-foreground/60">{service.description}</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                          expandedService === `${activePillar}-${idx}` ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedService === `${activePillar}-${idx}` && (
                      <div className="border-t border-border px-6 py-6 space-y-4 bg-card/50">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">What's Included</h4>
                          <p className="text-foreground/70">{service.details}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Tools & Platforms</h4>
                          <p className="text-foreground/70">{service.martech}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
            Let's discuss your challenges and find the right solution for your business.
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
