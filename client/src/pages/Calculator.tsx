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
  const [ftSalarySlider, setFtSalarySlider] = useState(75000);
  const [agencyMonthlySlider, setAgencyMonthlySlider] = useState(10000);

  // Calculate Nudge Digital cost
  const nudgeServices = SERVICES.filter(s => selectedServices.includes(s.id));
  const nudgeTotalHours = nudgeServices.reduce((sum, s) => sum + s.avgHoursPerMonth, 0);
  const nudgeCost = nudgeServices.reduce((sum, s) => sum + (s.avgHoursPerMonth * s.nudgeRate), 0);

  // Full-time hire costs (AUD) - using slider value
  const ftSalary = ftSalarySlider;
  const ftOverhead = ftSalary * 0.3;
  const ftTotalAnnual = ftSalary + ftOverhead;
  const ftMonthlyCost = ftTotalAnnual / 12;
  const ftHoursPerMonth = 160;

  // Agency costs - using slider value
  const agencyCost = agencyMonthlySlider;

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
      <main className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
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

              {/* Comparison Type with Sliders */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-lg font-bold text-foreground">Compare Against</h3>
                <div className="space-y-4">
                  {/* Full-Time Option */}
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
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Full-Time Hire</div>
                      <div className="text-sm text-foreground/60">${(ftMonthlyCost / 1000).toFixed(1)}k/month</div>
                    </div>
                  </label>

                  {comparisonType === 'fulltime' && (
                    <div className="space-y-3 pl-7 border-l-2 border-accent/30">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Annual Salary</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="40000"
                            max="150000"
                            step="5000"
                            value={ftSalarySlider}
                            onChange={(e) => setFtSalarySlider(Number(e.target.value))}
                            className="flex-1 h-2 bg-secondary/50 rounded-lg appearance-none cursor-pointer accent-accent"
                          />
                          <div className="text-sm font-semibold text-accent min-w-fit">${(ftSalarySlider / 1000).toFixed(0)}k</div>
                        </div>
                        <div className="text-xs text-foreground/50 mt-2">Range: $40k - $150k</div>
                        <div className="text-xs text-foreground/60 mt-1">
                          Monthly: ${(ftMonthlyCost / 1000).toFixed(1)}k (includes 30% overhead)
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Agency Option */}
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
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Agency</div>
                      <div className="text-sm text-foreground/60">${(agencyCost / 1000).toFixed(1)}k/month</div>
                    </div>
                  </label>

                  {comparisonType === 'agency' && (
                    <div className="space-y-3 pl-7 border-l-2 border-accent/30">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Monthly Spend</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="3000"
                            max="50000"
                            step="1000"
                            value={agencyMonthlySlider}
                            onChange={(e) => setAgencyMonthlySlider(Number(e.target.value))}
                            className="flex-1 h-2 bg-secondary/50 rounded-lg appearance-none cursor-pointer accent-accent"
                          />
                          <div className="text-sm font-semibold text-accent min-w-fit">${(agencyMonthlySlider / 1000).toFixed(1)}k</div>
                        </div>
                        <div className="text-xs text-foreground/50 mt-2">Range: $3k - $50k</div>
                      </div>
                    </div>
                  )}
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
        </div>

        {/* Editable Settings */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
          <details className="glass-card p-6">
            <summary className="cursor-pointer font-bold text-foreground text-lg hover:text-accent transition-colors">⚙️ Edit Calculator Numbers</summary>
            <div className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground mb-4">Full-Time Hire Costs</h3>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Default Annual Salary (AUD)</label>
                    <input type="number" defaultValue="75000" className="w-full px-3 py-2 bg-secondary/50 border border-border rounded text-foreground" disabled />
                    <p className="text-xs text-foreground/60 mt-1">Edit in code: line 37</p>
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Overhead % (benefits, equipment)</label>
                    <input type="number" defaultValue="30" className="w-full px-3 py-2 bg-secondary/50 border border-border rounded text-foreground" disabled />
                    <p className="text-xs text-foreground/60 mt-1">Edit in code: line 38 (0.3 = 30%)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground mb-4">Agency Comparison</h3>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Default Monthly Spend</label>
                    <input type="number" defaultValue="10000" className="w-full px-3 py-2 bg-secondary/50 border border-border rounded text-foreground" disabled />
                    <p className="text-xs text-foreground/60 mt-1">Edit in code: line 29</p>
                  </div>
                  <div>
                    <label className="block text-sm text-foreground/70 mb-2">Your Hourly Rates</label>
                    <p className="text-xs text-foreground/60">Edit service rates in code: lines 16-22</p>
                    <p className="text-xs text-foreground/50 mt-2">Standard: $75/h | Strategy: $85/h</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground/70 mb-3"><strong>To edit these numbers:</strong></p>
                <ol className="text-sm text-foreground/70 space-y-2 list-decimal list-inside">
                  <li>Go to: <code className="bg-secondary/50 px-2 py-1 rounded text-xs">client/src/pages/Calculator.tsx</code></li>
                  <li>Find the line numbers shown above</li>
                  <li>Update the values</li>
                  <li>Save and commit to GitHub</li>
                </ol>
              </div>
            </div>
          </details>
        </div>

        {/* Comparison Table */}
        {selectedServices.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 md:px-8">
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
          </div>
        )}

        {/* How It Works */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 grid md:grid-cols-3 gap-6">
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
