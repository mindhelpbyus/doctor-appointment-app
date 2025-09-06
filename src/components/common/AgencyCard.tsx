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
      <Card className="h-full flex flex-col items-center justify-center p-6 text-center shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300">
        <img
          src={agency.logo}
          alt={`${agency.name} Logo`}
          className="w-12 h-12 rounded-md object-cover mb-4 border bg-white p-1"
        />
        <CardContent className="p-0">
          <h3 className="text-lg font-semibold">{agency.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgencyCard;