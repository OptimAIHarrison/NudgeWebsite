import { useState } from 'react';
import { Link } from 'wouter';
import { ShoppingCart, Check, Tag, Zap, Mail, Globe, BarChart3, Settings, Code, TrendingUp, Database, Smartphone } from 'lucide-react';
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
}

export default function ServicesMarketplace() {
  // Route to this page: /services-marketplace
  const [cart, setCart] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services: Service[] = [
    {
      id: 'edm-build',
      name: 'Email Template Building',
      description: 'Custom HTML email template design & coding',
      price: 350,
      category: 'Email',
      tags: ['Email', 'Design', 'HTML'],
      icon: <Mail className="w-6 h-6" />,
      deliverables: ['Custom HTML template', 'Mobile responsive', 'Testing across clients'],
      turnaround: '3-5 days',
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
    },
  ];

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const addToCart = (service: Service) => {
    setCart([...cart, service]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(s => s.id !== id));
  };

  const totalPrice = cart.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-accent/10 to-background">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Services Marketplace
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Pre-priced, ready-to-order services. Pick what you need, add to cart, and let's get started.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredServices.map(service => (
              <div key={service.id} className="glass-card p-6 border border-border hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent">
                    {service.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">${service.price}</p>
                    <p className="text-xs text-foreground/60">{service.turnaround}</p>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{service.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Deliverables */}
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
                  onClick={() => addToCart(service)}
                  className="w-full bg-accent hover:bg-accent/90 text-white"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Section */}
      {cart.length > 0 && (
        <section className="py-12 bg-accent/5 border-t border-border">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Cart ({cart.length})</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((service, idx) => (
                  <div key={idx} className="glass-card p-4 border border-border flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-sm text-foreground/60">${service.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(service.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6 border border-border h-fit sticky top-20">
                <h3 className="font-bold text-lg text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 pb-4 border-b border-border mb-4">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Items</span>
                    <span>{cart.length}</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                  <span>Total</span>
                  <span className="text-accent">${totalPrice}</span>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white mb-3">
                  Proceed to Checkout
                </Button>
                <button
                  onClick={() => setCart([])}
                  className="w-full px-4 py-2 text-foreground/70 hover:text-foreground border border-border rounded-lg transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
