import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const insuranceLogos = [
  'Aetna', 'BlueCross', 'Cigna', 'UnitedHealthcare', 'Humana', 'Kaiser Permanente'
];

const InsuranceSection: React.FC = () => {
  return (
    <section className="py-12 bg-light-grey rounded-2xl">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold font-recoleta text-foreground mb-4">Find an In-Network Doctor</h2>
        <p className="text-lg text-muted-foreground mb-8 font-averta">
          We partner with the nation's top insurance providers to make your care more accessible.
        </p>
        <div className="flex justify-center items-center max-w-2xl mx-auto mb-8">
          <Input placeholder="Enter your insurance provider" className="rounded-r-none" />
          <Button className="rounded-l-none">Search</Button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {insuranceLogos.map(logo => (
            <span key={logo} className="text-muted-foreground font-semibold text-lg">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;