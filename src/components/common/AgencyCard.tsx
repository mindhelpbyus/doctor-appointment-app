import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      <Card className="h-full flex flex-col items-center justify-center p-4 text-center shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300">
        <CardHeader className="p-0 mb-3">
          <img
            src={agency.logo}
            alt={`${agency.name} Logo`}
            className="w-16 h-16 rounded-md object-cover mx-auto border bg-white p-1"
          />
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center items-center p-0 space-y-1">
          <Badge variant="secondary" className="mb-2">{agency.type}</Badge>
          <CardTitle className="text-base font-semibold leading-tight">{agency.name}</CardTitle>
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPinIcon className="h-3 w-3 mr-1 text-primary" />
            <span>{agency.address.split(',')[1]?.trim() || agency.address}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AgencyCard;