import { useState, useEffect } from 'react';
import { Search, Menu, X, ShoppingCart } from 'lucide-react';
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'How I Work', href: '/how-we-work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Results', href: '/testimonials' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b border-accent/15">
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
        <nav className="hidden lg:flex items-center gap-6">
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

          <Link href="/calculator" className="hidden xl:inline-flex">
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
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet navigation (hamburger) */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-background shadow-lg animate-slide-in-down max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block border-b border-border py-3.5 text-base font-medium text-foreground/80 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services-marketplace"
              className="block border-b border-border py-3.5 text-base font-medium text-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fixed Price Market Place
              <span className="ndot ndot-live ml-2 align-middle" aria-hidden />
            </Link>
            <Link
              href="/calculator"
              className="block border-b border-border py-3.5 text-base font-medium text-foreground/80 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Time-Saved Calculator
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="btn-nudge-primary w-full my-4">Send a Nudge</Button>
            </Link>
          </nav>
        </div>
      )}

      {/* Fixed Price Market Place: label tag hanging from the header, right side */}
      {!mobileMenuOpen && (
        <div className="container pointer-events-none absolute inset-x-0 top-full z-40">
         <div className="pointer-events-auto flex justify-end">
          <Link href="/services-marketplace" aria-label="Browse the Fixed Price Market Place: 40+ fixed-price packages">
            <div className="relative rounded-b-lg rounded-t-none border border-t-0 border-accent/40 bg-gradient-to-br from-[#f8f1fd]/80 to-[#eadcf7]/75 p-3 pr-9 shadow-xl backdrop-blur-md transition-all hover:border-accent hover:from-[#f8f1fd]/95 hover:to-[#eadcf7]/90 hover:shadow-2xl md:p-4 md:pr-10">
              <span className="ndot absolute right-3 top-3" aria-hidden />
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0 rounded-lg bg-accent/20 p-1.5">
                  <ShoppingCart className="h-4 w-4 text-accent md:h-5 md:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground md:text-sm">Fixed Price Market Place</p>
                  <p className="text-xs text-foreground/60">40+ fixed-price packages</p>
                </div>
              </div>
            </div>
          </Link>
         </div>
        </div>
      )}
    </header>
      <SearchModal isOpen={ownSearchOpen} onClose={() => setOwnSearchOpen(false)} />
    </>
  );
}
