import { useState, useEffect } from 'react';
import { Search, X, ArrowRight, ShoppingBag, Layers, Clock, DollarSign } from 'lucide-react';
import { Link } from 'wouter';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Unified search index ────────────────────────────────────────────────────

interface IndexItem {
  id: string;
  title: string;
  description: string;
  source: 'services' | 'marketplace';
  // services fields
  pillar?: string;
  pillarName?: string;
  // marketplace fields
  price?: number;
  turnaround?: string;
  category?: string;
  // shared
  keywords: string[];
  url: string;
}

const SERVICES_INDEX: IndexItem[] = [
  // ── Strategic Advisory & Audits ──
  { id: 's-strategic-0', title: 'Comprehensive Digital Marketing Audit', description: 'Full-spectrum analysis, competitive benchmarking, gap identification', source: 'services', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['audit', 'analysis', 'review', 'assessment', 'digital', 'marketing', 'competitive', 'benchmark', 'gap'], url: '/services?pillar=strategic' },
  { id: 's-strategic-1', title: 'Growth Strategy & Roadmap', description: 'Strategic planning, opportunity identification, implementation timeline', source: 'services', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['strategy', 'roadmap', 'planning', 'growth', 'market research', 'opportunity'], url: '/services?pillar=strategic' },
  { id: 's-strategic-2', title: 'MarTech Stack Consulting', description: 'Tool evaluation, integration planning, cost optimization', source: 'services', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['martech', 'tools', 'stack', 'technology', 'software', 'integration', 'cost'], url: '/services?pillar=strategic' },
  { id: 's-strategic-3', title: 'Competitive Intelligence & Market Mapping', description: 'Competitor profiling, share of voice, positioning', source: 'services', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['competitive', 'intelligence', 'competitor', 'market', 'positioning', 'share of voice'], url: '/services?pillar=strategic' },
  { id: 's-strategic-4', title: 'Go-To-Market Strategy', description: 'Launch planning, channel prioritization, audience segmentation', source: 'services', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['go to market', 'gtm', 'launch', 'channel', 'audience', 'segmentation'], url: '/services?pillar=strategic' },
  { id: 's-strategic-5', title: 'Quarterly Business Reviews & Advisory', description: 'Performance review, strategic recalibration, executive reporting', source: 'services', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['advisory', 'quarterly', 'review', 'executive', 'reporting', 'retainer'], url: '/services?pillar=strategic' },
  // ── Marketing Operations & Automation ──
  { id: 's-operations-0', title: 'CRM Implementation & Optimization', description: 'Setup & configuration, workflow automation, data integration', source: 'services', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['crm', 'hubspot', 'salesforce', 'pipedrive', 'implementation', 'workflow', 'automation', 'data'], url: '/services?pillar=operations' },
  { id: 's-operations-1', title: 'Email Marketing & Lifecycle Automation', description: 'Automation sequences, lifecycle campaigns, segmentation', source: 'services', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['email', 'automation', 'edm', 'lifecycle', 'newsletter', 'klaviyo', 'mailchimp', 'campaign', 'sequence', 'drip'], url: '/services?pillar=operations' },
  { id: 's-operations-2', title: 'AI & Workflow Automation', description: 'Process automation, AI integration, efficiency gains', source: 'services', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['automation', 'ai', 'workflow', 'zapier', 'make', 'n8n', 'integration', 'efficiency', 'process'], url: '/services?pillar=operations' },
  { id: 's-operations-3', title: 'Lead Scoring & Nurture Architecture', description: 'Scoring model, MQL/SQL thresholds, nurture sequences', source: 'services', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['lead scoring', 'mql', 'sql', 'nurture', 'pipeline', 'scoring', 'qualification'], url: '/services?pillar=operations' },
  { id: 's-operations-4', title: 'Marketing Data & CDP Setup', description: 'Data unification, audience syncing, identity resolution', source: 'services', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['cdp', 'data', 'segment', 'audience', 'identity', 'unification', 'first party'], url: '/services?pillar=operations' },
  { id: 's-operations-5', title: 'Reporting Infrastructure & Dashboards', description: 'Unified data pipeline, automated reporting, stakeholder views', source: 'services', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['reporting', 'dashboard', 'data pipeline', 'automated', 'looker studio', 'stakeholder', 'metrics'], url: '/services?pillar=operations' },
  // ── Performance Marketing & Analytics ──
  { id: 's-performance-0', title: 'Advanced Tracking & Attribution', description: 'GA4, event tracking, attribution modeling', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['tracking', 'attribution', 'ga4', 'google analytics', 'events', 'data', 'analytics', 'pixel'], url: '/services?pillar=performance' },
  { id: 's-performance-1', title: 'Paid Media Strategy & Management', description: 'Campaign strategy, bid optimization, performance reporting', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['paid', 'ads', 'google ads', 'meta ads', 'facebook', 'ppc', 'advertising', 'linkedin ads', 'campaign', 'bid'], url: '/services?pillar=performance' },
  { id: 's-performance-2', title: 'Technical SEO & Search Authority', description: 'Site optimization, technical fixes, authority building', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['seo', 'search', 'ranking', 'organic', 'technical seo', 'backlinks', 'schema', 'sitemap', 'crawl'], url: '/services?pillar=performance' },
  { id: 's-performance-3', title: 'Conversion Rate Optimization', description: 'A/B testing, funnel analysis, UX optimization', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['cro', 'conversion', 'ab test', 'split test', 'funnel', 'optimization', 'ux', 'heatmap', 'hotjar'], url: '/services?pillar=performance' },
  { id: 's-performance-4', title: 'Analytics & Reporting', description: 'Custom dashboards, automated reporting, data visualization', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['analytics', 'reporting', 'dashboard', 'insights', 'metrics', 'data', 'visualization', 'looker'], url: '/services?pillar=performance' },
  { id: 's-performance-5', title: 'Retargeting & Audience Strategy', description: 'Audience segmentation, retargeting sequences, suppression', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['retargeting', 'remarketing', 'audience', 'suppression', 'lookalike', 'custom audience'], url: '/services?pillar=performance' },
  { id: 's-performance-6', title: 'Customer Lifetime Value Optimization', description: 'LTV modeling, retention campaigns, upsell sequences', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['ltv', 'lifetime value', 'retention', 'churn', 'upsell', 'win back', 'loyalty'], url: '/services?pillar=performance' },
  { id: 's-performance-7', title: 'Budget Allocation & Media Mix Modeling', description: 'Spend analysis, channel efficiency, scenario planning', source: 'services', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['budget', 'media mix', 'allocation', 'spend', 'roas', 'efficiency', 'scenario'], url: '/services?pillar=performance' },
  // ── Brand & Content ──
  { id: 's-brand-0', title: 'Messaging & Core Narrative', description: 'Brand positioning, value proposition, messaging framework', source: 'services', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['messaging', 'brand', 'narrative', 'positioning', 'value proposition', 'tone of voice', 'copy'], url: '/services?pillar=brand' },
  { id: 's-brand-1', title: 'Social Media Strategy & Direction', description: 'Platform strategy, content calendar, community management', source: 'services', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['social media', 'instagram', 'linkedin', 'twitter', 'facebook', 'tiktok', 'content calendar', 'community'], url: '/services?pillar=brand' },
  { id: 's-brand-2', title: 'Brand & Creative Assets', description: 'Asset creation, brand guidelines, creative direction', source: 'services', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['brand', 'creative', 'design', 'assets', 'logo', 'guidelines', 'figma', 'canva'], url: '/services?pillar=brand' },
  { id: 's-brand-3', title: 'Content Marketing Strategy', description: 'Editorial planning, SEO content mapping, distribution', source: 'services', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['content', 'blog', 'editorial', 'seo content', 'content marketing', 'distribution', 'pillar', 'cluster'], url: '/services?pillar=brand' },
  { id: 's-brand-4', title: 'Thought Leadership & PR', description: 'Executive positioning, media outreach, LinkedIn authority', source: 'services', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['thought leadership', 'pr', 'media', 'linkedin', 'executive', 'press', 'outreach', 'authority'], url: '/services?pillar=brand' },
  { id: 's-brand-5', title: 'Video & Podcast Content Strategy', description: 'Format planning, production briefs, distribution', source: 'services', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['video', 'podcast', 'youtube', 'production', 'content', 'repurposing', 'clips'], url: '/services?pillar=brand' },
  // ── Technical ──
  { id: 's-technical-0', title: 'Website Performance & Speed', description: 'Speed optimization, Core Web Vitals, technical fixes', source: 'services', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['performance', 'speed', 'core web vitals', 'website', 'pagespeed', 'loading', 'cache', 'cdn'], url: '/services?pillar=technical' },
  { id: 's-technical-1', title: 'Tracking & Data Integrity', description: 'Tracking audit, data validation, implementation fixes', source: 'services', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['tracking', 'data', 'cleanup', 'integrity', 'tag manager', 'gtm', 'validation', 'duplicate'], url: '/services?pillar=technical' },
  { id: 's-technical-2', title: 'Broken Funnel & Conversion Diagnostics', description: 'Funnel analysis, issue identification, optimization', source: 'services', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['funnel', 'conversion', 'diagnostic', 'drop off', 'broken', 'fix', 'issue'], url: '/services?pillar=technical' },
  { id: 's-technical-3', title: 'Tag Management & GTM Audit', description: 'Container audit, tag governance, clean implementation', source: 'services', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['gtm', 'google tag manager', 'tags', 'audit', 'container', 'governance', 'triggers'], url: '/services?pillar=technical' },
  { id: 's-technical-4', title: 'Landing Page & CRO Build', description: 'High-converting builds, A/B variants, CTA optimization', source: 'services', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['landing page', 'cro', 'conversion', 'build', 'webflow', 'unbounce', 'cta', 'ab test'], url: '/services?pillar=technical' },
  { id: 's-technical-5', title: 'MarTech Integration & API Connectors', description: 'System integration, API setup, data sync', source: 'services', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['integration', 'api', 'connector', 'sync', 'middleware', 'zapier', 'make', 'webhook'], url: '/services?pillar=technical' },
];

