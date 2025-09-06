import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Specialty } from '@/data/specialties';

interface SpecialtyCardProps {
  specialty: Specialty;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ specialty }) => {
  const Icon = specialty.icon;
  return (
    <Link to={`/search?q=${specialty.name}`} className="block hover:no-underline">
      <Card className="h-full flex flex-col items-center justify-center p-6 text-center rounded-2xl shadow-subtle hover:shadow-medium hover:border-primary hover:scale-[1.02] transition-all duration-300 bg-background border-none"> {/* Enhanced card styling */}
        <Icon className="h-14 w-14 mb-4 text-primary" /> {/* Larger icon */}
        <CardContent className="p-0">
          <h3 className="text-lg font-recoleta font-semibold text-foreground">{specialty.name}</h3> {/* Serif font for name */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default SpecialtyCard;