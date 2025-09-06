import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stethoscope } from 'lucide-react';
import { getSpecialties } from '@/services/localApi';

const SpecialtiesOverview: React.FC = () => {
  const specialtiesCount = getSpecialties().length;

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <Card className="bg-primary text-primary-foreground text-center p-8 rounded-2xl">
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Stethoscope className="h-16 w-16" />
            <div>
              <h3 className="text-4xl font-bold font-recoleta">{specialtiesCount}+ Specialties</h3>
              <p className="text-lg text-primary-foreground/80">Consult with top doctors across all specialities.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SpecialtiesOverview;