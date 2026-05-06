import { useState } from 'react';
import { Search, Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663532599876/9u4P3ot5rXMeEQxrn76eMy/nudgewebsite_0d4b2e8a.png';

interface HeaderProps {
  onSearchOpen?: () => void;
  logoUrl?: string;
}

export default function Header({ onSearchOpen, logoUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Customer Success', href: '/testimonials' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex items-center justify-between h-20 md:h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
          <img src={LOGO_URL} alt="Nudge Digital" className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors">
                {link.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Search and CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => onSearchOpen?.()}
            className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-foreground/70" />
          </button>

          <Link href="/calculator" className="hidden sm:inline-flex">
            <Button variant="outline" className="text-sm">
              Savings Calculator
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

      {/* Marketplace Notification Panel - Right Side */}
      <div className="fixed top-20 md:top-24 right-3 md:right-4 z-40">
        <Link href="/services-marketplace">
          <div className="glass-card rounded-b-lg rounded-t-none border border-t-0 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-3 md:p-4 shadow-lg hover:shadow-xl hover:border-accent/50 transition-all cursor-pointer w-72 md:w-80 relative">
            <div className="absolute -top-3 right-4 w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent/20 flex-shrink-0">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-semibold text-foreground truncate">Browse Services Marketplace...</p>
                <p className="text-xs text-foreground/60 text-opacity-70">35+ services</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-in-down">
          <nav className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block py-2 text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
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
  );
}
