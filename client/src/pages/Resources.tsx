import { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, Code, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featuredImage?: string;
  pdf?: {
    url: string;
    requiresForm: boolean;
  };
  embedLinks: string[];
  embedVideos: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: string;
  createdAt: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'guide' | 'case-study' | 'technical';
  icon: React.ReactNode;
  url: string;
}

const defaultResources: Resource[] = [
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
  const [articles, setArticles] = useState<Article[]>([]);
  const [showPdfForm, setShowPdfForm] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });

  useEffect(() => {
    // Load published articles from localStorage
    const saved = localStorage.getItem('articles');
    if (saved) {
      const all = JSON.parse(saved);
      const published = all.filter((a: Article) => a.status === 'published');
      setArticles(published);
    }
  }, []);

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'guide', label: 'Guides' },
    { value: 'case-study', label: 'Case Studies' },
    { value: 'technical', label: 'Technical' },
  ];

  const filteredResources = selectedCategory && selectedCategory !== 'all'
    ? defaultResources.filter((r) => r.category === selectedCategory)
    : defaultResources;

  const handlePdfDownload = (articleId: string, pdfUrl: string) => {
    const article = articles.find(a => a.id === articleId);
    if (article?.pdf?.requiresForm) {
      setShowPdfForm(articleId);
    } else {
      window.open(pdfUrl, '_blank');
    }
  };

  const handleFormSubmit = (e: React.FormEvent, pdfUrl: string) => {
    e.preventDefault();
    // Here you could send the form data to your backend
    console.log('Form submitted:', formData);
    window.open(pdfUrl, '_blank');
    setShowPdfForm(null);
    setFormData({ name: '', email: '', company: '', phone: '' });
  };

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
          {/* Category Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value === 'all' ? null : cat.value)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    (cat.value === 'all' && !selectedCategory) || selectedCategory === cat.value
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="glass-card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                <p className="text-foreground/60 text-sm mb-4">{resource.description}</p>
                <Link href={resource.url}>
                  <a className="text-accent hover:text-accent/80 font-semibold text-sm">
                    Read More →
                  </a>
                </Link>
              </div>
            ))}
          </div>

          {/* Published Articles Section */}
          {articles.length > 0 && (
            <div className="mt-20 pt-20 border-t border-border">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div key={article.id} className="glass-card overflow-hidden hover:shadow-lg transition-all">
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{article.title}</h3>
                      <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <Link href={`/article/${article.slug}`}>
                          <a className="text-accent hover:text-accent/80 font-semibold text-sm">
                            Read Article →
                          </a>
                        </Link>
                        {article.pdf && (
                          <button
                            onClick={() => handlePdfDownload(article.id, article.pdf!.url)}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PDF Download Form Modal */}
      {showPdfForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-foreground mb-4">Download PDF</h3>
            <p className="text-foreground/60 mb-6">Please provide your details to download this resource.</p>
            
            <form onSubmit={(e) => {
              const article = articles.find(a => a.id === showPdfForm);
              if (article?.pdf) {
                handleFormSubmit(e, article.pdf.url);
              }
            }} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPdfForm(null)}
                  className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                >
                  Download
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
