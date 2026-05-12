import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Search, X, Mail, Globe, BarChart3, Settings, Code, TrendingUp, Database, Smartphone, Zap, Clock, DollarSign, FileText, Target, Layers, Users, Megaphone, PenTool, Shield, RefreshCw, LineChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  deliverables: string[];
  turnaround: string;
  fullDescription?: string;
}

export default function ServicesMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  const services: Service[] = [

    // ── EMAIL ──────────────────────────────────────────────────────────────
    {
      id: 'edm-build',
      name: 'Email Template Build',
      description: 'Custom HTML email template design & coding',
      price: 350,
      category: 'Email',
      tags: ['Email', 'Design', 'HTML'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Custom HTML template', 'Mobile responsive', 'Testing across clients', 'Unlimited revisions'],
      turnaround: '3–5 days',
      fullDescription: 'Professionally designed HTML email template that works across all major email clients. Includes responsive design, cross-client testing, and unlimited revisions until you\'re satisfied.',
    },
    {
      id: 'email-sequences',
      name: 'Email Automation Sequences',
      description: 'Design & implement automated email sequences',
      price: 500,
      category: 'Email',
      tags: ['Email', 'Automation', 'Sequences'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Sequence design', 'Template creation', 'Automation setup', 'Testing & QA'],
      turnaround: '4–6 days',
      fullDescription: 'Professionally designed email automation sequences that nurture leads and drive conversions with strategic messaging and timing logic.',
    },
    {
      id: 'welcome-series',
      name: 'Welcome Series Setup',
      description: '3-email onboarding sequence for new subscribers',
      price: 400,
      category: 'Email',
      tags: ['Email', 'Onboarding', 'Automation'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['3 branded email templates', 'Copy direction', 'Automation logic', 'Platform setup'],
      turnaround: '3–5 days',
      fullDescription: 'A polished 3-email welcome series that sets expectations, builds trust, and drives first action from new subscribers — set up and live in your ESP.',
    },
    {
      id: 'winback-campaign',
      name: 'Win-Back Campaign',
      description: 'Re-engage lapsed subscribers or customers',
      price: 450,
      category: 'Email',
      tags: ['Email', 'Retention', 'Automation'],
      icon: <RefreshCw className="w-6 h-6" />,
      deliverables: ['Audience segmentation', '3-email sequence', 'Templates', 'Suppression logic'],
      turnaround: '4–5 days',
      fullDescription: 'A targeted win-back sequence to re-engage contacts who haven\'t opened or purchased in 60–90 days, with clean suppression logic to protect deliverability.',
    },
    {
      id: 'email-audit',
      name: 'Email Programme Audit',
      description: 'Full review of your current email setup & performance',
      price: 350,
      category: 'Email',
      tags: ['Email', 'Audit', 'Strategy'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Deliverability review', 'List health analysis', 'Automation audit', 'Recommendations report'],
      turnaround: '3–4 days',
      fullDescription: 'A top-to-bottom review of your email programme — deliverability, list hygiene, automation gaps, and design — with a prioritised action plan.',
    },

    // ── ANALYTICS ─────────────────────────────────────────────────────────
    {
      id: 'ga4-setup',
      name: 'GA4 Setup & Configuration',
      description: 'Complete Google Analytics 4 implementation',
      price: 400,
      category: 'Analytics',
      tags: ['Analytics', 'GA4', 'Tracking'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: ['GA4 property setup', 'Event tracking', 'Conversion tracking', 'Documentation'],
      turnaround: '2–3 days',
      fullDescription: 'Full GA4 implementation with proper event tracking, conversion tracking setup, and comprehensive documentation for your team.',
    },
    {
      id: 'looker-dashboard',
      name: 'Looker Studio Dashboard',
      description: 'Custom reporting dashboard connected to your data sources',
      price: 500,
      category: 'Analytics',
      tags: ['Analytics', 'Reporting', 'Dashboard'],
      icon: <LineChart className="w-6 h-6" />,
      deliverables: ['Custom dashboard', 'Up to 3 data sources', 'Automated refresh', 'Shareable link'],
      turnaround: '3–5 days',
      fullDescription: 'A clean, branded Looker Studio dashboard pulling from your key data sources — GA4, ad platforms, CRM — giving you a single view of performance, updated automatically.',
    },
    {
      id: 'attribution-setup',
      name: 'Attribution Model Setup',
      description: 'Configure multi-touch attribution across channels',
      price: 600,
      category: 'Analytics',
      tags: ['Attribution', 'Analytics', 'Tracking'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['Attribution model design', 'Channel mapping', 'GA4 / ad platform setup', 'Validation report'],
      turnaround: '4–6 days',
      fullDescription: 'Move beyond last-click. We design and implement a multi-touch attribution model suited to your funnel, with validation to ensure data accuracy from day one.',
    },
    {
      id: 'conversion-tracking',
      name: 'Conversion Tracking Setup',
      description: 'Accurate conversion tracking across Google & Meta',
      price: 350,
      category: 'Analytics',
      tags: ['Tracking', 'Conversions', 'Analytics'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['GTM setup', 'Google Ads conversions', 'Meta Pixel events', 'Testing & validation'],
      turnaround: '2–3 days',
      fullDescription: 'Proper conversion tracking configured in GTM, verified in GA4, and connected to Google Ads and Meta — so your campaigns optimise on real data.',
    },
    {
      id: 'analytics-audit',
      name: 'Analytics Health Audit',
      description: 'Find and fix gaps in your tracking setup',
      price: 300,
      category: 'Analytics',
      tags: ['Analytics', 'Audit', 'Data Quality'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Data quality report', 'Duplicate tracking check', 'Event validation', 'Fix priority list'],
      turnaround: '2–3 days',
      fullDescription: 'A thorough audit of your analytics setup to uncover missing events, duplicate data, broken conversions, and configuration issues — with a ranked fix list.',
    },

    // ── ADVERTISING ───────────────────────────────────────────────────────
    {
      id: 'google-ads-setup',
      name: 'Google Ads Account Setup',
      description: 'Complete Google Ads account configuration',
      price: 450,
      category: 'Advertising',
      tags: ['Google Ads', 'PPC', 'Setup'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Account structure', 'Campaign setup', 'Conversion tracking', 'Initial optimisation'],
      turnaround: '3–4 days',
      fullDescription: 'Professional Google Ads account setup with proper account structure, campaign organisation, and initial optimisation for best results from launch.',
    },
    {
      id: 'meta-ads-setup',
      name: 'Meta Ads Account Setup',
      description: 'Facebook & Instagram Ads account & campaign setup',
      price: 450,
      category: 'Advertising',
      tags: ['Meta Ads', 'Facebook', 'Paid Social'],
      icon: <Megaphone className="w-6 h-6" />,
      deliverables: ['Business Manager setup', 'Pixel & CAPI', 'Campaign structure', 'Audience setup'],
      turnaround: '3–4 days',
      fullDescription: 'Full Meta Ads setup including Business Manager, Pixel, Conversions API, audience creation, and campaign structure ready to launch and scale.',
    },
    {
      id: 'ppc-audit',
      name: 'Paid Media Audit',
      description: 'Deep audit of your Google or Meta Ads account',
      price: 400,
      category: 'Advertising',
      tags: ['PPC', 'Audit', 'Advertising'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Account structure review', 'Waste spend analysis', 'Audience audit', 'Recommendations report'],
      turnaround: '3–4 days',
      fullDescription: 'A detailed teardown of your paid media account — structure, targeting, bidding, creative, and tracking — with a prioritised list of improvements to boost ROAS.',
    },
    {
      id: 'retargeting-setup',
      name: 'Retargeting Campaign Setup',
      description: 'Multi-stage retargeting sequences across Google & Meta',
      price: 500,
      category: 'Advertising',
      tags: ['Retargeting', 'PPC', 'Paid Social'],
      icon: <RefreshCw className="w-6 h-6" />,
      deliverables: ['Audience segmentation', 'Campaign setup', 'Ad copy direction', 'Frequency & budget rules'],
      turnaround: '4–5 days',
      fullDescription: 'Strategic retargeting campaigns built across Google and Meta, with audience windows, exclusions, and messaging tailored to where each visitor dropped off.',
    },
    {
      id: 'linkedin-ads-setup',
      name: 'LinkedIn Ads Setup',
      description: 'B2B LinkedIn campaign structure & launch',
      price: 550,
      category: 'Advertising',
      tags: ['LinkedIn', 'B2B', 'Paid Social'],
      icon: <Users className="w-6 h-6" />,
      deliverables: ['Campaign Manager setup', 'Insight Tag', 'Audience targeting', 'Campaign launch'],
      turnaround: '3–4 days',
      fullDescription: 'LinkedIn Ads setup optimised for B2B lead generation — including Insight Tag, audience targeting by role and company, and campaign structure built for pipeline.',
    },

    // ── SEO ────────────────────────────────────────────────────────────────
    {
      id: 'seo-audit',
      name: 'Technical SEO Audit',
      description: 'Comprehensive technical SEO analysis',
      price: 350,
      category: 'SEO',
      tags: ['SEO', 'Audit', 'Technical'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Full audit report', 'Recommendations', 'Priority fixes', 'Implementation guide'],
      turnaround: '3–4 days',
      fullDescription: 'A comprehensive technical SEO audit identifying all issues affecting your search visibility with actionable recommendations ranked by impact.',
    },
    {
      id: 'seo-fixes',
      name: 'Technical SEO Quick Fixes',
      description: 'Fix common technical SEO issues fast',
      price: 400,
      category: 'SEO',
      tags: ['SEO', 'Technical', 'Fixes'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Sitemap fixes', 'Robots.txt optimisation', 'Meta tags', 'Schema markup'],
      turnaround: '2–3 days',
      fullDescription: 'Rapid fixes for common technical SEO blockers including sitemap optimisation, robots.txt, meta tags, and schema markup implementation.',
    },
    {
      id: 'local-seo',
      name: 'Google Business Profile Optimisation',
      description: 'Complete GBP setup & local SEO optimisation',
      price: 300,
      category: 'SEO',
      tags: ['Local SEO', 'Google Business', 'Optimisation'],
      icon: <Globe className="w-6 h-6" />,
      deliverables: ['Profile optimisation', 'Category & attribute setup', 'Photo upload', 'Post scheduling'],
      turnaround: '2 days',
      fullDescription: 'Optimise your Google Business Profile for maximum visibility in local search results, with complete profile setup and a content foundation in place.',
    },
    {
      id: 'keyword-research',
      name: 'Keyword Research & Mapping',
      description: 'Identify high-value keywords and map to site structure',
      price: 350,
      category: 'SEO',
      tags: ['SEO', 'Keywords', 'Strategy'],
      icon: <Search className="w-6 h-6" />,
      deliverables: ['Keyword universe', 'Search intent mapping', 'Page-level recommendations', 'Content gap report'],
      turnaround: '3–4 days',
      fullDescription: 'A full keyword research project covering volume, intent, difficulty, and opportunity — mapped to your existing site structure with gaps clearly identified.',
    },
    {
      id: 'schema-markup',
      name: 'Schema Markup Implementation',
      description: 'Structured data setup for rich search results',
      price: 300,
      category: 'SEO',
      tags: ['SEO', 'Schema', 'Technical'],
      icon: <Code className="w-6 h-6" />,
      deliverables: ['Schema design', 'Implementation via GTM or code', 'Google validation', 'Documentation'],
      turnaround: '2–3 days',
      fullDescription: 'Schema markup implemented for your key page types — product, article, FAQ, organisation — validated in Google\'s Rich Results Test and ready to improve SERP appearance.',
    },

    // ── AUTOMATION & CRM ──────────────────────────────────────────────────
    {
      id: 'crm-setup',
      name: 'CRM Setup & Configuration',
      description: 'Complete CRM implementation & workflow setup',
      price: 800,
      category: 'Automation',
      tags: ['CRM', 'Automation', 'Setup'],
      icon: <Database className="w-6 h-6" />,
      deliverables: ['CRM configuration', 'Workflow setup', 'Integration', 'Team training'],
      turnaround: '5–7 days',
      fullDescription: 'Full CRM setup and configuration with custom workflows, integrations, and team training to maximise your CRM investment from day one.',
    },
    {
      id: 'hubspot-audit',
      name: 'HubSpot Portal Audit',
      description: 'Review & optimise your HubSpot setup',
      price: 450,
      category: 'Automation',
      tags: ['HubSpot', 'CRM', 'Audit'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Portal health review', 'Workflow audit', 'Data quality check', 'Fix recommendations'],
      turnaround: '3–4 days',
      fullDescription: 'A thorough review of your HubSpot portal — contact properties, workflows, pipelines, and integrations — with a clear list of what to fix and how.',
    },
    {
      id: 'zapier-build',
      name: 'Zapier / Make Workflow Build',
      description: 'Custom automation connecting your tools',
      price: 350,
      category: 'Automation',
      tags: ['Zapier', 'Make', 'Automation'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Workflow design', 'Build & testing', 'Error handling', 'Documentation'],
      turnaround: '2–4 days',
      fullDescription: 'A custom Zapier or Make automation built to your exact requirements — connecting your stack, eliminating manual steps, and tested thoroughly before handover.',
    },
    {
      id: 'lead-scoring',
      name: 'Lead Scoring Model Setup',
      description: 'Design and implement a lead scoring framework in your CRM',
      price: 550,
      category: 'Automation',
      tags: ['CRM', 'Lead Scoring', 'Automation'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['Scoring criteria design', 'CRM implementation', 'MQL threshold setup', 'Sales handoff rules'],
      turnaround: '4–5 days',
      fullDescription: 'A lead scoring model built on behavioural and demographic signals, implemented in your CRM with MQL/SQL thresholds and automated sales alert notifications.',
    },
    {
      id: 'pipeline-setup',
      name: 'Sales Pipeline Setup',
      description: 'Configure deal stages, properties, and automation in your CRM',
      price: 500,
      category: 'Automation',
      tags: ['CRM', 'Sales', 'Pipeline'],
      icon: <Layers className="w-6 h-6" />,
      deliverables: ['Deal stage design', 'Custom properties', 'Automation triggers', 'Reporting view'],
      turnaround: '3–5 days',
      fullDescription: 'A clean, logic-driven sales pipeline built in your CRM with deal stages that match your actual sales process, automated reminders, and a live reporting view.',
    },

    // ── WEB & TECHNICAL ───────────────────────────────────────────────────
    {
      id: '4-page-website',
      name: '4-Page Website Build',
      description: 'Custom 4-page website design & development',
      price: 1200,
      category: 'Web & Technical',
      tags: ['Website', 'Design', 'Development'],
      icon: <Globe className="w-6 h-6" />,
      deliverables: ['4 custom pages', 'Mobile responsive', 'SEO optimised', 'Contact form', 'Hosting setup'],
      turnaround: '10–14 days',
      fullDescription: 'A complete 4-page website built from scratch with responsive design, SEO optimisation, contact forms, and hosting setup included.',
    },
    {
      id: 'landing-page',
      name: 'High-Converting Landing Page',
      description: 'Single-page conversion-focused design & build',
      price: 600,
      category: 'Web & Technical',
      tags: ['Landing Page', 'Conversion', 'Design'],
      icon: <Smartphone className="w-6 h-6" />,
      deliverables: ['Custom design', 'Copy optimisation', 'CTA setup', 'Analytics integration'],
      turnaround: '5–7 days',
      fullDescription: 'A high-converting landing page designed to turn visitors into customers with optimised copy, strategic CTAs, and full analytics integration.',
    },
    {
      id: 'pixel-fix',
      name: 'Tracking Pixel Fix & Implementation',
      description: 'Fix broken tracking pixels & implement new ones',
      price: 250,
      category: 'Web & Technical',
      tags: ['Tracking', 'Pixels', 'Technical'],
      icon: <Code className="w-6 h-6" />,
      deliverables: ['Pixel audit', 'Implementation', 'Testing', 'Documentation'],
      turnaround: '1–2 days',
      fullDescription: 'Identify and fix broken tracking pixels, implement new ones, and ensure proper tracking is firing correctly across all your digital properties.',
    },
    {
      id: 'web-speed',
      name: 'Website Speed Optimisation',
      description: 'Improve Core Web Vitals and page load performance',
      price: 450,
      category: 'Web & Technical',
      tags: ['Performance', 'Core Web Vitals', 'Technical'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Speed audit', 'Image optimisation', 'Caching setup', 'Before/after report'],
      turnaround: '3–5 days',
      fullDescription: 'A targeted performance sprint to improve your Core Web Vitals scores — covering image compression, caching, render-blocking resources, and CDN configuration.',
    },
    {
      id: 'gtm-audit',
      name: 'Google Tag Manager Audit & Clean-up',
      description: 'Audit and tidy your GTM container',
      price: 350,
      category: 'Web & Technical',
      tags: ['GTM', 'Tracking', 'Technical'],
      icon: <Shield className="w-6 h-6" />,
      deliverables: ['Container audit', 'Redundant tag removal', 'Trigger logic review', 'Naming standards'],
      turnaround: '2–3 days',
      fullDescription: 'A full GTM container review — removing redundant and misfiring tags, cleaning trigger logic, applying naming conventions, and documenting the final state.',
    },
    {
      id: 'database-cleanup',
      name: 'Database Cleanup & Optimisation',
      description: 'Clean & optimise your marketing database',
      price: 450,
      category: 'Web & Technical',
      tags: ['Database', 'Optimisation', 'Technical'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Data audit', 'Deduplication', 'Field standardisation', 'Performance report'],
      turnaround: '3–5 days',
      fullDescription: 'Complete database audit, deduplication, field standardisation, and cleanup of redundant records — with a before/after quality report.',
    },

    // ── OPTIMISATION ──────────────────────────────────────────────────────
    {
      id: 'conversion-optimisation',
      name: 'Conversion Rate Optimisation Audit',
      description: 'Analyse & optimise your conversion funnels',
      price: 600,
      category: 'Optimisation',
      tags: ['CRO', 'Optimisation', 'Analytics'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: ['Funnel analysis', 'Heatmap review', 'Recommendations', 'A/B test setup'],
      turnaround: '4–5 days',
      fullDescription: 'In-depth conversion funnel analysis with heatmap review, session recordings, and actionable recommendations to increase your conversion rates.',
    },
    {
      id: 'ab-test-setup',
      name: 'A/B Test Setup & Analysis',
      description: 'Design, run, and analyse a conversion experiment',
      price: 400,
      category: 'Optimisation',
      tags: ['A/B Testing', 'CRO', 'Optimisation'],
      icon: <Layers className="w-6 h-6" />,
      deliverables: ['Hypothesis design', 'Variant creation', 'Tool setup', 'Results analysis'],
      turnaround: '3–5 days',
      fullDescription: 'A structured A/B test from hypothesis to results — including variant design, tool configuration, statistical significance monitoring, and a clear winner analysis.',
    },
    {
      id: 'heatmap-review',
      name: 'Heatmap & Session Recording Review',
      description: 'Uncover UX friction from real visitor behaviour',
      price: 300,
      category: 'Optimisation',
      tags: ['CRO', 'UX', 'Analytics'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['Heatmap analysis', 'Session recording review', 'Friction point report', 'Recommendations'],
      turnaround: '2–3 days',
      fullDescription: 'A review of your heatmap and session recording data to surface where users hesitate, rage-click, or drop off — with specific, prioritised UX fixes.',
    },
    {
      id: 'funnel-audit',
      name: 'Broken Funnel Diagnostics',
      description: 'Find exactly where your funnel is leaking',
      price: 350,
      category: 'Optimisation',
      tags: ['Funnel', 'CRO', 'Analytics'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Step-by-step funnel analysis', 'Drop-off quantification', 'Root cause report', 'Fix plan'],
      turnaround: '2–4 days',
      fullDescription: 'A step-by-step audit of your conversion funnel using analytics data to quantify exactly where drop-off occurs and what\'s causing it — with a ranked list of fixes.',
    },

    // ── STRATEGY ──────────────────────────────────────────────────────────
    {
      id: 'digital-audit',
      name: 'Digital Marketing Audit',
      description: 'Full-spectrum review of your digital presence & performance',
      price: 800,
      category: 'Strategy',
      tags: ['Audit', 'Strategy', 'Advisory'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Channel-by-channel review', 'Competitive benchmarking', 'Gap analysis', 'Priority roadmap'],
      turnaround: '5–7 days',
      fullDescription: 'A comprehensive audit across your website, SEO, paid media, email, and analytics — benchmarked against competitors and delivered with a clear, prioritised action plan.',
    },
    {
      id: 'martech-audit',
      name: 'MarTech Stack Audit',
      description: 'Review your tools, integrations, and costs',
      price: 500,
      category: 'Strategy',
      tags: ['MarTech', 'Audit', 'Strategy'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Tool inventory', 'Integration map', 'Cost analysis', 'Consolidation recommendations'],
      turnaround: '3–4 days',
      fullDescription: 'A full review of your marketing technology stack — what you\'re paying for, what\'s actually integrated, what overlaps, and where you can cut costs or upgrade capability.',
    },
    {
      id: 'competitor-analysis',
      name: 'Competitor Analysis Report',
      description: 'Intelligence on your top 3 competitors',
      price: 450,
      category: 'Strategy',
      tags: ['Strategy', 'Competitive', 'Research'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['3 competitor profiles', 'SEO & ad intelligence', 'Positioning matrix', 'Opportunity gaps'],
      turnaround: '4–5 days',
      fullDescription: 'A structured analysis of your top three competitors covering SEO footprint, paid media strategy, messaging, and positioning — with clear gaps you can exploit.',
    },
    {
      id: 'gtm-strategy',
      name: 'Go-To-Market Strategy Session',
      description: '2-hour strategic session + written GTM plan',
      price: 600,
      category: 'Strategy',
      tags: ['GTM', 'Strategy', 'Advisory'],
      icon: <Rocket className="w-6 h-6" />,
      deliverables: ['Pre-session briefing', '2hr strategy session', 'Written GTM plan', 'Channel recommendations'],
      turnaround: '5–7 days',
      fullDescription: 'A focused go-to-market engagement — starting with a briefing document, then a 2-hour working session, followed by a written plan covering channels, audiences, and launch sequencing.',
    },
  ];

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(s => {
    const categoryMatch = selectedCategory === 'all' || s.category === selectedCategory;
    const searchMatch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleEnquire = (service: Service) => {
    window.location.href = `/contact?service=${encodeURIComponent(service.name)}&price=${service.price}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Services Shop
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Browse pre-priced services, see exactly what's included, and enquire about what you need — no surprises.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-foreground hover:bg-white/20'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid — 3 columns */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70">No services found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div
                  key={service.id}
                  className="glass-card p-6 border border-border hover:shadow-lg hover:border-accent/50 transition-all cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-accent mb-1">
                        <DollarSign className="w-4 h-4" />
                        <p className="text-2xl font-bold">{service.price}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-foreground/60">
                        <Clock className="w-3 h-3" />
                        {service.turnaround}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-foreground mb-2">{service.name}</h3>
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{service.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables Preview */}
                  <div className="mb-4 pb-4 border-t border-border pt-4">
                    <p className="text-xs font-semibold text-foreground/60 mb-2 uppercase">Includes</p>
                    <ul className="space-y-1">
                      {service.deliverables.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                          <Check className="w-3 h-3 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                      {service.deliverables.length > 2 && (
                        <li className="text-xs text-foreground/60 italic">+{service.deliverables.length - 2} more</li>
                      )}
                    </ul>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-white"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Detail Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  {selectedService.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedService.name}</h2>
                  <p className="text-foreground/70 mt-1">{selectedService.category}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Price & Timeline */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-sm text-foreground/70 mb-1">Investment</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    <p className="text-2xl font-bold text-accent">{selectedService.price}</p>
                  </div>
                </div>
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-sm text-foreground/70 mb-1">Turnaround</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <p className="text-lg font-semibold text-foreground">{selectedService.turnaround}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">About This Service</h3>
                <p className="text-foreground/70">{selectedService.fullDescription || selectedService.description}</p>
              </div>

              {/* Deliverables */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/70">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedService.tags.map(tag => (
                    <span key={tag} className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  onClick={() => handleEnquire(selectedService)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enquire About This Service
                </Button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-white/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
