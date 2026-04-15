import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface SubService {
  title: string;
  description: string;
  tasks: string[];
  deliverables: string[];
  martech: string[];
}

interface ServicePillar {
  id: string;
  title: string;
  description: string;
  services: SubService[];
}

const servicePillars: ServicePillar[] = [
  {
    id: 'strategic-advisory',
    title: 'Strategic Advisory & Audits',
    description: 'Establish the foundational roadmap for digital growth.',
    services: [
      {
        title: 'Comprehensive Digital Marketing Audit',
        description: 'Full-spectrum analysis of your current digital presence.',
        tasks: ['SEO, SEM, Social, Email, CRM, Analytics analysis', 'Performance benchmarking', 'Gap identification'],
        deliverables: ['Executive Summary', 'Detailed Audit Report', 'Recommendations'],
        martech: ['GA4', 'Google Search Console', 'SEMrush', 'Ahrefs', 'HubSpot'],
      },
      {
        title: 'Growth Strategy & Roadmap Development',
        description: 'Tailored digital marketing strategies with clear KPIs.',
        tasks: ['3-6-12 month strategic roadmaps', 'Market research', 'Audience segmentation'],
        deliverables: ['Strategic Growth Plan', 'Implementation Blueprint', 'KPI Dashboard'],
        martech: ['SWOT Analysis', 'Customer Journey Mapping', 'Value Proposition Canvas'],
      },
      {
        title: 'Marketing Technology Stack Consulting',
        description: 'Assessment and optimization of your MarTech infrastructure.',
        tasks: ['Stack efficiency evaluation', 'Vendor evaluation', 'Implementation planning'],
        deliverables: ['Optimization Report', 'Integration Plan', 'Tool Recommendations'],
        martech: ['HubSpot', 'Salesforce', 'Zoho CRM', 'ActiveCampaign', 'Klaviyo'],
      },
    ],
  },
  {
    id: 'marketing-operations',
    title: 'Marketing Operations & Automation',
    description: 'Build robust, efficient, and scalable marketing systems.',
    services: [
      {
        title: 'CRM Implementation & Optimization',
        description: 'Full CRM setup and customization for your business.',
        tasks: ['CRM setup and customization', 'Data modeling', 'Lead scoring and routing'],
        deliverables: ['Configured CRM System', 'Documentation', 'Team Training'],
        martech: ['HubSpot CRM', 'Salesforce', 'Zoho CRM', 'Pipedrive', 'Zapier'],
      },
      {
        title: 'Email Marketing & Lifecycle Automation',
        description: 'Advanced email marketing strategies and automated flows.',
        tasks: ['Email marketing strategies', 'Automated flow design', 'Segmentation setup'],
        deliverables: ['Email Strategy', 'Automated Workflows', 'Performance Reports'],
        martech: ['Klaviyo', 'ActiveCampaign', 'HubSpot', 'Mailchimp', 'Braze'],
      },
      {
        title: 'AI & Workflow Automation',
        description: 'Complex multi-step automation workflows and API integrations.',
        tasks: ['AI tool integration', 'Workflow design', 'API integrations'],
        deliverables: ['Automation Blueprint', 'Implemented Workflows', 'Documentation'],
        martech: ['Zapier', 'Make', 'Tray.io', 'OpenAI API', 'HubSpot Workflows'],
      },
    ],
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing & Analytics',
    description: 'Drive measurable growth through data-informed strategies.',
    services: [
      {
        title: 'Advanced Tracking & Attribution',
        description: 'Robust tracking infrastructure and attribution setup.',
        tasks: ['GTM Server-Side implementation', 'GA4 setup', 'Multi-touch attribution'],
        deliverables: ['Tracking Infrastructure', 'Attribution Reports', 'Data Validation'],
        martech: ['GA4', 'GTM', 'Segment', 'Tealium', 'Supermetrics'],
      },
      {
        title: 'Paid Media Strategy & Management',
        description: 'Full-funnel campaign strategy and optimization.',
        tasks: ['Campaign strategy', 'Audience segmentation', 'CAPI implementation'],
        deliverables: ['Optimized Campaigns', 'Performance Reports', 'Recommendations'],
        martech: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Looker Studio'],
      },
      {
        title: 'Technical SEO & Search Authority',
        description: 'Comprehensive technical SEO and authority building.',
        tasks: ['Technical SEO audit', 'Core Web Vitals optimization', 'Schema markup'],
        deliverables: ['SEO Audit Report', 'Implementation Plan', 'Optimization Guide'],
        martech: ['Screaming Frog', 'Ahrefs', 'SEMrush', 'Google Search Console', 'Surfer SEO'],
      },
      {
        title: 'Conversion Rate Optimization',
        description: 'User behavior analysis and conversion optimization.',
        tasks: ['Behavior analysis', 'A/B testing setup', 'Landing page optimization'],
        deliverables: ['CRO Audit', 'Experimentation Roadmap', 'Performance Insights'],
        martech: ['Hotjar', 'Crazy Egg', 'Optimizely', 'VWO', 'Google Optimize'],
      },
      {
        title: 'Analytics & Reporting',
        description: 'Custom dashboards and strategic performance reporting.',
        tasks: ['Dashboard creation', 'Data integration', 'Performance reporting'],
        deliverables: ['Custom Dashboards', 'Monthly Reports', 'Strategic Insights'],
        martech: ['Looker Studio', 'Tableau', 'Power BI', 'Supermetrics', 'BigQuery'],
      },
    ],
  },
  {
    id: 'brand-content',
    title: 'Brand & Content Enablement',
    description: 'Craft compelling narratives and create high-impact content.',
    services: [
      {
        title: 'Messaging Hierarchy & Core Narrative',
        description: 'Development of core brand messaging and value propositions.',
        tasks: ['Stakeholder interviews', 'Messaging development', 'Framework creation'],
        deliverables: ['Brand Messaging Guide', 'Core Narrative', 'Messaging Frameworks'],
        martech: ['Strategic Frameworks', 'Brand Guidelines'],
      },
      {
        title: 'Social Media Strategy & Creative Direction',
        description: 'Comprehensive social media strategy with creative direction.',
        tasks: ['Social strategy development', 'Audience segmentation', 'Creative briefs'],
        deliverables: ['Strategy Document', 'Content Calendar', 'Creative Briefs'],
        martech: ['Sprout Social', 'Hootsuite', 'Brandwatch', 'BuzzSumo', 'Canva'],
      },
      {
        title: 'Brand & Creative Assets Development',
        description: 'Design and development of marketing collateral.',
        tasks: ['Brand guidelines creation', 'Collateral design', 'Asset optimization'],
        deliverables: ['Brand Asset Library', 'Design Templates', 'Style Guides'],
        martech: ['Adobe Creative Suite', 'Canva', 'Figma'],
      },
    ],
  },
  {
    id: 'technical-fixes',
    title: 'Technical Fixes & Optimization',
    description: 'Address critical technical issues and optimize performance.',
    services: [
      {
        title: 'Website Performance & Speed Optimization',
        description: 'Analysis and optimization of website loading times.',
        tasks: ['Performance analysis', 'Image optimization', 'Caching configuration'],
        deliverables: ['Optimization Report', 'Improvements', 'Performance Metrics'],
        martech: ['PageSpeed Insights', 'GTmetrix', 'Lighthouse', 'Cloudflare'],
      },
      {
        title: 'Tracking & Data Integrity Cleanups',
        description: 'Auditing and resolution of tracking setup errors.',
        tasks: ['Tracking audit', 'GTM debugging', 'Data layer resolution'],
        deliverables: ['Audit Report', 'Cleaned Data Streams', 'Documentation'],
        martech: ['Google Tag Assistant', 'GTM Debugger', 'GA4 DebugView', 'Pixel Helper'],
      },
      {
        title: 'Broken Funnel & Conversion Path Diagnostics',
        description: 'Identification and resolution of conversion path issues.',
        tasks: ['Link identification', 'Flow analysis', 'Issue resolution'],
        deliverables: ['Diagnostic Report', 'Resolved Issues', 'Testing Results'],
        martech: ['Hotjar', 'Google Analytics', 'CRM Reports', 'Developer Tools'],
      },
    ],
  },
];

