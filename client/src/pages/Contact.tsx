import { useState } from 'react';
import PageHero from '@/components/PageHero';
import { Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

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
    "Strategy & Go-To-Market",
    "Marketing Ops & Automation",
    "Performance Marketing & Analytics",
    "Brand & Content",
    "Technical Fixes",
    "Fractional CMO",
    "Not sure yet",
  ];

  const contactMutation = trpc.contact.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData, {
      onSuccess: (result) => {
        if (result.success) {
          alert('Thanks for sending a nudge! I will get back to you shortly.');
          setFormData({ name: '', email: '', company: '', service: '', message: '' });
        } else {
          alert('Failed to send message. Please try again.');
        }
      },
      onError: () => {
        alert('Error sending message. Please try again.');
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <PageHero
        eyebrow={"Get in touch"}
        title={"Send a Nudge"}
        sub={"Tell me what you are building and what is stuck. I will reply within 24 hours with a plan, a fixed price and a timeline."}
      />

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
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-foreground/60">Melbourne, Australia</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h4 className="font-semibold text-foreground mb-3">Response Time</h4>
                <p className="text-sm text-foreground/60">
                  I typically reply to nudges within 24 business hours.
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
                    Tell me about your challenge
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="glass-input w-full resize-none"
                    placeholder="Tell me about your product, your stage and what you need help with..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="btn-nudge-primary w-full"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send a Nudge'}
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
                <h3 className="font-semibold text-foreground mb-1">I Review Your Nudge</h3>
                <p className="text-foreground/60">
                  I read your message carefully and understand your specific challenge.
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
                <h3 className="font-semibold text-foreground mb-1">I Respond with a Plan</h3>
                <p className="text-foreground/60">
                  Within 24 hours, I send back a clear plan, pricing, and next steps.
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
                  Once you sign off, I jump in and deliver results. Fast, focused, and without fluff.
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
