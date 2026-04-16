import { useState } from 'react';
import { TrendingUp, Users, Zap, DollarSign, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name: string;
  avgHoursPerMonth: number;
  nudgeRate: number; // AUD per hour
}

const SERVICES: Service[] = [
  { id: 'seo', name: 'SEO & Technical Optimization', avgHoursPerMonth: 40, nudgeRate: 75 },
  { id: 'ppc', name: 'Paid Media Management', avgHoursPerMonth: 30, nudgeRate: 75 },
  { id: 'email', name: 'Email Marketing & Automation', avgHoursPerMonth: 25, nudgeRate: 75 },
  { id: 'analytics', name: 'Analytics & Reporting', avgHoursPerMonth: 20, nudgeRate: 75 },
  { id: 'crm', name: 'CRM Setup & Optimization', avgHoursPerMonth: 35, nudgeRate: 75 },
  { id: 'strategy', name: 'Strategic Planning', avgHoursPerMonth: 15, nudgeRate: 85 },
  { id: 'content', name: 'Content & Social Strategy', avgHoursPerMonth: 30, nudgeRate: 75 },
];

export default function Calculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['seo', 'ppc']);
  const [comparisonType, setComparisonType] = useState<'fulltime' | 'agency'>('fulltime');
  const [monthlyBudget, setMonthlyBudget] = useState(5000);
  const [hoursNeeded, setHoursNeeded] = useState(100);

  // Calculate Nudge Digital cost
  const nudgeServices = SERVICES.filter(s => selectedServices.includes(s.id));
  const nudgeTotalHours = nudgeServices.reduce((sum, s) => sum + s.avgHoursPerMonth, 0);
  const nudgeCost = nudgeServices.reduce((sum, s) => sum + (s.avgHoursPerMonth * s.nudgeRate), 0);

  // Full-time hire costs (AUD)
  const ftSalary = 75000; // Average annual salary for marketing specialist
  const ftOverhead = ftSalary * 0.3; // Overhead (benefits, equipment, etc.)
  const ftTotalAnnual = ftSalary + ftOverhead;
  const ftMonthlyCost = ftTotalAnnual / 12;
  const ftHoursPerMonth = 160; // ~40 hours/week

  // Agency costs (typically 3-5x more expensive)
  const agencyMarkup = 3.5; // Average agency markup
  const agencyCost = nudgeCost * agencyMarkup;

  // Calculate savings
  const comparisonCost = comparisonType === 'fulltime' ? ftMonthlyCost : agencyCost;
  const savings = comparisonCost - nudgeCost;
  const savingsPercent = ((savings / comparisonCost) * 100).toFixed(1);
  const annualSavings = savings * 12;

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header Section */}
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Savings Calculator
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            See how much you can save by working with Nudge Digital instead of hiring full-time or using an agency
          </p>
        </div>
      </section>

      {/* Main Calculator */}
      <main className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Service Selection & Options */}
          <div className="space-y-8">
            {/* Services Selection */}
            <div className="glass-card p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Select Services</h2>
                <p className="text-foreground/60 text-sm">Choose the services you need</p>
              </div>

              <div className="space-y-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedServices.includes(service.id)
                        ? 'bg-accent/10 border-accent'
                        : 'bg-secondary/30 border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-foreground">{service.name}</div>
                        <div className="text-sm text-foreground/60 mt-1">
                          ~{service.avgHoursPerMonth}h/month @ ${service.nudgeRate}/h
                        </div>
                      </div>
                      {selectedServices.includes(service.id) && (
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {selectedServices.length === 0 && (
                <div className="p-4 bg-accent/5 border border-accent/30 rounded-lg">
                  <p className="text-sm text-foreground/70">Select at least one service to see savings</p>
                </div>
              )}
            </div>

            {/* Comparison Type */}
            <div className="glass-card p-8 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Compare Against</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: comparisonType === 'fulltime' ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: comparisonType === 'fulltime' ? 'rgba(var(--accent-rgb), 0.05)' : 'transparent'
                }}>
                  <input
                    type="radio"
                    name="comparison"
                    value="fulltime"
                    checked={comparisonType === 'fulltime'}
                    onChange={(e) => setComparisonType(e.target.value as 'fulltime' | 'agency')}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground">Full-Time Hire</div>
                    <div className="text-sm text-foreground/60">${(ftMonthlyCost / 1000).toFixed(1)}k/month</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all" style={{
                  borderColor: comparisonType === 'agency' ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: comparisonType === 'agency' ? 'rgba(var(--accent-rgb), 0.05)' : 'transparent'
                }}>
                  <input
                    type="radio"
                    name="comparison"
                    value="agency"
                    checked={comparisonType === 'agency'}
                    onChange={(e) => setComparisonType(e.target.value as 'fulltime' | 'agency')}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground">Agency</div>
                    <div className="text-sm text-foreground/60">${(agencyCost / 1000).toFixed(1)}k/month</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="space-y-8">
            {/* Nudge Digital Cost */}
            <div className="glass-card p-8 bg-accent/5 border border-accent/30 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Nudge Digital</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Monthly Cost</div>
                  <div className="text-4xl font-bold text-accent">${nudgeCost.toFixed(0)}</div>
                </div>

                <div className="pt-4 border-t border-accent/20">
                  <div className="text-sm text-foreground/60 mb-1">Total Hours</div>
                  <div className="text-2xl font-bold text-foreground">{nudgeTotalHours} hours/month</div>
                </div>

                <div className="pt-4 border-t border-accent/20">
                  <div className="text-sm text-foreground/60 mb-1">Cost Per Hour</div>
                  <div className="text-2xl font-bold text-foreground">${(nudgeCost / nudgeTotalHours).toFixed(0)}/h</div>
                </div>

                <div className="pt-4 border-t border-accent/20 space-y-2">
                  <div className="text-sm font-semibold text-foreground">Why Nudge Wins:</div>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>No long-term contracts or commitments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>Scale up or down as needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>No overhead costs or benefits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>Expert fractional strategist</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            {selectedServices.length > 0 && (
              <div className="glass-card p-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 space-y-6">
                <div className="text-center">
                  <div className="text-sm text-foreground/60 mb-2">You Save</div>
                  <div className="text-5xl font-bold text-accent mb-2">${savings.toFixed(0)}</div>
                  <div className="text-lg text-foreground font-semibold">per month</div>
                </div>

                <div className="pt-6 border-t border-accent/20 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-foreground/60 mb-1">Annual Savings</div>
                    <div className="text-2xl font-bold text-accent">${(annualSavings / 1000).toFixed(0)}k</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-foreground/60 mb-1">Savings %</div>
                    <div className="text-2xl font-bold text-accent">{savingsPercent}%</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-accent/20">
                  <p className="text-sm text-foreground/70 mb-4">
                    By choosing Nudge Digital over a {comparisonType === 'fulltime' ? 'full-time hire' : 'traditional agency'}, you save <strong>${savings.toFixed(0)}/month</strong> while getting expert fractional marketing support.
                  </p>
                </div>
              </div>
            )}

            {/* CTA */}
            <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-nudge-primary w-full text-lg px-8 py-6">
                Send a Nudge - Let's Discuss
              </Button>
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        {selectedServices.length > 0 && (
          <div className="glass-card p-8 overflow-x-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">Detailed Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metric</th>
                  <th className="text-center py-3 px-4 font-semibold text-accent">Nudge Digital</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground/60">
                    {comparisonType === 'fulltime' ? 'Full-Time Hire' : 'Agency'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">Monthly Cost</td>
                  <td className="text-center py-3 px-4 font-semibold text-accent">${nudgeCost.toFixed(0)}</td>
                  <td className="text-center py-3 px-4 text-foreground/70">${comparisonCost.toFixed(0)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">Annual Cost</td>
                  <td className="text-center py-3 px-4 font-semibold text-accent">${(nudgeCost * 12).toFixed(0)}</td>
                  <td className="text-center py-3 px-4 text-foreground/70">${(comparisonCost * 12).toFixed(0)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">Hours Per Month</td>
                  <td className="text-center py-3 px-4 font-semibold text-accent">{nudgeTotalHours}h</td>
                  <td className="text-center py-3 px-4 text-foreground/70">{comparisonType === 'fulltime' ? '160h' : `${(agencyCost / 75).toFixed(0)}h`}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">Cost Per Hour</td>
                  <td className="text-center py-3 px-4 font-semibold text-accent">${(nudgeCost / nudgeTotalHours).toFixed(0)}</td>
                  <td className="text-center py-3 px-4 text-foreground/70">${(comparisonCost / (comparisonType === 'fulltime' ? 160 : (agencyCost / 75))).toFixed(0)}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">Setup Time</td>
                  <td className="text-center py-3 px-4 font-semibold text-accent">1 week</td>
                  <td className="text-center py-3 px-4 text-foreground/70">{comparisonType === 'fulltime' ? '4-6 weeks' : '2-3 weeks'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-foreground">Flexibility</td>
                  <td className="text-center py-3 px-4 font-semibold text-accent">High</td>
                  <td className="text-center py-3 px-4 text-foreground/70">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-foreground">Fractional Expertise</h3>
            <p className="text-sm text-foreground/70">Get expert marketing strategy without the full-time salary</p>
          </div>

          <div className="glass-card p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-foreground">Predictable Costs</h3>
            <p className="text-sm text-foreground/70">No surprises, no overhead, just transparent hourly rates</p>
          </div>

          <div className="glass-card p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-foreground">Scale On Demand</h3>
            <p className="text-sm text-foreground/70">Increase or decrease hours based on your business needs</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
