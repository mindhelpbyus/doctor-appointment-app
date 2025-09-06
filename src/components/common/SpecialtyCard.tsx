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
      <Card className="h-full flex flex-col items-center justify-center p-6 text-center rounded-2xl shadow-lg hover:shadow-xl hover:border-basil transition-all duration-300">
        <Icon className="h-12 w-12 mb-4 text-basil" />
        <CardContent className="p-0">
          <h3 className="text-lg font-semibold font-averta text-foreground">{specialty.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SpecialtyCard;