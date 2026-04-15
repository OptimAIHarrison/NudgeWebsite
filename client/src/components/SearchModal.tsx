import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'page' | 'resource';
  url: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Strategic Advisory & Audits',
          description: 'Comprehensive Digital Marketing Audit',
          category: 'service' as const,
          url: '/services',
        },
        {
          id: '2',
          title: 'CRM Implementation',
          description: 'Full CRM setup and customization',
          category: 'service' as const,
          url: '/services',
        },
      ].filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(mockResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="container max-w-2xl mx-auto pt-20 px-4">
        <div className="glass-panel p-0 overflow-hidden animate-slide-in-down">
          <div className="flex items-center gap-3 p-4 md:p-6 border-b border-border/50">
            <Search className="w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search services, pages, and resources..."
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
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-border/50">
                {results.map((result) => (
                  <Link key={result.id} href={result.url}>
                    <a
                      onClick={onClose}
                      className="p-4 md:p-6 hover:bg-accent/5 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                            {result.title}
                          </h3>
                          <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-accent/60 whitespace-nowrap capitalize">
                          {result.category}
                        </span>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="py-12 text-center">
                <p className="text-foreground/60">No results found</p>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-foreground/60">Start typing to search...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
