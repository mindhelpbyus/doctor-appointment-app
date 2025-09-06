import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, CalendarCheck, MessageCircle, DollarSign } from 'lucide-react';

const StaffManagementFeaturePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">Efficient Staff Management with Medixy</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        Empower your team with tools designed to enhance collaboration, streamline workflows, and boost overall productivity within your practice.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Key Staff Management Features</h2>
          <ul className="space-y-4 text-lg text-muted-foreground font-averta">
            <li className="flex items-start gap-3">
              <CalendarCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Intuitive staff scheduling and shift management to ensure optimal coverage.</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Secure internal communication tools for seamless team collaboration.</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Performance tracking and review functionalities to support staff development.</span>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Integrated payroll features to simplify compensation and benefits administration.</span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1504805572947-34fd45f1d088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Staff Collaboration"
            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">Ready to Empower Your Team?</h2>
        <Button asChild size="lg" variant="custom-primary">
          <Link to="/onboard-provider">Manage Your Staff with Medixy</Link>
        </Button>
      </div>
    </div>
  );
};

export default StaffManagementFeaturePage;