import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  imageUrl?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="flex flex-col items-center text-center p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={doctor.imageUrl || 'https://via.placeholder.com/150'}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
      />
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-xl font-semibold">{doctor.name}</CardTitle>
        <CardDescription className="text-muted-foreground">{doctor.specialty}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between items-center p-0 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4 mr-1 text-primary" /> {doctor.location}
        </div>
        <div className="flex items-center text-sm text-yellow-500">
          <StarIcon className="h-4 w-4 mr-1 fill-yellow-500" /> {doctor.rating.toFixed(1)}
        </div>
        <Link to={`/doctor/${doctor.id}`} className="w-full mt-4">
          <Button className="w-full">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;