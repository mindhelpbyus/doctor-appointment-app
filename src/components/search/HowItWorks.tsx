import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, CalendarCheck, Video } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: '1. Find Your Doctor',
    description: 'Search by specialty, location, or name to find the perfect provider for your needs.',
  },
  {
    icon: CalendarCheck,
    title: '2. Book an Appointment',
    description: 'Select a convenient time slot from the doctor\'s real-time availability and book instantly.',
  },
  {
    icon: Video,
    title: '3. Start Your Consultation',
    description: 'Connect with your doctor for an in-person or video consultation to get the care you need.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 bg-light-grey rounded-2xl">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 font-recoleta text-foreground">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-none shadow-subtle bg-background">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-averta font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;