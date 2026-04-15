import { useState } from 'react';
import { ChevronDown, BarChart3, TrendingUp, Code, Palette, Zap, Database, Gauge, Lightbulb, Target, Layers } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tasks: string[];
  deliverables: string[];
  martech: string[];
}

interface Pillar {
  id: string;
  name: string;
  description: string;
  services: Service[];
}

export default function Services() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const pillars: Pillar[] = [
    {
      id: 'strategic',
      name: 'Strategic Advisory & Audits',
      description: 'I help you understand where you stand and where you need to go.',
      services: [
        {
          id: 'audit',
          name: 'Comprehensive Digital Marketing Audit',
          description: 'A deep dive into your entire digital presence.',
          icon: <BarChart3 className="w-6 h-6" />,
          tasks: ['Audit tracking and data', 'Analyze conversion funnels', 'Review content strategy', 'Assess paid media', 'Evaluate MarTech stack'],
          deliverables: ['Audit report', 'Priority recommendations', 'Quick wins list', 'Detailed findings'],
          martech: ['Google Analytics 4', 'GTM', 'Hotjar', 'SEMrush'],
        },
        {
          id: 'strategy',
          name: 'Growth Strategy & Roadmap',
          description: 'I create a clear roadmap for your digital growth.',
          icon: <TrendingUp className="w-6 h-6" />,
          tasks: ['Define growth objectives', 'Identify opportunities', 'Build 12-month roadmap', 'Prioritize initiatives', 'Set success metrics'],
          deliverables: ['Strategic roadmap', 'Quarterly milestones', 'KPI framework', 'Implementation timeline'],
          martech: ['Miro', 'Notion', 'Asana'],
        },
        {
          id: 'martech',
          name: 'MarTech Stack Consulting',
          description: 'I help you build or optimize your MarTech stack.',
          icon: <Layers className="w-6 h-6" />,
          tasks: ['Evaluate current tools', 'Identify gaps', 'Recommend solutions', 'Plan integration', 'Create timeline'],
          deliverables: ['Stack audit', 'Recommendations report', 'Integration roadmap', 'Cost-benefit analysis'],
          martech: ['HubSpot', 'Salesforce', 'Zapier', 'Make'],
        },
      ],
    },
    {
      id: 'operations',
      name: 'Marketing Operations & Automation',
      description: 'I fix your broken systems and automate your workflows.',
      services: [
        {
          id: 'crm',
          name: 'CRM Implementation & Optimization',
          description: 'I set up and optimize your CRM so your team actually uses it.',
          icon: <Database className="w-6 h-6" />,
          tasks: ['Design CRM architecture', 'Configure custom fields', 'Set up lead scoring', 'Create workflows', 'Train your team'],
          deliverables: ['Configured CRM', 'Documentation', 'Training sessions', 'Workflow setup'],
          martech: ['HubSpot', 'Salesforce', 'Pipedrive'],
        },
        {
          id: 'automation',
          name: 'Email & Lifecycle Automation',
          description: 'I build workflows that nurture leads and drive conversions.',
          icon: <Zap className="w-6 h-6" />,
          tasks: ['Design email sequences', 'Set up lifecycle workflows', 'Create segmentation', 'Build triggers', 'Optimize send times'],
          deliverables: ['Email sequences', 'Automation workflows', 'Segmentation strategy', 'Performance reports'],
          martech: ['HubSpot', 'Klaviyo', 'ActiveCampaign'],
        },
        {
          id: 'ai',
          name: 'AI & Workflow Automation',
          description: 'I leverage AI to eliminate manual work.',
          icon: <Lightbulb className="w-6 h-6" />,
          tasks: ['Identify automation opportunities', 'Implement AI tools', 'Build workflows', 'Set up data sync', 'Monitor and optimize'],
          deliverables: ['Automated workflows', 'AI tool integration', 'Process documentation', 'Training materials'],
          martech: ['Make', 'Zapier', 'ChatGPT', 'Airtable'],
        },
      ],
    },
    {
      id: 'performance',
      name: 'Performance Marketing & Analytics',
      description: 'I optimize your marketing for measurable results.',
      services: [
        {
          id: 'tracking',
          name: 'Advanced Tracking & Attribution',
          description: 'I fix your broken tracking and implement proper attribution.',
          icon: <Target className="w-6 h-6" />,
          tasks: ['Audit tracking setup', 'Implement GA4', 'Set up server-side tracking', 'Configure conversions', 'Build attribution model'],
          deliverables: ['Tracking implementation', 'GA4 setup', 'Attribution model', 'Tracking documentation'],
          martech: ['Google Analytics 4', 'GTM', 'Segment'],
        },
        {
          id: 'paid',
          name: 'Paid Media Strategy & Management',
          description: 'I optimize your paid campaigns for better ROI.',
          icon: <Gauge className="w-6 h-6" />,
          tasks: ['Audit campaigns', 'Develop media strategy', 'Optimize bidding', 'Improve targeting', 'A/B test creative'],
          deliverables: ['Campaign strategy', 'Optimized campaigns', 'Monthly reports', 'Recommendations'],
          martech: ['Google Ads', 'Meta Ads', 'LinkedIn Ads'],
        },
        {
          id: 'seo',
          name: 'Technical SEO & Search Authority',
          description: 'I fix technical SEO issues and build your search authority.',
          icon: <Code className="w-6 h-6" />,
          tasks: ['Audit technical SEO', 'Fix crawl issues', 'Optimize site structure', 'Improve page speed', 'Build authority'],
          deliverables: ['Technical SEO audit', 'Implementation roadmap', 'Site improvements', 'Authority building plan'],
          martech: ['SEMrush', 'Ahrefs', 'Screaming Frog'],
        },
        {
          id: 'cro',
          name: 'Conversion Rate Optimization',
          description: 'I optimize your funnels to convert more visitors.',
          icon: <TrendingUp className="w-6 h-6" />,
          tasks: ['Analyze user behavior', 'Identify bottlenecks', 'Design A/B tests', 'Implement improvements', 'Monitor results'],
          deliverables: ['CRO audit', 'Test roadmap', 'Optimization recommendations', 'Results reports'],
          martech: ['Hotjar', 'Optimizely', 'Convert'],
        },
        {
          id: 'analytics',
          name: 'Analytics & Reporting',
          description: 'I set up analytics that actually tell you what\'s working.',
          icon: <BarChart3 className="w-6 h-6" />,
          tasks: ['Design analytics framework', 'Set up dashboards', 'Create custom reports', 'Build data models', 'Automate reporting'],
          deliverables: ['Analytics setup', 'Custom dashboards', 'Automated reports', 'Data documentation'],
          martech: ['Google Analytics 4', 'Data Studio', 'Tableau'],
        },
      ],
    },
    {
      id: 'brand',
      name: 'Brand & Content Enablement',
      description: 'I help you tell your story and build your brand.',
      services: [
        {
          id: 'messaging',
          name: 'Messaging Hierarchy & Core Narrative',
          description: 'I help you develop a clear, compelling brand narrative.',
          icon: <Palette className="w-6 h-6" />,
          tasks: ['Define brand positioning', 'Develop core narrative', 'Create messaging hierarchy', 'Build brand guidelines', 'Develop key messages'],
          deliverables: ['Brand positioning document', 'Messaging framework', 'Brand guidelines', 'Key messages list'],
          martech: ['Figma', 'Notion'],
        },
        {
          id: 'social',
          name: 'Social Media Strategy & Creative Direction',
          description: 'I develop a social strategy that builds engagement.',
          icon: <Zap className="w-6 h-6" />,
          tasks: ['Audit social presence', 'Develop content strategy', 'Create content calendar', 'Build creative direction', 'Optimize posting'],
          deliverables: ['Social strategy document', 'Content calendar', 'Creative guidelines', 'Performance framework'],
          martech: ['Buffer', 'Later', 'Hootsuite'],
        },
        {
          id: 'creative',
          name: 'Brand & Creative Assets',
          description: 'I help you create assets that stand out.',
          icon: <Lightbulb className="w-6 h-6" />,
          tasks: ['Design brand assets', 'Create templates', 'Develop visual style', 'Build asset library', 'Create brand kit'],
          deliverables: ['Brand assets', 'Design templates', 'Asset library', 'Brand kit'],
          martech: ['Figma', 'Canva', 'Adobe Creative Suite'],
        },
      ],
    },
    {
      id: 'technical',
      name: 'Technical Fixes & Optimization',
      description: 'I solve the technical problems that hold you back.',
      services: [
        {
          id: 'performance',
          name: 'Website Performance & Speed Optimization',
          description: 'I optimize your website for speed and performance.',
          icon: <Gauge className="w-6 h-6" />,
          tasks: ['Audit page speed', 'Optimize images', 'Minimize code', 'Implement caching', 'Optimize server response'],
          deliverables: ['Performance audit', 'Optimization recommendations', 'Implementation roadmap', 'Performance reports'],
          martech: ['Google PageSpeed', 'GTmetrix', 'Lighthouse'],
        },
        {
          id: 'tracking-fix',
          name: 'Tracking & Data Integrity Cleanups',
          description: 'I fix your broken tracking and clean up your data.',
          icon: <Code className="w-6 h-6" />,
          tasks: ['Audit tracking', 'Fix tracking errors', 'Clean up data', 'Implement validation', 'Create monitoring'],
          deliverables: ['Tracking audit', 'Data cleanup', 'Validation rules', 'Monitoring setup'],
          martech: ['Google Analytics 4', 'GTM', 'Segment'],
        },
        {
          id: 'funnel',
          name: 'Broken Funnel & Conversion Path Diagnostics',
          description: 'I identify and fix the bottlenecks in your conversion funnels.',
          icon: <Target className="w-6 h-6" />,
          tasks: ['Map conversion funnels', 'Identify drop-off points', 'Analyze user behavior', 'Test improvements', 'Implement fixes'],
          deliverables: ['Funnel analysis', 'Bottleneck report', 'Recommendations', 'Implementation plan'],
          martech: ['Hotjar', 'Google Analytics 4', 'Mixpanel'],
        },
      ],
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Services</h1>
          <p className="text-xl text-foreground/70 max-w-2xl">
            I work across five strategic pillars to solve your digital marketing challenges.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-32">
        <div className="container">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="mb-20">
              {/* Pillar Header */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{pillar.name}</h2>
                <p className="text-lg text-foreground/70">{pillar.description}</p>
              </div>

              {/* Services Grid - Responsive columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillar.services.map((service) => (
                  <div
                    key={service.id}
                    className="glass-panel overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Service Header */}
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="w-full p-6 flex items-start gap-4 hover:bg-accent/5 transition-colors text-left"
                    >
                      <div className="p-3 bg-accent/15 rounded-lg text-accent flex-shrink-0">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">{service.name}</h3>
                        <p className="text-sm text-foreground/70 line-clamp-2">{service.description}</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${
                          expandedService === service.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded Content */}
                    {expandedService === service.id && (
                      <div className="px-6 pb-6 border-t border-border space-y-4 animate-slide-in-down">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 text-sm">What I Do</h4>
                          <ul className="space-y-1">
                            {service.tasks.map((task, idx) => (
                              <li key={idx} className="text-sm text-foreground/70 flex gap-2">
                                <span className="text-accent">•</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2 text-sm">Deliverables</h4>
                          <ul className="space-y-1">
                            {service.deliverables.map((item, idx) => (
                              <li key={idx} className="text-sm text-foreground/70 flex gap-2">
                                <span className="text-accent">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2 text-sm">Tools I Use</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.martech.map((tool, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Not sure which service you need?
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Let's chat about your specific situation. I'll recommend the right approach.
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
