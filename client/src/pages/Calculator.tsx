import { useState } from 'react';
import { Check, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Calculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    {
      id: 'hourly',
      name: 'Hourly Fixes & Quick Work',
      nudgeRate: 150,
      ftEmployeeCost: 85,
      agencyCost: 250,
      description: 'Technical fixes, audits, quick optimizations'
    },
    {
      id: 'project',
      name: 'Project-Based Work',
      nudgeRate: 12500,
      ftEmployeeCost: 18000,
      agencyCost: 35000,
      description: 'CRM setup, website audits, automation implementation'
    },
    {
      id: 'strategy',
      name: 'Strategy Services',
      nudgeRate: 5500,
      ftEmployeeCost: 8000,
      agencyCost: 15000,
      description: 'Digital marketing audit, growth strategy, roadmap'
    },
    {
      id: 'retainer',
      name: 'Monthly Retainer',
      nudgeRate: 7000,
      ftEmployeeCost: 12000,
      agencyCost: 25000,
      description: 'Ongoing strategic leadership and implementation'
    }
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateSavings = () => {
    let nudgeTotal = 0;
    let ftEmployeeTotal = 0;
    let agencyTotal = 0;

    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        nudgeTotal += service.nudgeRate;
        ftEmployeeTotal += service.ftEmployeeCost;
        agencyTotal += service.agencyCost;
      }
    });

    return {
      nudgeTotal,
      ftEmployeeTotal,
      agencyTotal,
      savingsVsFT: ftEmployeeTotal - nudgeTotal,
      savingsVsAgency: agencyTotal - nudgeTotal
    };
  };

  const savings = calculateSavings();
  const hasSelected = selectedServices.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header */}
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Calculate Your Savings
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
            See how much you'll save by working with me instead of hiring full-time or engaging an agency.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 md:py-32">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Services Selection */}
            <div className="md:col-span-1">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Select Services</h2>
                <div className="space-y-4">
                  {services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedServices.includes(service.id)
                          ? 'border-accent bg-accent/10'
                          : 'border-border bg-background hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          selectedServices.includes(service.id)
                            ? 'bg-accent border-accent'
                            : 'border-border'
                        }`}>
                          {selectedServices.includes(service.id) && (
                            <Check className="w-4 h-4 text-background" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{service.name}</h3>
                          <p className="text-sm text-foreground/60">{service.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparison Results */}
            <div className="md:col-span-2">
              {!hasSelected ? (
                <div className="glass-card p-12 text-center">
                  <TrendingUp className="w-16 h-16 text-accent/30 mx-auto mb-4" />
                  <p className="text-lg text-foreground/60">
                    Select services above to see your savings
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cost Comparison */}
                  <div className="glass-card p-8">
                    <h3 className="text-xl font-bold text-foreground mb-6">Cost Comparison</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/30">
                        <div>
                          <p className="text-sm text-foreground/60">Nudge Digital</p>
                          <p className="text-2xl font-bold text-accent">${savings.nudgeTotal.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-accent font-semibold">BEST VALUE</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-border">
                        <div>
                          <p className="text-sm text-foreground/60">Full-Time Employee</p>
                          <p className="text-2xl font-bold text-foreground">${savings.ftEmployeeTotal.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-foreground/60">+ Overhead</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-foreground/5 rounded-lg border border-border">
                        <div>
                          <p className="text-sm text-foreground/60">Traditional Agency</p>
                          <p className="text-2xl font-bold text-foreground">${savings.agencyTotal.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-foreground/60">+ Markup</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Breakdown */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-card p-8 border-2 border-accent/30">
                      <h4 className="text-lg font-semibold text-foreground mb-2">vs Full-Time Employee</h4>
                      <p className="text-4xl font-bold text-accent mb-2">
                        ${savings.savingsVsFT.toLocaleString()}
                      </p>
                      <p className="text-sm text-foreground/60">
                        Save {Math.round((savings.savingsVsFT / savings.ftEmployeeTotal) * 100)}% compared to hiring full-time
                      </p>
                    </div>

                    <div className="glass-card p-8 border-2 border-accent/30">
                      <h4 className="text-lg font-semibold text-foreground mb-2">vs Traditional Agency</h4>
                      <p className="text-4xl font-bold text-accent mb-2">
                        ${savings.savingsVsAgency.toLocaleString()}
                      </p>
                      <p className="text-sm text-foreground/60">
                        Save {Math.round((savings.savingsVsAgency / savings.agencyTotal) * 100)}% compared to agencies
                      </p>
                    </div>
                  </div>

                  {/* Why Nudge Wins */}
                  <div className="glass-card p-8 bg-accent/5 border border-accent/20">
                    <h4 className="font-semibold text-foreground mb-4">Why Nudge Digital Wins</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-foreground/80">No overhead costs or employee benefits</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-foreground/80">Direct access to expertise without agency markup</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-foreground/80">Flexible engagement - pay only for what you need</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-foreground/80">Senior-level strategy without junior team overhead</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          {hasSelected && (
            <div className="text-center">
              <p className="text-lg text-foreground/70 mb-6">
                Ready to start saving? Let's discuss how I can help.
              </p>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <Button className="btn-nudge-primary text-lg px-8 py-6">
                  Send a Nudge
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
