import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Calculator() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoursPerWeek, setHoursPerWeek] = useState(20);
  const [monthlyAgencyCost, setMonthlyAgencyCost] = useState(5000);

  const annualFullTimeCost = hoursPerWeek * 52 * 85; // $85/hour average
  const annualAgencyCost = monthlyAgencyCost * 12;
  const nudgeRetainerCost = 8000 * 12; // $8000/month average

  const annualSavingsVsFullTime = annualFullTimeCost - nudgeRetainerCost;
  const annualSavingsVsAgency = annualAgencyCost - nudgeRetainerCost;

  return (
    <div className="min-h-screen bg-background">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Time & Cost Savings Calculator
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl">
            See how much time and money you can save by working with Nudge Digital instead of hiring full-time or using traditional agencies.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sliders */}
            <div className="space-y-8">
              <div className="glass-panel p-8">
                <h3 className="text-2xl font-bold text-foreground mb-8">Adjust Your Scenario</h3>

                <div className="space-y-8">
                  {/* Full-Time Employee Slider */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4">
                      Hours per week for full-time employee: <span className="text-accent">{hoursPerWeek}h</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                      className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-2">
                      <span>5h</span>
                      <span>40h</span>
                    </div>
                  </div>

                  {/* Agency Cost Slider */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4">
                      Monthly agency cost: <span className="text-accent">${monthlyAgencyCost.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min="2000"
                      max="20000"
                      step="500"
                      value={monthlyAgencyCost}
                      onChange={(e) => setMonthlyAgencyCost(Number(e.target.value))}
                      className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-foreground/60 mt-2">
                      <span>$2,000</span>
                      <span>$20,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {/* Full-Time Comparison */}
              <div className="glass-card">
                <h4 className="text-lg font-bold text-foreground mb-4">vs. Full-Time Employee</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Annual Full-Time Cost</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${annualFullTimeCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-foreground/60 mb-1">Nudge Digital Annual Cost</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${nudgeRetainerCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <p className="text-sm font-semibold text-accent">Annual Savings</p>
                    </div>
                    <p className="text-3xl font-bold text-accent">
                      ${Math.max(0, annualSavingsVsFullTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agency Comparison */}
              <div className="glass-card">
                <h4 className="text-lg font-bold text-foreground mb-4">vs. Traditional Agency</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Annual Agency Cost</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${annualAgencyCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-foreground/60 mb-1">Nudge Digital Annual Cost</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${nudgeRetainerCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <p className="text-sm font-semibold text-accent">Annual Savings</p>
                    </div>
                    <p className="text-3xl font-bold text-accent">
                      ${Math.max(0, annualSavingsVsAgency).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why Nudge Digital?</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Expert Execution</h3>
                <p className="text-foreground/60">
                  Senior-level expertise without the overhead of a full-time employee.
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
                <h3 className="font-semibold text-foreground mb-1">Specialized Skills</h3>
                <p className="text-foreground/60">
                  Technical expertise that most agencies do not have.
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
                <h3 className="font-semibold text-foreground mb-1">Fast Turnaround</h3>
                <p className="text-foreground/60">
                  Quick execution and rapid problem-solving without bureaucracy.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Measurable Results</h3>
                <p className="text-foreground/60">
                  We focus on outcomes, not hours worked or tasks completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to See Your Savings?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let us discuss your specific situation and create a custom proposal.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-accent hover:bg-white/90 px-8 py-3 rounded-lg font-semibold">
              Send a Nudge
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