export default function Services() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl">
            Comprehensive digital marketing solutions across five strategic pillars.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            {servicePillars.map((pillar) => (
              <div key={pillar.id} className="space-y-4">
                <button
                  onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                  className="w-full glass-card p-6 flex items-start justify-between hover:border-accent/50 transition-all"
                >
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{pillar.title}</h2>
                    <p className="text-foreground/60">{pillar.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-accent flex-shrink-0 transition-transform ${
                      expandedPillar === pillar.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedPillar === pillar.id && (
                  <div className="space-y-4 animate-slide-in-down">
                    {pillar.services.map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setExpandedService(
                            expandedService === `${pillar.id}-${idx}` ? null : `${pillar.id}-${idx}`
                          )
                        }
                        className="w-full glass-panel p-6 text-left hover:border-accent/50 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {service.title}
                            </h3>
                            <p className="text-sm text-foreground/60">{service.description}</p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                              expandedService === `${pillar.id}-${idx}` ? 'rotate-180' : ''
                            }`}
                          />
                        </div>

                        {expandedService === `${pillar.id}-${idx}` && (
                          <div className="mt-6 pt-6 border-t border-border/50 space-y-4 animate-slide-in-down">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Technical Tasks:</h4>
                              <ul className="space-y-1">
                                {service.tasks.map((task, i) => (
                                  <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Deliverables:</h4>
                              <ul className="space-y-1">
                                {service.deliverables.map((deliverable, i) => (
                                  <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                                    <span className="text-accent mt-1">•</span>
                                    {deliverable}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">MarTech Stack:</h4>
                              <div className="flex flex-wrap gap-2">
                                {service.martech.map((tool, i) => (
                                  <span
                                    key={i}
                                    className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
            Let us discuss which services are right for your business.
          </p>
          <Link href="/contact">
            <Button className="btn-nudge-primary">
              Send Us a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