const MARKETPLACE_INDEX: IndexItem[] = [
  { id: 'm-full-email-suite', title: 'Full Email Marketing Suite', description: 'Complete email programme — ESP setup, automations, templates, dashboard', source: 'marketplace', category: 'Email', price: 3800, turnaround: '2–3 weeks', keywords: ['email', 'esp', 'klaviyo', 'suite', 'full', 'automation', 'template', 'deliverability', 'welcome series', 'lifecycle'], url: '/services-marketplace' },
  { id: 'm-full-seo-suite', title: 'Full SEO Setup & Foundation', description: 'Technical SEO, keyword strategy, on-page, reporting', source: 'marketplace', category: 'SEO', price: 4500, turnaround: '3–4 weeks', keywords: ['seo', 'full', 'suite', 'technical', 'keyword', 'on page', 'schema', 'sitemap', 'google search console', 'ranking'], url: '/services-marketplace' },
  { id: 'm-full-analytics-suite', title: 'Full Analytics & Tracking Setup', description: 'GA4, GTM, ad tracking, attribution, custom dashboard', source: 'marketplace', category: 'Analytics', price: 3200, turnaround: '1–2 weeks', keywords: ['analytics', 'ga4', 'gtm', 'tracking', 'attribution', 'dashboard', 'full setup', 'pixel', 'meta capi'], url: '/services-marketplace' },
  { id: 'm-full-crm-suite', title: 'Full CRM & Marketing Automation Setup', description: 'CRM, pipelines, automations, lead scoring, training', source: 'marketplace', category: 'Automation', price: 5500, turnaround: '3–5 weeks', keywords: ['crm', 'hubspot', 'full', 'suite', 'pipeline', 'lead scoring', 'automation', 'training', 'nurture'], url: '/services-marketplace' },
  { id: 'm-full-paid-media-suite', title: 'Full Paid Media Setup', description: 'Google Ads, Meta Ads, tracking, audiences, retargeting', source: 'marketplace', category: 'Advertising', price: 3500, turnaround: '1–2 weeks', keywords: ['paid media', 'google ads', 'meta ads', 'facebook ads', 'full', 'suite', 'retargeting', 'audience', 'pixel'], url: '/services-marketplace' },
  { id: 'm-edm-build', title: 'Email Template Build', description: 'Custom branded HTML email template, mobile-responsive', source: 'marketplace', category: 'Email', price: 550, turnaround: '3–5 days', keywords: ['email', 'template', 'html', 'edm', 'design', 'responsive', 'branded'], url: '/services-marketplace' },
  { id: 'm-email-sequences', title: 'Email Automation Sequences', description: 'Nurture or lifecycle sequences built in your ESP', source: 'marketplace', category: 'Email', price: 900, turnaround: '5–7 days', keywords: ['email', 'automation', 'sequence', 'nurture', 'lifecycle', 'drip', 'esp', 'flows'], url: '/services-marketplace' },
  { id: 'm-welcome-series', title: 'Welcome Series Setup', description: '3-email onboarding sequence, configured and live', source: 'marketplace', category: 'Email', price: 750, turnaround: '3–5 days', keywords: ['welcome', 'email', 'onboarding', 'new subscriber', 'series', 'automation'], url: '/services-marketplace' },
  { id: 'm-winback', title: 'Win-Back Campaign', description: 'Re-engage lapsed subscribers or customers', source: 'marketplace', category: 'Email', price: 800, turnaround: '4–5 days', keywords: ['win back', 'reengagement', 'lapsed', 'retention', 'email', 'campaign'], url: '/services-marketplace' },
  { id: 'm-email-audit', title: 'Email Programme Audit', description: 'Deliverability, list health, automation review', source: 'marketplace', category: 'Email', price: 650, turnaround: '3–4 days', keywords: ['email', 'audit', 'deliverability', 'list health', 'spam', 'open rate', 'programme review'], url: '/services-marketplace' },
  { id: 'm-ga4-setup', title: 'GA4 Setup & Configuration', description: 'Complete GA4 implementation with event and conversion tracking', source: 'marketplace', category: 'Analytics', price: 750, turnaround: '2–3 days', keywords: ['ga4', 'google analytics', 'setup', 'events', 'conversion tracking', 'analytics'], url: '/services-marketplace' },
  { id: 'm-custom-dashboard', title: 'Custom Marketing Dashboard', description: 'Branded dashboard connecting your key data sources', source: 'marketplace', category: 'Analytics', price: 950, turnaround: '4–6 days', keywords: ['dashboard', 'reporting', 'looker studio', 'data studio', 'custom', 'automated', 'metrics'], url: '/services-marketplace' },
  { id: 'm-attribution', title: 'Attribution Model Setup', description: 'Multi-touch attribution configured across your channels', source: 'marketplace', category: 'Analytics', price: 1100, turnaround: '4–6 days', keywords: ['attribution', 'multi touch', 'last click', 'channel', 'revenue attribution', 'marketing attribution'], url: '/services-marketplace' },
  { id: 'm-conversion-tracking', title: 'Conversion Tracking Setup', description: 'Accurate tracking across Google Ads & Meta via GTM', source: 'marketplace', category: 'Analytics', price: 650, turnaround: '2–3 days', keywords: ['conversion tracking', 'google ads', 'meta', 'facebook pixel', 'gtm', 'capi', 'setup'], url: '/services-marketplace' },
  { id: 'm-analytics-audit', title: 'Analytics Health Audit', description: 'Find gaps, duplicates, and broken tracking', source: 'marketplace', category: 'Analytics', price: 550, turnaround: '2–3 days', keywords: ['analytics', 'audit', 'tracking', 'broken', 'gap', 'data quality', 'duplicate'], url: '/services-marketplace' },
  { id: 'm-google-ads', title: 'Google Ads Account Setup', description: 'Full account structure, campaigns, conversion tracking', source: 'marketplace', category: 'Advertising', price: 900, turnaround: '3–4 days', keywords: ['google ads', 'adwords', 'ppc', 'search ads', 'campaign setup', 'keywords', 'bidding'], url: '/services-marketplace' },
  { id: 'm-meta-ads', title: 'Meta Ads Account Setup', description: 'Business Manager, Pixel, CAPI, audiences, campaigns', source: 'marketplace', category: 'Advertising', price: 900, turnaround: '3–4 days', keywords: ['meta ads', 'facebook ads', 'instagram ads', 'pixel', 'capi', 'business manager', 'paid social'], url: '/services-marketplace' },
  { id: 'm-ppc-audit', title: 'Paid Media Audit', description: 'Teardown of your Google or Meta account', source: 'marketplace', category: 'Advertising', price: 750, turnaround: '3–4 days', keywords: ['ppc', 'paid media', 'audit', 'google ads', 'meta ads', 'roas', 'waste spend'], url: '/services-marketplace' },
  { id: 'm-retargeting', title: 'Retargeting Campaign Setup', description: 'Multi-stage retargeting across Google & Meta', source: 'marketplace', category: 'Advertising', price: 950, turnaround: '4–5 days', keywords: ['retargeting', 'remarketing', 'google ads', 'meta ads', 'audience', 'funnel', 'drop off'], url: '/services-marketplace' },
  { id: 'm-linkedin-ads', title: 'LinkedIn Ads Setup', description: 'B2B LinkedIn campaigns, Insight Tag, targeting', source: 'marketplace', category: 'Advertising', price: 1100, turnaround: '3–4 days', keywords: ['linkedin', 'b2b', 'linkedin ads', 'lead gen', 'insight tag', 'paid social', 'b2b marketing'], url: '/services-marketplace' },
  { id: 'm-seo-audit', title: 'Technical SEO Audit', description: 'Comprehensive technical SEO analysis with action plan', source: 'marketplace', category: 'SEO', price: 700, turnaround: '3–5 days', keywords: ['seo', 'technical seo', 'audit', 'crawl', 'core web vitals', 'sitemap', 'ranking'], url: '/services-marketplace' },
  { id: 'm-seo-fixes', title: 'Technical SEO Implementation', description: 'Fix sitemap, meta tags, schema, redirects', source: 'marketplace', category: 'SEO', price: 750, turnaround: '3–5 days', keywords: ['seo', 'technical', 'fix', 'schema', 'meta tags', 'redirect', 'sitemap', 'robots'], url: '/services-marketplace' },
  { id: 'm-local-seo', title: 'Google Business Profile Setup', description: 'GBP setup, optimisation, local SEO foundation', source: 'marketplace', category: 'SEO', price: 550, turnaround: '2 days', keywords: ['local seo', 'google business', 'gbp', 'google my business', 'local', 'maps', 'review'], url: '/services-marketplace' },
  { id: 'm-keyword-research', title: 'Keyword Research & Mapping', description: 'High-value keywords mapped to your site structure', source: 'marketplace', category: 'SEO', price: 650, turnaround: '3–4 days', keywords: ['keyword research', 'seo', 'search intent', 'keywords', 'content gap', 'mapping', 'ranking'], url: '/services-marketplace' },
  { id: 'm-schema', title: 'Schema Markup Implementation', description: 'Structured data for rich search results', source: 'marketplace', category: 'SEO', price: 550, turnaround: '2–3 days', keywords: ['schema', 'structured data', 'rich results', 'seo', 'json ld', 'markup'], url: '/services-marketplace' },
  { id: 'm-crm-setup', title: 'CRM Setup & Configuration', description: 'Full CRM with properties, pipelines, workflows', source: 'marketplace', category: 'Automation', price: 1800, turnaround: '5–7 days', keywords: ['crm', 'hubspot', 'salesforce', 'setup', 'pipeline', 'workflow', 'automation', 'contact management'], url: '/services-marketplace' },
  { id: 'm-hubspot-audit', title: 'HubSpot Portal Audit', description: 'Review what\'s broken, duplicated, or underused', source: 'marketplace', category: 'Automation', price: 850, turnaround: '3–4 days', keywords: ['hubspot', 'audit', 'crm', 'portal', 'workflow', 'data quality', 'cleanup'], url: '/services-marketplace' },
  { id: 'm-zapier', title: 'Zapier / Make Workflow Build', description: 'Custom automation connecting your tools', source: 'marketplace', category: 'Automation', price: 650, turnaround: '2–4 days', keywords: ['zapier', 'make', 'automation', 'workflow', 'integration', 'connect', 'n8n', 'no code'], url: '/services-marketplace' },
  { id: 'm-lead-scoring', title: 'Lead Scoring Model Setup', description: 'Behavioural and demographic scoring in your CRM', source: 'marketplace', category: 'Automation', price: 1100, turnaround: '4–5 days', keywords: ['lead scoring', 'mql', 'sql', 'scoring', 'crm', 'qualification', 'nurture', 'sales handoff'], url: '/services-marketplace' },
  { id: 'm-landing-page', title: 'High-Converting Landing Page', description: 'Conversion-focused page — CTA-optimised and tracked', source: 'marketplace', category: 'Web & Technical', price: 1400, turnaround: '5–7 days', keywords: ['landing page', 'conversion', 'cro', 'page build', 'webflow', 'unbounce', 'cta', 'lead gen'], url: '/services-marketplace' },
  { id: 'm-website', title: '4-Page Website Build', description: 'Custom 4-page website — designed, built, SEO-ready', source: 'marketplace', category: 'Web & Technical', price: 2800, turnaround: '10–14 days', keywords: ['website', 'web design', 'build', 'webflow', 'seo', '4 page', 'responsive', 'landing'], url: '/services-marketplace' },
  { id: 'm-web-speed', title: 'Website Speed Optimisation', description: 'Improve Core Web Vitals and load times', source: 'marketplace', category: 'Web & Technical', price: 900, turnaround: '3–5 days', keywords: ['speed', 'performance', 'core web vitals', 'pagespeed', 'loading', 'cache', 'cdn', 'website'], url: '/services-marketplace' },
  { id: 'm-gtm-audit', title: 'Google Tag Manager Audit & Clean-up', description: 'Audit, clean, and document your GTM container', source: 'marketplace', category: 'Web & Technical', price: 650, turnaround: '2–3 days', keywords: ['gtm', 'google tag manager', 'audit', 'tags', 'cleanup', 'container', 'triggers', 'tracking'], url: '/services-marketplace' },
  { id: 'm-cro-audit', title: 'CRO Audit', description: 'Funnel analysis, heatmaps, friction point report', source: 'marketplace', category: 'Optimisation', price: 1100, turnaround: '4–5 days', keywords: ['cro', 'conversion', 'audit', 'heatmap', 'funnel', 'optimisation', 'ux', 'friction'], url: '/services-marketplace' },
  { id: 'm-ab-test', title: 'A/B Test Setup & Analysis', description: 'Hypothesis to result — tool setup, variants, analysis', source: 'marketplace', category: 'Optimisation', price: 800, turnaround: '3–5 days', keywords: ['ab test', 'split test', 'conversion', 'experiment', 'optimisation', 'variant', 'hypothesis'], url: '/services-marketplace' },
  { id: 'm-funnel-audit', title: 'Broken Funnel Diagnostics', description: 'Quantify exactly where your funnel leaks', source: 'marketplace', category: 'Optimisation', price: 650, turnaround: '2–4 days', keywords: ['funnel', 'broken', 'drop off', 'conversion', 'diagnostic', 'analytics', 'fix'], url: '/services-marketplace' },
  { id: 'm-digital-audit', title: 'Digital Marketing Audit', description: 'Full-spectrum review — SEO, paid, email, analytics', source: 'marketplace', category: 'Strategy', price: 1800, turnaround: '5–7 days', keywords: ['audit', 'digital marketing', 'full audit', 'strategy', 'review', 'seo', 'paid', 'email', 'analytics'], url: '/services-marketplace' },
  { id: 'm-competitor-analysis', title: 'Competitor Analysis Report', description: 'SEO, ad, and positioning intel on top 3 competitors', source: 'marketplace', category: 'Strategy', price: 900, turnaround: '4–5 days', keywords: ['competitor', 'analysis', 'competitive', 'intelligence', 'seo', 'positioning', 'research'], url: '/services-marketplace' },
  { id: 'm-growth-roadmap', title: '90-Day Growth Roadmap', description: 'Strategic 90-day plan built around your goals', source: 'marketplace', category: 'Strategy', price: 1500, turnaround: '5–7 days', keywords: ['growth', 'roadmap', 'strategy', '90 day', 'plan', 'okr', 'channel', 'priorities'], url: '/services-marketplace' },
];

