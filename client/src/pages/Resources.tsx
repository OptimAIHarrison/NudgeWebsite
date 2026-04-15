import { useState } from 'react';
import { BookOpen, TrendingUp, Code } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'guide' | 'case-study' | 'technical';
  icon: React.ReactNode;
  url: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'The Complete GA4 Setup Guide',
    description: 'Step-by-step guide to setting up Google Analytics 4 with proper event tracking.',
    category: 'guide',
    icon: <BookOpen className="w-5 h-5" />,
    url: '#',
  },
  {
    id: '2',
    title: 'CRM Implementation Checklist',
    description: 'Everything you need to successfully implement and configure a CRM system.',
    category: 'guide',
    icon: <BookOpen className="w-5 h-5" />,
    url: '#',
  },
  {
    id: '3',
    title: 'How We Increased Conversions by 45%',
    description: 'Real case study showing our approach to conversion rate optimization.',
    category: 'case-study',
    icon: <TrendingUp className="w-5 h-5" />,
    url: '#',
  },
  {
    id: '4',
    title: 'GTM Server-Side Tracking Setup',
    description: 'Technical guide to implementing Google Tag Manager Server-Side Tagging.',
    category: 'technical',
    icon: <Code className="w-5 h-5" />,
    url: '#',
  },
  {
    id: '5',
    title: 'Email Marketing Best Practices',
    description: 'Proven strategies for building engaged email lists and improving open rates.',
    category: 'guide',
    icon: <BookOpen className="w-5 h-5" />,
    url: '#',
  },
  {
    id: '6',
    title: 'SEO Audit Framework',
    description: 'Our proprietary framework for conducting comprehensive technical SEO audits.',
    category: 'technical',
    icon: <Code className="w-5 h-5" />,
    url: '#',
  },
];

export default function Resources() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { value: 'guide', label: 'Guides' },
    { value: 'case-study', label: 'Case Studies' },
    { value: 'technical', label: 'Technical' },
  ];

  const filteredResources = selectedCategory
    ? resources.filter((r) => r.category === selectedCategory)
    : resources;

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Resources & Insights
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Guides, case studies, and technical resources to help you master digital marketing.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-accent text-accent-foreground'
                    : 'glass-panel text-foreground hover:border-accent/50'
                }`}
              >
                All Resources
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-accent text-accent-foreground'
                      : 'glass-panel text-foreground hover:border-accent/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Link key={resource.id} href={resource.url}>
                <a className="glass-card group cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent/20 transition-colors">
                      {resource.icon}
                    </div>
                    <span className="text-xs font-semibold text-accent uppercase mt-1">
                      {resource.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {resource.description}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Need Custom Training or Consulting?
          </h2>
          <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
            We offer custom workshops and training sessions for your team.
          </p>
          <Link href="/contact">
            <button className="btn-nudge-primary">
              Send a Nudge
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
