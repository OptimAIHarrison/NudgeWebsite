import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  const services = [
    'Strategic Advisory & Audits',
    'Marketing Operations & Automation',
    'Performance Marketing & Analytics',
    'Brand & Content Enablement',
    'Technical Fixes & Optimization',
    'Not sure - let us recommend',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for sending us a nudge! We will get back to you shortly.');
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Send a Nudge
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            Tell us about your digital marketing challenges. We will respond with a clear plan and pricing.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href="mailto:hello@nudgedigital.com.au" className="text-accent hover:underline">
                        hello@nudgedigital.com.au
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href="tel:+61400000000" className="text-accent hover:underline">
                        +61 (0) 400 000 000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-foreground/60">Sydney, Australia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h4 className="font-semibold text-foreground mb-3">Response Time</h4>
                <p className="text-sm text-foreground/60">
                  We typically respond to nudges within 24 business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="glass-input w-full"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="glass-input w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="glass-input w-full"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What service are you interested in?
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="glass-input w-full"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell us about your challenge
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="glass-input w-full resize-none"
                    placeholder="Describe what you need help with..."
                  />
                </div>

                <Button type="submit" className="btn-nudge-primary w-full">
                  Send a Nudge
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">What Happens Next?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">We Review Your Nudge</h3>
                <p className="text-foreground/60">
                  We read your message carefully and understand your specific challenge.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">We Respond with a Plan</h3>
                <p className="text-foreground/60">
                  Within 24 hours, we send back a clear plan, pricing, and next steps.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Let's Get to Work</h3>
                <p className="text-foreground/60">
                  Once you sign off, we jump in and deliver results. Fast, focused, and without fluff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
