import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const concerns = [
  'Acne',
  'Cold & Flu',
  'Headache',
  'Stomach Issues',
  'Allergies',
  'Back Pain',
];

const CommonConcerns: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 font-recoleta text-foreground">Common Health Concerns</h2>
        <p className="text-muted-foreground mb-8">Find the right doctor for your symptoms.</p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {concerns.map(concern => (
            <Button key={concern} variant="outline" asChild className="rounded-full">
              <Link to={`/search?q=${concern}`}>{concern}</Link>
            </Button>
          ))}
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary">
          See all symptoms
        </Button>
      </div>
    </section>
  );
};

export default CommonConcerns;