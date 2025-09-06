import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BuildingIcon, MapPinIcon } from 'lucide-react';

interface Agency {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  address: string;
}

interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  return (
    <Link to={`/a/${agency.slug}`} className="block hover:no-underline">
      <Card className="h-full flex flex-col text-center shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300">
        <CardHeader className="flex-shrink-0">
          <img
            src={agency.logoUrl}
            alt={`${agency.name} Logo`}
            className="w-20 h-20 rounded-md object-cover mx-auto border bg-white p-1"
          />
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center items-center p-4 space-y-2">
          <CardTitle className="text-lg font-semibold">{agency.name}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPinIcon className="h-4 w-4 mr-1 text-primary" />
            <span>{agency.address.split(',')[1]?.trim() || agency.address}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgencyCard;