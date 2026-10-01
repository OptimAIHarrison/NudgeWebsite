import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';


interface HeaderProps {
  onSearchOpen?: () => void;
  logoUrl?: string;
}

export default function Header({ onSearchOpen, logoUrl }: HeaderProps) {
  // Pages can pass their own handler; otherwise the header opens its own panel so search works everywhere.
  const [ownSearchOpen, setOwnSearchOpen] = useState(false);
  const openSearch = () => (onSearchOpen ? onSearchOpen() : setOwnSearchOpen(true));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'How I Work', href: '/how-we-work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Results', href: '/testimonials' },
    { label: 'About', href: '/about' },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
          <svg width="190" height="36" viewBox="0 0 190 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NUDGE">
            <circle cx="18" cy="18" r="11" fill="#8040B2"/>
            <text
              x="36"
              y="18"
              fill="currentColor"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif"
              fontWeight="800"
              fontSize="30"
              letterSpacing="2"
              dominantBaseline="central"
            >NUDGE</text>
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search and CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={openSearch}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-foreground/70" />
          </button>

          <Link href="/calculator" className="hidden sm:inline-flex">
            <Button variant="outline" className="text-sm">
              Time-Saved Calculator
            </Button>
          </Link>

          <Link href="/contact">
            <Button className="btn-nudge-primary hidden sm:inline-flex">
              Send a Nudge
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-in-down">
          <nav className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button className="btn-nudge-primary w-full mt-4">
                Send a Nudge
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
      <SearchModal isOpen={ownSearchOpen} onClose={() => setOwnSearchOpen(false)} />
    </>
  );
}
