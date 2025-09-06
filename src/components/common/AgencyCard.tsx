import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  address: string;
  type: string;
}

interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  return (
    <Link to={`/a/${agency.slug}`} className="block hover:no-underline">
      <Card className="h-full flex flex-col items-center justify-center p-6 text-center rounded-2xl shadow-subtle hover:shadow-medium hover:border-basil hover:scale-[1.02] transition-all duration-300 bg-background border-none"> {/* Enhanced card styling */}
        <img
          src={agency.logo}
          alt={`${agency.name} Logo`}
          className="w-16 h-16 rounded-lg object-cover mb-4 border border-granite bg-light-grey p-2 shadow-sm" // Larger logo, subtle border/background
        />
        <CardContent className="p-0">
          <h3 className="text-lg font-recoleta font-semibold text-foreground">{agency.name}</h3> {/* Serif font for name */}
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgencyCard;