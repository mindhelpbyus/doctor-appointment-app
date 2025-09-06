import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Users, BellRing } from 'lucide-react';

const SchedulingFeaturePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">Effortless Scheduling with Medixy</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        Our advanced scheduling system simplifies appointment management for your entire practice, ensuring seamless operations and improved patient experience.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Key Scheduling Features</h2>
          <ul className="space-y-4 text-lg text-muted-foreground font-averta">
            <li className="flex items-start gap-3">
              <CalendarDays className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Real-time updates across all devices, keeping your entire team coordinated.</span>
            </li>
            <li className="flex items-start gap-3">
              <BellRing className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Automated appointment reminders via email and SMS to reduce no-shows.</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Flexible booking options for various appointment types and durations.</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Multi-provider calendar views for easy staff and resource allocation.</span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/scheduling-interface.jpg"
            alt="Scheduling Interface"
            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">Ready to Simplify Your Schedule?</h2>
        <Button asChild size="lg" variant="custom-primary">
          <Link to="/onboard-provider">Get Started with Medixy</Link>
        </Button>
      </div>
    </div>
  );
};

export default SchedulingFeaturePage;