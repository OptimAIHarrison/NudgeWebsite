import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  pillar: string;
  url: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES_DATA = [
  { id: 'strategic-0', title: 'Comprehensive Digital Marketing Audit', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['audit', 'analysis', 'review', 'assessment'] },
  { id: 'strategic-1', title: 'Growth Strategy & Roadmap Development', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['strategy', 'roadmap', 'planning', 'growth'] },
  { id: 'strategic-2', title: 'Marketing Technology (MarTech) Stack Consulting', pillar: 'strategic', pillarName: 'Strategic Advisory & Audits', keywords: ['martech', 'tools', 'stack', 'technology'] },
  { id: 'operations-0', title: 'CRM Implementation & Optimization', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['crm', 'hubspot', 'salesforce', 'implementation'] },
  { id: 'operations-1', title: 'Email Marketing (EDM) & Lifecycle Automation', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['email', 'automation', 'edm', 'lifecycle', 'newsletter'] },
  { id: 'operations-2', title: 'AI & Workflow Automation', pillar: 'operations', pillarName: 'Marketing Operations & Automation', keywords: ['automation', 'ai', 'workflow', 'zapier', 'integration'] },
  { id: 'performance-0', title: 'Advanced Tracking & Attribution', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['tracking', 'analytics', 'attribution', 'ga4', 'data'] },
  { id: 'performance-1', title: 'Paid Media Strategy & Management', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['paid', 'ads', 'google ads', 'facebook', 'ppc', 'advertising'] },
  { id: 'performance-2', title: 'Technical SEO & Search Authority', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['seo', 'search', 'ranking', 'organic', 'technical'] },
  { id: 'performance-3', title: 'Conversion Rate Optimization (CRO)', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['conversion', 'cro', 'optimization', 'testing', 'ab test'] },
  { id: 'performance-4', title: 'Analytics & Reporting', pillar: 'performance', pillarName: 'Performance Marketing & Analytics', keywords: ['analytics', 'reporting', 'dashboard', 'insights', 'metrics'] },
  { id: 'brand-0', title: 'Messaging Hierarchy & Core Narrative Development', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['messaging', 'brand', 'narrative', 'positioning', 'content'] },
  { id: 'brand-1', title: 'Social Media Strategy & Creative Direction', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['social', 'media', 'instagram', 'linkedin', 'twitter', 'content'] },
  { id: 'brand-2', title: 'Brand & Creative Assets Development', pillar: 'brand', pillarName: 'Brand & Content Enablement', keywords: ['brand', 'creative', 'design', 'assets', 'logo'] },
  { id: 'technical-0', title: 'Website Performance & Speed Optimization', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['performance', 'speed', 'optimization', 'website', 'core web vitals'] },
  { id: 'technical-1', title: 'Tracking & Data Integrity Cleanups', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['tracking', 'data', 'cleanup', 'integrity', 'tag manager'] },
  { id: 'technical-2', title: 'Broken Funnel & Conversion Path Diagnostics', pillar: 'technical', pillarName: 'Technical Fixes & Optimization', keywords: ['funnel', 'conversion', 'diagnostic', 'path', 'issue'] },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      const searchResults: SearchResult[] = SERVICES_DATA
        .filter((service) => {
          const titleMatch = service.title.toLowerCase().includes(lowerQuery);
          const pillarMatch = service.pillarName.toLowerCase().includes(lowerQuery);
          const keywordMatch = service.keywords.some(k => k.includes(lowerQuery));
          return titleMatch || pillarMatch || keywordMatch;
        })
        .map((service) => ({
          id: service.id,
          title: service.title,
          description: service.pillarName,
          pillar: service.pillar,
          url: `/services?pillar=${service.pillar}&service=${service.id}`,
        }));

      setResults(searchResults);
      
      const allKeywords = SERVICES_DATA.flatMap(s => s.keywords);
      const matchingSuggestions = allKeywords
        .filter(k => k.includes(lowerQuery) && k !== lowerQuery)
        .slice(0, 3);
      setSuggestions(matchingSuggestions);
      
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="container max-w-2xl mx-auto pt-20 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="glass-panel p-0 overflow-hidden animate-slide-in-down">
          <div className="flex items-center gap-3 p-4 md:p-6 border-b border-border/50">
            <Search className="w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search services (e.g., SEO, email, CRM, automation...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-foreground placeholder-foreground/50 outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {!query.trim() ? (
              <div className="p-6 text-center">
                <p className="text-foreground/60 mb-4">
                  Type to search for services. Try searching for:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['SEO', 'Email', 'CRM', 'Analytics', 'Automation', 'Design'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-border/30">
                {results.map((result) => (
                  <Link key={result.id} href={result.url} onClick={() => {
                    onClose();
                    window.scrollTo(0, 0);
                  }}>
                    <a className="block p-4 md:p-6 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-1">{result.title}</h3>
                      <p className="text-sm text-accent">{result.description}</p>
                    </a>
                  </Link>
                ))}
              </div>
            ) : isSearching ? (
              <div className="p-6 text-center">
                <Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" />
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-foreground/60 mb-4">No services found for "{query}"</p>
                {suggestions.length > 0 && (
                  <div>
                    <p className="text-sm text-foreground/50 mb-3">Did you mean:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setQuery(suggestion)}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
