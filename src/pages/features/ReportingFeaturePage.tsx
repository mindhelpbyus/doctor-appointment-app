import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart2, TrendingUp, Users, DollarSign } from 'lucide-react';

const ReportingFeaturePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">Data-Driven Reporting & Analytics with Docsy</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        Gain valuable insights into your practice's performance with comprehensive reports, enabling you to make smart, informed decisions backed by best-in-class analytics.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="flex justify-center order-2 md:order-1">
          <img
            src="/images/data-analytics.jpg"
            alt="Data Analytics Dashboard"
            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Key Reporting Features</h2>
          <ul className="space-y-4 text-lg text-muted-foreground font-averta">
            <li className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Detailed revenue tracking and financial performance reports.</span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Appointment trends and patient flow analysis to optimize operations.</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Patient demographics and engagement metrics for targeted outreach.</span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Customizable dashboards to visualize your most critical metrics at a glance.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">Ready for Smarter Insights?</h2>
        <Button asChild size="lg" variant="custom-primary">
          <Link to="/onboard-provider">Unlock Your Data</Link>
        </Button>
      </div>
    </div>
  );
};

export default ReportingFeaturePage;