import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getSpecialties } from '@/services/localApi';

const PopularSearches: React.FC = () => {
  const specialties = getSpecialties();
  const popularNames = ["Dermatology", "Pediatrics", "Cardiology", "Neurology"];
  const popularSpecialties = specialties.filter(s => popularNames.includes(s.name));

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 font-recoleta text-foreground">Popular Searches</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {popularSpecialties.map(spec => (
            <Button key={spec.id} variant="secondary" size="lg" asChild className="rounded-full">
              <Link to={`/search?q=${spec.name}`}>{spec.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;