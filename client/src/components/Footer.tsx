import { Link } from 'wouter';
import { Linkedin, Twitter, Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: 'Strategic Advisory', href: '/services#strategic-advisory' },
      { label: 'Marketing Operations', href: '/services#marketing-operations' },
      { label: 'Performance Marketing', href: '/services#performance-marketing' },
      { label: 'Brand & Content', href: '/services#brand-content' },
      { label: 'Technical Fixes', href: '/services#technical-fixes' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'How We Work', href: '/how-we-work' },
      { label: 'Resources', href: '/resources' },
      { label: 'Client Success', href: '/testimonials' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <svg width="130" height="26" viewBox="0 0 130 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NUDGE">
                <circle cx="13" cy="13" r="8" fill="#8040B2"/>
                <text
                  x="27"
                  y="13"
                  fill="currentColor"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', sans-serif"
                  fontWeight="800"
                  fontSize="22"
                  letterSpacing="1.5"
                  dominantBaseline="central"
                >NUDGE</text>
              </svg>
            </div>
            <p className="text-sm text-foreground/60 mb-4">
              Your Digital Marketing Strategist & Implementer
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-foreground/60 hover:text-accent" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-foreground mb-4 text-sm">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => window.scrollTo(0, 0)}>
                      <a className="text-sm text-foreground/60 hover:text-accent transition-colors">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@nudgedigital.com.au"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@nudgedigital.com.au
              </a>
              <a
                href="tel:+61400000000"
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                +61 (0) 400 000 000
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} Nudge Digital. All rights reserved.
          </p>
          <Link href="/contact">
            <a className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
              Send a Nudge
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
