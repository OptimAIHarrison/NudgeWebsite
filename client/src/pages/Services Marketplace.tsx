import { useState } from 'react';
import { Check, Search, X, Mail, Globe, BarChart3, Settings, Code, TrendingUp, Database, Smartphone, Zap, Clock, FileText, Target, Layers, Users, Megaphone, Shield, RefreshCw, LineChart, Star, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  priceNote?: string;
  category: string;
  tags: string[];
  icon: React.ReactNode;
  deliverables: string[];
  turnaround: string;
  fullDescription?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'all':             <Package    className="w-4 h-4" />,
  'Email':           <Mail       className="w-4 h-4" />,
  'Analytics':       <BarChart3  className="w-4 h-4" />,
  'Advertising':     <Megaphone  className="w-4 h-4" />,
  'SEO':             <TrendingUp className="w-4 h-4" />,
  'Automation':      <Zap        className="w-4 h-4" />,
  'Web & Technical': <Code       className="w-4 h-4" />,
  'Optimisation':    <Target     className="w-4 h-4" />,
  'Strategy':        <FileText   className="w-4 h-4" />,
};

export default function ServicesMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  const services: Service[] = [

    // ── FULL SUITES ────────────────────────────────────────────────────────
    {
      id: 'full-email-suite',
      name: 'Full Email Marketing Suite',
      description: 'Everything you need to run a world-class email programme — built, automated, and ready to scale.',
      price: 3800,
      priceNote: 'one-off setup',
      category: 'Email',
      tags: ['Email', 'Full Suite', 'Automation', 'Strategy'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: [
        'ESP setup & configuration (Klaviyo, ActiveCampaign, or similar)',
        'List import, hygiene & segmentation',
        'Welcome & onboarding series (3–5 emails)',
        'Win-back & re-engagement campaign',
        'Abandoned cart / browse abandonment sequence',
        '3 branded HTML templates (mobile responsive)',
        'Deliverability audit & domain warm-up plan',
        'Performance dashboard setup',
        'Documentation & handover session',
      ],
      turnaround: '2–3 weeks',
      fullDescription: 'A complete email marketing setup — from platform configuration and list health through to automation sequences, branded templates, and a live dashboard. Handed over with full documentation so you can run it confidently from day one.',
      isFeatured: true,
    },
    {
      id: 'full-seo-suite',
      name: 'Full SEO Setup & Foundation',
      description: 'Technical SEO, keyword strategy, on-page optimisation, and reporting — done properly from the ground up.',
      price: 4500,
      priceNote: 'one-off setup',
      category: 'SEO',
      tags: ['SEO', 'Full Suite', 'Technical', 'Strategy'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: [
        'Full technical SEO audit & fix implementation',
        'Keyword research & search intent mapping',
        'On-page optimisation across 10 key pages',
        'Schema markup implementation',
        'Google Search Console & GA4 setup',
        'XML sitemap & robots.txt optimisation',
        'Core Web Vitals improvements',
        'Local SEO / Google Business Profile setup',
        'Monthly ranking tracker setup',
        'SEO reporting dashboard',
      ],
      turnaround: '3–4 weeks',
      fullDescription: 'A full SEO foundation built from scratch — covering every technical, structural, and on-page element needed to rank. Delivered with live tracking and a clear roadmap for ongoing growth.',
      isFeatured: true,
    },
    {
      id: 'full-analytics-suite',
      name: 'Full Analytics & Tracking Setup',
      description: 'GA4, GTM, ad platform tracking, attribution, and a custom dashboard — all connected and validated.',
      price: 3200,
      priceNote: 'one-off setup',
      category: 'Analytics',
      tags: ['Analytics', 'Full Suite', 'GA4', 'Tracking'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: [
        'GA4 property setup & event configuration',
        'Google Tag Manager setup & cleanup',
        'Conversion tracking — Google Ads & Meta',
        'Meta Pixel + Conversions API implementation',
        'Cross-domain tracking (if applicable)',
        'Attribution model configuration',
        'Custom dashboard (up to 4 data sources)',
        'Data validation & QA report',
        'Documentation & team walkthrough',
      ],
      turnaround: '1–2 weeks',
      fullDescription: 'End-to-end analytics implementation — GA4, GTM, all ad platform pixels, attribution, and a clean dashboard. Every tag tested and validated before handover so you can trust your data from day one.',
      isFeatured: true,
    },
    {
      id: 'full-crm-suite',
      name: 'Full CRM & Marketing Automation Setup',
      description: 'CRM built, pipelines configured, automations live — your entire marketing ops foundation in one engagement.',
      price: 5500,
      priceNote: 'one-off setup',
      category: 'Automation',
      tags: ['CRM', 'Full Suite', 'Automation', 'HubSpot'],
      icon: <Database className="w-6 h-6" />,
      deliverables: [
        'CRM setup & configuration (HubSpot or similar)',
        'Contact & company property setup',
        'Sales pipeline design & build',
        'Lead scoring model implementation',
        'Lead nurture email sequences (3 flows)',
        'Form & landing page integration',
        'CRM + website & ad platform integrations',
        'Reporting dashboard & pipeline views',
        'Team training session (2hrs)',
        'Documentation & handover',
      ],
      turnaround: '3–5 weeks',
      fullDescription: 'A complete CRM and marketing automation foundation — from contact management and pipeline through to lead scoring, nurture flows, and integrations. Your team gets a working system and the training to run it.',
      isFeatured: true,
    },
    {
      id: 'full-paid-media-suite',
      name: 'Full Paid Media Setup',
      description: 'Google Ads, Meta Ads, tracking, audiences, and retargeting — all set up and ready to spend confidently.',
      price: 3500,
      priceNote: 'one-off setup',
      category: 'Advertising',
      tags: ['Advertising', 'Full Suite', 'Google Ads', 'Meta Ads'],
      icon: <Megaphone className="w-6 h-6" />,
      deliverables: [
        'Google Ads account structure & campaign setup',
        'Meta Ads Business Manager & campaign setup',
        'Pixel, CAPI & conversion tracking (both platforms)',
        'Audience creation — custom & lookalike',
        'Retargeting campaign build',
        'Negative keyword & exclusion lists',
        'Ad copy direction & structure',
        'Bid strategy setup',
        'Performance dashboard',
      ],
      turnaround: '1–2 weeks',
      fullDescription: 'A full paid media foundation across Google and Meta — every account, campaign, audience, and tracking element built correctly from the start so your budget works as hard as possible.',
      isFeatured: true,
    },

    // ── EMAIL ──────────────────────────────────────────────────────────────
    {
      id: 'edm-build',
      name: 'Email Template Build',
      description: 'Custom branded HTML email template, mobile-responsive and tested across clients.',
      price: 550,
      category: 'Email',
      tags: ['Email', 'Design', 'HTML'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Custom HTML template', 'Mobile responsive', 'Cross-client testing', 'Source files'],
      turnaround: '3–5 days',
      fullDescription: 'A professionally designed HTML email template that renders correctly across Gmail, Outlook, and Apple Mail. Includes mobile-responsive layout, cross-client testing, and source files.',
    },
    {
      id: 'email-sequences',
      name: 'Email Automation Sequences',
      description: 'Design & implement automated nurture or lifecycle sequences in your ESP.',
      price: 900,
      category: 'Email',
      tags: ['Email', 'Automation', 'Sequences'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Sequence strategy', 'Up to 5 email templates', 'Automation logic setup', 'Testing & QA'],
      turnaround: '5–7 days',
      fullDescription: 'Custom email automation sequences built for your funnel — nurture, post-purchase, or lifecycle. Templates, timing logic, and live setup in your ESP.',
      isPopular: true,
    },
    {
      id: 'welcome-series',
      name: 'Welcome Series Setup',
      description: '3-email onboarding sequence for new subscribers, configured and live.',
      price: 750,
      category: 'Email',
      tags: ['Email', 'Onboarding', 'Automation'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['3 branded email templates', 'Copy direction', 'Automation logic', 'Platform setup'],
      turnaround: '3–5 days',
      fullDescription: 'A polished 3-email welcome series that sets expectations, builds trust, and drives first action — configured and live in your ESP.',
    },
    {
      id: 'winback-campaign',
      name: 'Win-Back Campaign',
      description: 'Re-engage lapsed subscribers or customers with a targeted sequence.',
      price: 800,
      category: 'Email',
      tags: ['Email', 'Retention', 'Automation'],
      icon: <RefreshCw className="w-6 h-6" />,
      deliverables: ['Audience segmentation', '3-email sequence', 'Templates', 'Suppression logic'],
      turnaround: '4–5 days',
      fullDescription: 'A targeted win-back sequence to re-engage contacts who have gone quiet, with suppression logic to protect deliverability.',
    },
    {
      id: 'email-audit',
      name: 'Email Programme Audit',
      description: 'Full review of deliverability, list health, automations, and design.',
      price: 650,
      category: 'Email',
      tags: ['Email', 'Audit', 'Strategy'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Deliverability review', 'List health analysis', 'Automation audit', 'Prioritised recommendations'],
      turnaround: '3–4 days',
      fullDescription: 'A top-to-bottom review of your email programme with a prioritised action plan covering deliverability, list hygiene, automation gaps, and design.',
    },
    {
      id: 'broadcast-campaign',
      name: 'Broadcast Campaign Setup',
      description: 'One-off promotional campaign — segmented, designed, and scheduled.',
      price: 500,
      category: 'Email',
      tags: ['Email', 'Campaign', 'Segmentation'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Audience segmentation', 'Template build', 'Copy review', 'Schedule & send setup'],
      turnaround: '2–3 days',
      fullDescription: 'A single broadcast campaign — promotional, seasonal, or product launch — segmented, designed, and scheduled. Includes copy review and send-time optimisation.',
    },

    // ── ANALYTICS ─────────────────────────────────────────────────────────
    {
      id: 'ga4-setup',
      name: 'GA4 Setup & Configuration',
      description: 'Complete GA4 implementation with event and conversion tracking.',
      price: 750,
      category: 'Analytics',
      tags: ['Analytics', 'GA4', 'Tracking'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: ['GA4 property setup', 'Event tracking', 'Conversion tracking', 'Documentation'],
      turnaround: '2–3 days',
      fullDescription: 'Full GA4 implementation — property setup, event tracking, conversion configuration, and documentation. Validated and ready to use.',
      isPopular: true,
    },
    {
      id: 'custom-dashboard',
      name: 'Custom Marketing Dashboard',
      description: 'Branded reporting dashboard connecting your key data sources — automated and shareable.',
      price: 950,
      category: 'Analytics',
      tags: ['Analytics', 'Reporting', 'Dashboard'],
      icon: <LineChart className="w-6 h-6" />,
      deliverables: ['Custom dashboard design', 'Up to 4 data sources', 'Automated refresh', 'Shareable link', 'Training walkthrough'],
      turnaround: '4–6 days',
      fullDescription: 'A clean, branded dashboard pulling from GA4, ad platforms, CRM, and more — a single view of performance that updates automatically.',
      isPopular: true,
    },
    {
      id: 'attribution-setup',
      name: 'Attribution Model Setup',
      description: 'Multi-touch attribution configured across your channels.',
      price: 1100,
      category: 'Analytics',
      tags: ['Attribution', 'Analytics', 'Tracking'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['Attribution model design', 'Channel mapping', 'GA4 / ad platform setup', 'Validation report'],
      turnaround: '4–6 days',
      fullDescription: 'Move beyond last-click. A multi-touch attribution model designed for your funnel, implemented across GA4 and your ad platforms, and validated before handover.',
    },
    {
      id: 'conversion-tracking',
      name: 'Conversion Tracking Setup',
      description: 'Accurate conversion tracking across Google Ads & Meta via GTM.',
      price: 650,
      category: 'Analytics',
      tags: ['Tracking', 'Conversions', 'Analytics'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['GTM setup', 'Google Ads conversions', 'Meta Pixel + CAPI', 'Testing & validation'],
      turnaround: '2–3 days',
      fullDescription: 'Conversion tracking configured in GTM, verified in GA4, and connected to Google Ads and Meta — so your campaigns optimise on real data.',
    },
    {
      id: 'analytics-audit',
      name: 'Analytics Health Audit',
      description: 'Find gaps, duplicates, and broken tracking in your current setup.',
      price: 550,
      category: 'Analytics',
      tags: ['Analytics', 'Audit', 'Data Quality'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Data quality report', 'Duplicate tracking check', 'Event validation', 'Fix priority list'],
      turnaround: '2–3 days',
      fullDescription: 'A thorough audit of your analytics setup — missing events, duplicate data, broken conversions — with a ranked list of fixes.',
    },

    // ── ADVERTISING ───────────────────────────────────────────────────────
    {
      id: 'google-ads-setup',
      name: 'Google Ads Account Setup',
      description: 'Full account structure, campaigns, and conversion tracking — ready to launch.',
      price: 900,
      category: 'Advertising',
      tags: ['Google Ads', 'PPC', 'Setup'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Account & campaign structure', 'Keyword setup', 'Conversion tracking', 'Negative keyword list', 'Bid strategy'],
      turnaround: '3–4 days',
      fullDescription: 'Google Ads setup with proper structure, keyword research, conversion tracking, and bid strategy — ready to spend confidently from launch.',
    },
    {
      id: 'meta-ads-setup',
      name: 'Meta Ads Account Setup',
      description: 'Business Manager, Pixel, CAPI, audiences, and campaigns — Facebook & Instagram ready.',
      price: 900,
      category: 'Advertising',
      tags: ['Meta Ads', 'Facebook', 'Paid Social'],
      icon: <Megaphone className="w-6 h-6" />,
      deliverables: ['Business Manager setup', 'Pixel & Conversions API', 'Audience creation', 'Campaign structure', 'Creative guidance'],
      turnaround: '3–4 days',
      fullDescription: 'Full Meta Ads setup — Business Manager, Pixel, Conversions API, custom and lookalike audiences, and campaign structure built for your goals.',
    },
    {
      id: 'ppc-audit',
      name: 'Paid Media Audit',
      description: 'Deep teardown of your Google or Meta account — waste spend, structure, and ROAS.',
      price: 750,
      category: 'Advertising',
      tags: ['PPC', 'Audit', 'Advertising'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Account structure review', 'Waste spend analysis', 'Audience audit', 'Recommendations report'],
      turnaround: '3–4 days',
      fullDescription: 'A detailed paid media account audit covering structure, targeting, bidding, creative, and tracking — with prioritised improvements to boost ROAS.',
    },
    {
      id: 'retargeting-setup',
      name: 'Retargeting Campaign Setup',
      description: 'Multi-stage retargeting across Google & Meta, tailored to where visitors dropped off.',
      price: 950,
      category: 'Advertising',
      tags: ['Retargeting', 'PPC', 'Paid Social'],
      icon: <RefreshCw className="w-6 h-6" />,
      deliverables: ['Audience segmentation', 'Campaign setup', 'Ad copy direction', 'Frequency & budget rules'],
      turnaround: '4–5 days',
      fullDescription: 'Retargeting campaigns across Google and Meta — audience windows, exclusions, and messaging matched to funnel stage.',
      isPopular: true,
    },
    {
      id: 'linkedin-ads-setup',
      name: 'LinkedIn Ads Setup',
      description: 'B2B LinkedIn campaign structure, Insight Tag, and targeting — built for pipeline.',
      price: 1100,
      category: 'Advertising',
      tags: ['LinkedIn', 'B2B', 'Paid Social'],
      icon: <Users className="w-6 h-6" />,
      deliverables: ['Campaign Manager setup', 'Insight Tag', 'Role & company targeting', 'Lead Gen Form setup', 'Campaign launch'],
      turnaround: '3–4 days',
      fullDescription: 'LinkedIn Ads for B2B — Insight Tag, targeting by role and company, Lead Gen Form setup, and campaign structure built for pipeline.',
    },

    // ── SEO ────────────────────────────────────────────────────────────────
    {
      id: 'seo-audit',
      name: 'Technical SEO Audit',
      description: 'Comprehensive technical SEO analysis with ranked action plan.',
      price: 700,
      category: 'SEO',
      tags: ['SEO', 'Audit', 'Technical'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Full audit report', 'Crawl analysis', 'Core Web Vitals review', 'Priority fix list', 'Implementation guide'],
      turnaround: '3–5 days',
      fullDescription: 'A comprehensive technical SEO audit — crawlability, indexation, site structure, Core Web Vitals — with recommendations ranked by impact.',
      isPopular: true,
    },
    {
      id: 'seo-fixes',
      name: 'Technical SEO Implementation',
      description: 'Fix identified technical issues — sitemap, meta tags, schema, redirects.',
      price: 750,
      category: 'SEO',
      tags: ['SEO', 'Technical', 'Fixes'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Sitemap & robots.txt fixes', 'Meta tag optimisation', 'Schema markup', 'Redirect management', 'Before/after report'],
      turnaround: '3–5 days',
      fullDescription: 'Hands-on technical SEO fix implementation — based on your audit or ours. All changes documented with a before/after comparison.',
    },
    {
      id: 'local-seo',
      name: 'Google Business Profile Setup',
      description: 'Complete GBP setup, optimisation, and local SEO foundation.',
      price: 550,
      category: 'SEO',
      tags: ['Local SEO', 'Google Business', 'Optimisation'],
      icon: <Globe className="w-6 h-6" />,
      deliverables: ['Profile optimisation', 'Category & attribute setup', 'Photo upload', 'Q&A seeding', 'Post template setup'],
      turnaround: '2 days',
      fullDescription: 'Full Google Business Profile setup and optimisation for local search visibility — categories, attributes, photos, and a content foundation.',
    },
    {
      id: 'keyword-research',
      name: 'Keyword Research & Mapping',
      description: 'High-value keywords mapped to your site structure with content gaps identified.',
      price: 650,
      category: 'SEO',
      tags: ['SEO', 'Keywords', 'Strategy'],
      icon: <Search className="w-6 h-6" />,
      deliverables: ['Keyword universe', 'Search intent mapping', 'Page-level recommendations', 'Content gap report', 'Priority targets'],
      turnaround: '3–4 days',
      fullDescription: 'Full keyword research covering volume, intent, difficulty, and opportunity — mapped to your site structure with a prioritised target list.',
    },
    {
      id: 'schema-markup',
      name: 'Schema Markup Implementation',
      description: 'Structured data for rich search results — implemented and validated.',
      price: 550,
      category: 'SEO',
      tags: ['SEO', 'Schema', 'Technical'],
      icon: <Code className="w-6 h-6" />,
      deliverables: ['Schema design', 'Implementation via GTM or code', 'Google validation', 'Documentation'],
      turnaround: '2–3 days',
      fullDescription: 'Schema markup for your key page types — validated in Google\'s Rich Results Test and ready to improve SERP appearance.',
    },
    {
      id: 'seo-content-brief',
      name: 'SEO Content Brief Pack',
      description: '5 detailed content briefs built around target keywords and search intent.',
      price: 750,
      category: 'SEO',
      tags: ['SEO', 'Content', 'Strategy'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['5 keyword-driven briefs', 'SERP analysis per brief', 'Heading structure', 'Internal linking suggestions', 'Word count targets'],
      turnaround: '4–5 days',
      fullDescription: '5 detailed SEO content briefs built from keyword research and SERP analysis — ready to hand to a writer and rank.',
    },

    // ── AUTOMATION & CRM ──────────────────────────────────────────────────
    {
      id: 'crm-setup',
      name: 'CRM Setup & Configuration',
      description: 'Full CRM implementation — properties, pipelines, workflows, and integrations.',
      price: 1800,
      category: 'Automation',
      tags: ['CRM', 'Automation', 'Setup'],
      icon: <Database className="w-6 h-6" />,
      deliverables: ['CRM configuration', 'Custom properties', 'Pipeline setup', 'Workflow automation', 'Integration', 'Training session'],
      turnaround: '5–7 days',
      fullDescription: 'Full CRM setup — properties, deal pipelines, workflow automations, and integrations — plus a training session so your team can use it immediately.',
    },
    {
      id: 'hubspot-audit',
      name: 'HubSpot Portal Audit',
      description: 'Review your HubSpot setup and surface what\'s broken, duplicated, or underused.',
      price: 850,
      category: 'Automation',
      tags: ['HubSpot', 'CRM', 'Audit'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Portal health review', 'Workflow audit', 'Data quality check', 'Prioritised fix list'],
      turnaround: '3–4 days',
      fullDescription: 'A thorough HubSpot portal review — properties, workflows, pipelines, integrations, and data quality — with a clear prioritised fix plan.',
    },
    {
      id: 'zapier-build',
      name: 'Zapier / Make Workflow Build',
      description: 'Custom automation connecting your tools — designed, built, tested, documented.',
      price: 650,
      category: 'Automation',
      tags: ['Zapier', 'Make', 'Automation'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Workflow design', 'Build & testing', 'Error handling', 'Documentation'],
      turnaround: '2–4 days',
      fullDescription: 'A custom Zapier or Make automation built to spec — connecting your stack, eliminating manual steps, tested before handover.',
    },
    {
      id: 'lead-scoring',
      name: 'Lead Scoring Model Setup',
      description: 'Behavioural and demographic lead scoring built in your CRM with MQL thresholds.',
      price: 1100,
      category: 'Automation',
      tags: ['CRM', 'Lead Scoring', 'Automation'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['Scoring criteria design', 'CRM implementation', 'MQL threshold setup', 'Sales handoff rules', 'Reporting view'],
      turnaround: '4–5 days',
      fullDescription: 'A lead scoring model on behavioural and demographic signals — implemented in your CRM with MQL/SQL thresholds and automated sales alerts.',
    },
    {
      id: 'pipeline-setup',
      name: 'Sales Pipeline Setup',
      description: 'Deal stages, properties, automation, and reporting built in your CRM.',
      price: 950,
      category: 'Automation',
      tags: ['CRM', 'Sales', 'Pipeline'],
      icon: <Layers className="w-6 h-6" />,
      deliverables: ['Deal stage design', 'Custom properties', 'Automation triggers', 'Reporting view', 'Documentation'],
      turnaround: '3–5 days',
      fullDescription: 'A logic-driven sales pipeline — stages that match your actual process, automated reminders, and a live reporting view.',
    },
    {
      id: 'ai-workflow',
      name: 'AI Workflow Integration',
      description: 'Integrate AI tools into your marketing or ops workflows to cut manual work.',
      price: 1200,
      category: 'Automation',
      tags: ['AI', 'Automation', 'Workflow'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Process audit', 'AI tool selection', 'Workflow build', 'Testing', 'Documentation'],
      turnaround: '5–7 days',
      fullDescription: 'AI tools mapped to your workflows and integrated — content generation, data enrichment, lead research, or internal ops. Built on n8n, Make, or your existing stack.',
    },

    // ── WEB & TECHNICAL ───────────────────────────────────────────────────
    {
      id: '4-page-website',
      name: '4-Page Website Build',
      description: 'Custom 4-page website — designed, developed, SEO-ready, and live.',
      price: 2800,
      category: 'Web & Technical',
      tags: ['Website', 'Design', 'Development'],
      icon: <Globe className="w-6 h-6" />,
      deliverables: ['4 custom pages', 'Mobile responsive', 'On-page SEO', 'Contact form', 'Analytics setup', 'Hosting config'],
      turnaround: '10–14 days',
      fullDescription: 'A complete 4-page website — home, about, services, contact — built with SEO best practices, mobile responsiveness, and analytics configured from day one.',
    },
    {
      id: 'landing-page',
      name: 'High-Converting Landing Page',
      description: 'Conversion-focused single-page build — CTA-optimised and fully tracked.',
      price: 1400,
      category: 'Web & Technical',
      tags: ['Landing Page', 'Conversion', 'Design'],
      icon: <Smartphone className="w-6 h-6" />,
      deliverables: ['Custom design & build', 'Copy optimisation', 'CTA hierarchy', 'Analytics integration', 'Mobile responsive'],
      turnaround: '5–7 days',
      fullDescription: 'A high-converting landing page designed to turn traffic into leads — optimised hierarchy, strategic CTAs, and full analytics from day one.',
      isPopular: true,
    },
    {
      id: 'pixel-fix',
      name: 'Tracking Pixel Fix & Implementation',
      description: 'Audit, fix, and implement tracking pixels across your properties.',
      price: 450,
      category: 'Web & Technical',
      tags: ['Tracking', 'Pixels', 'Technical'],
      icon: <Code className="w-6 h-6" />,
      deliverables: ['Pixel audit', 'Implementation via GTM', 'Testing & QA', 'Documentation'],
      turnaround: '1–2 days',
      fullDescription: 'Identify and fix broken tracking pixels, implement new ones via GTM, and verify everything is firing correctly.',
    },
    {
      id: 'web-speed',
      name: 'Website Speed Optimisation',
      description: 'Improve Core Web Vitals and load times — before/after report included.',
      price: 900,
      category: 'Web & Technical',
      tags: ['Performance', 'Core Web Vitals', 'Technical'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Speed audit', 'Image optimisation', 'Caching setup', 'Render-blocking fixes', 'Before/after report'],
      turnaround: '3–5 days',
      fullDescription: 'Image compression, caching, render-blocking resources, and CDN configuration to improve your Core Web Vitals scores.',
    },
    {
      id: 'gtm-audit',
      name: 'Google Tag Manager Audit & Clean-up',
      description: 'Audit, clean, and document your GTM container.',
      price: 650,
      category: 'Web & Technical',
      tags: ['GTM', 'Tracking', 'Technical'],
      icon: <Shield className="w-6 h-6" />,
      deliverables: ['Container audit', 'Redundant tag removal', 'Trigger logic review', 'Naming standards', 'Documentation'],
      turnaround: '2–3 days',
      fullDescription: 'A full GTM container review — removing redundant tags, cleaning trigger logic, applying naming conventions, and documenting the final state.',
    },
    {
      id: 'martech-integration',
      name: 'MarTech Integration Build',
      description: 'Connect two or more tools via API or middleware — scoped, built, and tested.',
      price: 1100,
      category: 'Web & Technical',
      tags: ['Integration', 'API', 'Technical'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Integration scoping', 'API / middleware build', 'Field mapping', 'Error handling', 'Testing & documentation'],
      turnaround: '4–7 days',
      fullDescription: 'Point-to-point or middleware integration between your marketing tools — field mapping, authentication, bi-directional sync, and full documentation.',
    },

    // ── OPTIMISATION ──────────────────────────────────────────────────────
    {
      id: 'conversion-optimisation',
      name: 'CRO Audit',
      description: 'Analyse your conversion funnels, surface friction, and get a ranked action plan.',
      price: 1100,
      category: 'Optimisation',
      tags: ['CRO', 'Optimisation', 'Analytics'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: ['Funnel analysis', 'Heatmap & session review', 'Friction point report', 'A/B test recommendations'],
      turnaround: '4–5 days',
      fullDescription: 'In-depth conversion funnel analysis with heatmap review, session recordings, and a ranked action plan to lift conversion rates across key pages.',
    },
    {
      id: 'ab-test-setup',
      name: 'A/B Test Setup & Analysis',
      description: 'Design, configure, and analyse a conversion experiment — hypothesis to result.',
      price: 800,
      category: 'Optimisation',
      tags: ['A/B Testing', 'CRO', 'Optimisation'],
      icon: <Layers className="w-6 h-6" />,
      deliverables: ['Hypothesis design', 'Variant creation', 'Tool setup', 'Statistical analysis', 'Results report'],
      turnaround: '3–5 days',
      fullDescription: 'A structured A/B test from hypothesis to result — variant design, tool setup, statistical significance monitoring, and a written outcome with next steps.',
    },
    {
      id: 'heatmap-review',
      name: 'Heatmap & Session Recording Review',
      description: 'Surface exactly where and why visitors are dropping off.',
      price: 550,
      category: 'Optimisation',
      tags: ['CRO', 'UX', 'Analytics'],
      icon: <Target className="w-6 h-6" />,
      deliverables: ['Heatmap analysis', 'Session recording review', 'Friction point report', 'Prioritised recommendations'],
      turnaround: '2–3 days',
      fullDescription: 'A review of heatmap and session recording data to find where users hesitate, rage-click, or abandon — with specific, actionable UX fixes.',
    },
    {
      id: 'funnel-audit',
      name: 'Broken Funnel Diagnostics',
      description: 'Quantify exactly where your funnel leaks and what to fix first.',
      price: 650,
      category: 'Optimisation',
      tags: ['Funnel', 'CRO', 'Analytics'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Step-by-step funnel analysis', 'Drop-off quantification', 'Root cause report', 'Fix priority list'],
      turnaround: '2–4 days',
      fullDescription: 'A data-driven funnel audit — quantify exactly where visitors drop off, why, and a ranked fix list ordered by revenue impact.',
    },

    // ── STRATEGY ──────────────────────────────────────────────────────────
    {
      id: 'digital-audit',
      name: 'Digital Marketing Audit',
      description: 'Full-spectrum review across SEO, paid, email, analytics, and website.',
      price: 1800,
      category: 'Strategy',
      tags: ['Audit', 'Strategy', 'Advisory'],
      icon: <FileText className="w-6 h-6" />,
      deliverables: ['Channel-by-channel review', 'Competitive benchmarking', 'Gap analysis', 'Priority roadmap', 'Presentation'],
      turnaround: '5–7 days',
      fullDescription: 'A comprehensive audit across your digital presence — benchmarked against competitors and delivered with a prioritised 90-day action plan.',
      isPopular: true,
    },
    {
      id: 'martech-audit',
      name: 'MarTech Stack Audit',
      description: 'Review tools, integrations, costs, and gaps — with consolidation recommendations.',
      price: 950,
      category: 'Strategy',
      tags: ['MarTech', 'Audit', 'Strategy'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Tool inventory', 'Integration map', 'Cost analysis', 'Overlap identification', 'Recommendations report'],
      turnaround: '3–4 days',
      fullDescription: 'A full review of your marketing technology stack — what you\'re paying for, what\'s integrated, where you\'re wasting spend or missing capability.',
    },
    {
      id: 'competitor-analysis',
      name: 'Competitor Analysis Report',
      description: 'SEO, ad, and positioning intelligence on your top 3 competitors.',
      price: 900,
      category: 'Strategy',
      tags: ['Strategy', 'Competitive', 'Research'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['3 competitor profiles', 'SEO & ad intelligence', 'Positioning matrix', 'Whitespace opportunities'],
      turnaround: '4–5 days',
      fullDescription: 'A structured competitor teardown covering SEO footprint, paid media, messaging, and positioning — with gaps and opportunities you can act on immediately.',
    },
    {
      id: 'gtm-strategy',
      name: 'Go-To-Market Strategy Session',
      description: '2-hour working session + written GTM plan with channel recommendations.',
      price: 1200,
      category: 'Strategy',
      tags: ['GTM', 'Strategy', 'Advisory'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Pre-session briefing doc', '2hr strategy session', 'Written GTM plan', 'Channel mix recommendations', 'Success metrics'],
      turnaround: '5–7 days',
      fullDescription: 'A focused GTM engagement — briefing document, 2-hour working session, then a written plan covering channels, audience strategy, and launch sequencing.',
    },
    {
      id: 'growth-strategy',
      name: '90-Day Growth Roadmap',
      description: 'A strategic 90-day plan built around your goals — prioritised and ready to execute.',
      price: 1500,
      category: 'Strategy',
      tags: ['Strategy', 'Growth', 'Advisory'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Business & funnel review', 'Opportunity prioritisation', '90-day action plan', 'OKR framework', 'Kick-off session'],
      turnaround: '5–7 days',
      fullDescription: 'A 90-day growth plan built around your specific goals — channel priorities, quick wins, and longer-term plays, with an OKR framework to track progress.',
    },
  ];

  const categories = ['all', 'Email', 'Analytics', 'Advertising', 'SEO', 'Automation', 'Web & Technical', 'Optimisation', 'Strategy'];

  const filteredServices = services.filter(s => {
    const categoryMatch = selectedCategory === 'all' || s.category === selectedCategory;
    const searchMatch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
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

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-5 border border-accent/20">
            Fixed-price services — no hidden costs
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
            Services Shop
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-3">
            Browse pre-priced deliverables. See exactly what's included, what it costs, and how long it takes — then enquire in one click.
          </p>
          <p className="text-sm text-foreground/40">All prices in AUD · GST not included</p>
        </div>
      </section>

      {/* ── Sticky Filter Bar ────────────────────────────────────────── */}
      <div className="sticky top-24 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex-shrink-0 w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border-2 border-border text-foreground placeholder-foreground/40 focus:outline-none focus:border-accent text-sm transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 border-2 ${
                    selectedCategory === cat
                      ? 'bg-accent text-white border-accent shadow-md'
                      : 'bg-background text-foreground/70 border-foreground/20 hover:border-accent hover:text-accent'
                  }`}
                >
                  {CATEGORY_ICONS[cat]}
                  <span>{cat === 'all' ? 'All' : cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Results count ────────────────────────────────────────────── */}
      <div className="container max-w-7xl mx-auto px-4 pt-8 pb-2">
        <p className="text-sm text-foreground/40">
          {sortedServices.length} service{sortedServices.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
          {searchQuery ? ` matching "${searchQuery}"` : ''}
        </p>
      </div>

      {/* ── Services Grid ─────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="container max-w-7xl mx-auto px-4">
          {sortedServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-foreground/50">No services found.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 text-accent underline text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedServices.map(service => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`relative flex flex-col rounded-2xl border-2 bg-background cursor-pointer transition-all duration-200 overflow-hidden
                    hover:shadow-xl hover:-translate-y-1
                    ${service.isFeatured
                      ? 'border-accent shadow-md shadow-accent/15'
                      : 'border-border hover:border-accent/60'
                    }`}
                >
                  {/* Accent top bar for featured */}
                  {service.isFeatured && (
                    <div className="h-1 bg-gradient-to-r from-accent to-accent/50 w-full" />
                  )}

                  {/* Badges */}
                  {service.isFeatured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-xs font-bold rounded-full shadow">
                      <Star className="w-3 h-3" /> Full Suite
                    </div>
                  )}
                  {service.isPopular && !service.isFeatured && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/25">
                      Popular
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {/* Icon + category row */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${service.isFeatured ? 'bg-accent/15 text-accent' : 'bg-secondary text-foreground/60'}`}>
                        {service.icon}
                      </div>
                      <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">{service.category}</span>
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-lg text-foreground mb-2 leading-snug pr-20">{service.name}</h3>

                    {/* Description */}
                    <p className="text-sm text-foreground/55 mb-5 leading-relaxed flex-1">{service.description}</p>

                    {/* Deliverables preview */}
                    <ul className="space-y-1.5 mb-5">
                      {service.deliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/60">
                          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                      {service.deliverables.length > 3 && (
                        <li className="text-xs text-foreground/35 pl-5">+ {service.deliverables.length - 3} more included</li>
                      )}
                    </ul>

                    {/* Price + CTA */}
                    <div className="border-t border-border pt-4 mt-auto">
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <p className="text-xs text-foreground/35 mb-0.5">From</p>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-sm text-foreground/50 font-medium">A$</span>
                            <span className="text-3xl font-extrabold text-foreground tracking-tight">{service.price.toLocaleString()}</span>
                          </div>
                          {service.priceNote && (
                            <p className="text-xs text-foreground/35 mt-0.5">{service.priceNote}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-foreground/45 bg-secondary rounded-lg px-2.5 py-1.5 border border-border">
                          <Clock className="w-3 h-3" />
                          {service.turnaround}
                        </div>
                      </div>

                      <Button
                        onClick={(e) => { e.stopPropagation(); handleServiceClick(service); }}
                        size="sm"
                        className={`w-full font-semibold transition-all ${
                          service.isFeatured
                            ? 'bg-accent hover:bg-accent/90 text-white'
                            : 'bg-secondary text-foreground border-2 border-border hover:border-accent hover:bg-accent hover:text-white'
                        }`}
                      >
                        View Details & Enquire
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-accent/10 to-accent/5 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-3">Need something custom?</h2>
          <p className="text-foreground/55 mb-6">Not sure which service fits? Let's scope it together — no commitment required.</p>
          <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
            <Button className="btn-nudge-primary text-base px-8 py-5">Send a Nudge</Button>
          </Link>
        </div>
      </section>

      {/* ── Service Detail Modal ──────────────────────────────────────── */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background border-2 border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-start justify-between rounded-t-2xl z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent flex-shrink-0">
                  {selectedService.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">{selectedService.category}</span>
                    {selectedService.isFeatured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full">
                        <Star className="w-3 h-3" /> Full Suite
                      </span>
                    )}
                    {selectedService.isPopular && !selectedService.isFeatured && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/25">Popular</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-foreground leading-tight">{selectedService.name}</h2>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-foreground/35 hover:text-foreground transition-colors p-1 flex-shrink-0 ml-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Price + timeline */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-accent/8 rounded-xl p-4 border border-accent/15">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-2">Investment</p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-sm text-foreground/55 font-medium">A$</span>
                    <p className="text-3xl font-extrabold text-accent">{selectedService.price.toLocaleString()}</p>
                  </div>
                  {selectedService.priceNote && <p className="text-xs text-foreground/35 mt-1">{selectedService.priceNote}</p>}
                </div>
                <div className="bg-secondary rounded-xl p-4 border border-border">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-2">Turnaround</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <p className="text-lg font-bold text-foreground">{selectedService.turnaround}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-2">About</p>
                <p className="text-foreground/70 leading-relaxed text-sm">{selectedService.fullDescription || selectedService.description}</p>
              </div>

              {/* Deliverables */}
              <div>
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wide mb-3">What's Included</p>
                <ul className="space-y-2.5">
                  {selectedService.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-foreground/65">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedService.tags.map(tag => (
                  <span key={tag} className="bg-secondary text-foreground/50 px-3 py-1 rounded-full text-xs border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-border">
                <Button
                  onClick={() => handleEnquire(selectedService)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold py-5"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enquire About This Service
                </Button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 border-2 border-border rounded-xl text-foreground hover:border-accent/50 transition-colors text-sm font-medium"
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