const ALL_INDEX = [...SERVICES_INDEX, ...MARKETPLACE_INDEX];

// Score a single item against a query — higher = better match
function scoreItem(item: IndexItem, terms: string[]): number {
  let score = 0;
  const titleLower = item.title.toLowerCase();
  const descLower = item.description.toLowerCase();
  const catLower = (item.pillarName || item.category || '').toLowerCase();

  for (const term of terms) {
    if (titleLower.includes(term))      score += 10;
    if (descLower.includes(term))       score += 5;
    if (catLower.includes(term))        score += 4;
    if (item.keywords.some(k => k.includes(term) || term.includes(k))) score += 3;
  }
  return score;
}

const QUICK_TAGS = ['SEO', 'Email', 'CRM', 'Analytics', 'Google Ads', 'Automation', 'Landing page', 'Tracking'];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [servicesResults, setServicesResults] = useState<(IndexItem & { score: number })[]>([]);
  const [marketplaceResults, setMarketplaceResults] = useState<(IndexItem & { score: number })[]>([]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setServicesResults([]);
      setMarketplaceResults([]);
      return;
    }

    const terms = q.split(/\s+/).filter(t => t.length > 1);

    const scored = ALL_INDEX
      .map(item => ({ ...item, score: scoreItem(item, terms) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    setServicesResults(scored.filter(i => i.source === 'services').slice(0, 5));
    setMarketplaceResults(scored.filter(i => i.source === 'marketplace').slice(0, 5));
  }, [query]);

  const hasResults = servicesResults.length > 0 || marketplaceResults.length > 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="container max-w-2xl mx-auto pt-16 px-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-background rounded-2xl border-2 border-border shadow-2xl overflow-hidden animate-slide-in-down">

          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <Search className="w-5 h-5 text-foreground/40 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search services, tools, problems… (e.g. 'fix my tracking', 'email automation')"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-foreground placeholder-foreground/40 outline-none text-base"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-foreground/40 hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-1.5 hover:bg-accent/10 rounded-lg transition-colors ml-1">
              <X className="w-4 h-4 text-foreground/50" />
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto">

            {/* Empty state — quick tags */}
            {!query && (
              <div className="p-6">
                <p className="text-xs font-bold text-foreground/35 uppercase tracking-widest mb-4">Try searching for</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TAGS.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3.5 py-2 bg-secondary border-2 border-border text-foreground/65 text-sm font-semibold rounded-xl hover:border-accent hover:text-accent transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-foreground/30 mt-5">
                  Searches across 32+ services and the marketplace — try plain English like "fix my broken funnel"
                </p>
              </div>
            )}

            {/* Results */}
            {query && hasResults && (
              <div className="divide-y divide-border">

                {/* Services results */}
                {servicesResults.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-5 py-3 bg-secondary/50">
                      <Layers className="w-3.5 h-3.5 text-foreground/40" />
                      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Services</p>
                    </div>
                    {servicesResults.map(item => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={() => { onClose(); window.scrollTo(0, 0); }}
                      >
                        <div className="flex items-center justify-between px-5 py-3.5 hover:bg-accent/5 transition-colors cursor-pointer group">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground text-sm leading-tight">{item.title}</p>
                            <p className="text-xs text-foreground/45 mt-0.5">{item.pillarName}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-foreground/25 group-hover:text-accent flex-shrink-0 ml-3 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Marketplace results */}
                {marketplaceResults.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-5 py-3 bg-secondary/50">
                      <ShoppingBag className="w-3.5 h-3.5 text-foreground/40" />
                      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Services Shop — fixed price</p>
                    </div>
                    {marketplaceResults.map(item => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={() => { onClose(); window.scrollTo(0, 0); }}
                      >
                        <div className="flex items-center justify-between px-5 py-3.5 hover:bg-accent/5 transition-colors cursor-pointer group">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground text-sm leading-tight">{item.title}</p>
                            <p className="text-xs text-foreground/45 mt-0.5">{item.category}</p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                            {item.turnaround && (
                              <span className="hidden sm:flex items-center gap-1 text-xs text-foreground/35">
                                <Clock className="w-3 h-3" />{item.turnaround}
                              </span>
                            )}
                            {item.price && (
                              <span className="flex items-center gap-0.5 text-sm font-extrabold text-accent">
                                <DollarSign className="w-3.5 h-3.5" />{item.price.toLocaleString()}
                              </span>
                            )}
                            <ArrowRight className="w-4 h-4 text-foreground/25 group-hover:text-accent transition-colors" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No results */}
            {query && !hasResults && (
              <div className="p-8 text-center">
                <p className="text-foreground/50 mb-1 font-semibold">No results for "{query}"</p>
                <p className="text-xs text-foreground/35 mb-5">Try different words, or browse everything below</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/services" onClick={() => { onClose(); window.scrollTo(0, 0); }}>
                    <button className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors">
                      Browse all services
                    </button>
                  </Link>
                  <Link href="/services-marketplace" onClick={() => { onClose(); window.scrollTo(0, 0); }}>
                    <button className="px-4 py-2 border-2 border-border rounded-xl text-sm font-semibold hover:border-accent hover:text-accent transition-all">
                      Browse the shop
                    </button>
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="border-t border-border px-5 py-3 flex items-center justify-between bg-secondary/30">
            <p className="text-xs text-foreground/35">Searching services + marketplace</p>
            <button
              onClick={() => { window.location.href = '/services-marketplace'; onClose(); }}
              className="text-xs font-semibold text-accent hover:opacity-70 transition-opacity"
            >
              Browse full shop →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
