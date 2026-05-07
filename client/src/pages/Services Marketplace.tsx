import { useState } from 'react';
import { Link } from 'wouter';
import { Check, Search, X, Mail, Globe, BarChart3, Settings, Code, TrendingUp, Database, Smartphone, Zap, Clock, DollarSign } from 'lucide-react';
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
    {
      id: 'edm-build',
      name: 'Email Template Building',
      description: 'Custom HTML email template design & coding',
      price: 350,
      category: 'Email',
      tags: ['Email', 'Design', 'HTML'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Custom HTML template', 'Mobile responsive', 'Testing across clients', 'Unlimited revisions'],
      turnaround: '3-5 days',
      fullDescription: 'Get a professionally designed HTML email template that works across all major email clients. Includes responsive design, testing, and unlimited revisions until you\'re satisfied.',
    },
    {
      id: 'ga4-setup',
      name: 'GA4 Setup & Configuration',
      description: 'Complete Google Analytics 4 implementation',
      price: 400,
      category: 'Analytics',
      tags: ['Analytics', 'GA4', 'Tracking'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: ['GA4 property setup', 'Event tracking', 'Conversion tracking', 'Documentation'],
      turnaround: '2-3 days',
      fullDescription: 'Full GA4 implementation with proper event tracking, conversion tracking setup, and comprehensive documentation for your team.',
    },
    {
      id: 'google-ads-setup',
      name: 'Google Ads Account Setup',
      description: 'Complete Google Ads account configuration',
      price: 450,
      category: 'Advertising',
      tags: ['Google Ads', 'PPC', 'Setup'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Account structure', 'Campaign setup', 'Conversion tracking', 'Initial optimization'],
      turnaround: '3-4 days',
      fullDescription: 'Professional Google Ads account setup with proper account structure, campaign organization, and initial optimization for best results.',
    },
    {
      id: 'gbs-optimization',
      name: 'Google Business Profile Optimization',
      description: 'Complete GBP profile setup & optimization',
      price: 300,
      category: 'Local SEO',
      tags: ['Google Business', 'Local SEO', 'Optimization'],
      icon: <Globe className="w-6 h-6" />,
      deliverables: ['Profile optimization', 'Category setup', 'Photo upload', 'Post scheduling'],
      turnaround: '2 days',
      fullDescription: 'Optimize your Google Business Profile for maximum visibility in local search results with complete profile setup and optimization.',
    },
    {
      id: '4-page-website',
      name: '4-Page Website Build',
      description: 'Custom 4-page website design & development',
      price: 1200,
      category: 'Web Development',
      tags: ['Website', 'Design', 'Development'],
      icon: <Globe className="w-6 h-6" />,
      deliverables: ['4 custom pages', 'Mobile responsive', 'SEO optimized', 'Contact form', 'Hosting setup'],
      turnaround: '10-14 days',
      fullDescription: 'A complete 4-page website built from scratch with responsive design, SEO optimization, contact forms, and hosting setup included.',
    },
    {
      id: 'landing-page',
      name: 'High-Converting Landing Page',
      description: 'Single-page conversion-focused design',
      price: 600,
      category: 'Web Development',
      tags: ['Landing Page', 'Conversion', 'Design'],
      icon: <Smartphone className="w-6 h-6" />,
      deliverables: ['Custom design', 'Copy optimization', 'CTA setup', 'Analytics integration'],
      turnaround: '5-7 days',
      fullDescription: 'A high-converting landing page designed specifically to turn visitors into customers with optimized copy and strategic CTAs.',
    },
    {
      id: 'pixel-fix',
      name: 'Tracking Pixel Fix & Implementation',
      description: 'Fix broken tracking pixels & implement new ones',
      price: 250,
      category: 'Technical',
      tags: ['Tracking', 'Pixels', 'Technical'],
      icon: <Code className="w-6 h-6" />,
      deliverables: ['Pixel audit', 'Implementation', 'Testing', 'Documentation'],
      turnaround: '1-2 days',
      fullDescription: 'Identify and fix broken tracking pixels, implement new ones, and ensure proper tracking across your digital properties.',
    },
    {
      id: 'crm-setup',
      name: 'CRM Setup & Configuration',
      description: 'Complete CRM implementation & workflow setup',
      price: 800,
      category: 'Automation',
      tags: ['CRM', 'Automation', 'Setup'],
      icon: <Database className="w-6 h-6" />,
      deliverables: ['CRM configuration', 'Workflow setup', 'Integration', 'Team training'],
      turnaround: '5-7 days',
      fullDescription: 'Full CRM setup and configuration with custom workflows, integrations, and team training to maximize your CRM investment.',
    },
    {
      id: 'email-sequences',
      name: 'Email Automation Sequences',
      description: 'Design & implement automated email sequences',
      price: 500,
      category: 'Email',
      tags: ['Email', 'Automation', 'Sequences'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Sequence design', 'Template creation', 'Automation setup', 'Testing'],
      turnaround: '4-6 days',
      fullDescription: 'Professionally designed email automation sequences that nurture leads and drive conversions with strategic messaging.',
    },
    {
      id: 'seo-audit',
      name: 'Technical SEO Audit',
      description: 'Comprehensive technical SEO analysis',
      price: 350,
      category: 'SEO',
      tags: ['SEO', 'Audit', 'Technical'],
      icon: <TrendingUp className="w-6 h-6" />,
      deliverables: ['Full audit report', 'Recommendations', 'Priority fixes', 'Implementation guide'],
      turnaround: '3-4 days',
      fullDescription: 'A comprehensive technical SEO audit identifying all issues affecting your search visibility with actionable recommendations.',
    },
    {
      id: 'seo-fixes',
      name: 'Technical SEO Quick Fixes',
      description: 'Fix common technical SEO issues',
      price: 400,
      category: 'SEO',
      tags: ['SEO', 'Technical', 'Fixes'],
      icon: <Zap className="w-6 h-6" />,
      deliverables: ['Sitemap fixes', 'Robots.txt optimization', 'Meta tags', 'Schema markup'],
      turnaround: '2-3 days',
      fullDescription: 'Quick fixes for common technical SEO issues including sitemap optimization, robots.txt, meta tags, and schema markup.',
    },
    {
      id: 'conversion-optimization',
      name: 'Conversion Rate Optimization Audit',
      description: 'Analyze & optimize conversion funnels',
      price: 600,
      category: 'Optimization',
      tags: ['CRO', 'Optimization', 'Analytics'],
      icon: <BarChart3 className="w-6 h-6" />,
      deliverables: ['Funnel analysis', 'Heatmap review', 'Recommendations', 'A/B test setup'],
      turnaround: '4-5 days',
      fullDescription: 'In-depth conversion funnel analysis with heatmap review and actionable recommendations to increase your conversion rates.',
    },
    {
      id: 'database-cleanup',
      name: 'Database Cleanup & Optimization',
      description: 'Clean & optimize your database',
      price: 450,
      category: 'Technical',
      tags: ['Database', 'Optimization', 'Technical'],
      icon: <Settings className="w-6 h-6" />,
      deliverables: ['Data audit', 'Cleanup', 'Optimization', 'Performance report'],
      turnaround: '3-5 days',
      fullDescription: 'Complete database audit, cleanup of redundant data, optimization for performance, and detailed performance report.',
    },
  ];

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];
  
  const filteredServices = services.filter(s => {
    const categoryMatch = selectedCategory === 'all' || s.category === selectedCategory;
    const searchMatch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleEnquire = (service: Service) => {
    // Navigate to contact page with service info
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
              Browse our pre-priced services, get detailed information, and enquire about what you need.
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

      {/* Services Grid */}
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
