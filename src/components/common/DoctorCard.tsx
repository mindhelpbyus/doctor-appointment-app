import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorInfo {
  id: string;
  fullName: string;
  specialtyName: string;
  clinicAddress: string;
  rating: number;
  photoUrl?: string;
}

interface DoctorCardProps {
  doctor: DoctorInfo;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="flex flex-col items-center text-center p-6 border-none rounded-2xl shadow-subtle transition-all duration-300 hover:shadow-medium hover:border-basil hover:scale-[1.02] bg-background"> {/* Enhanced card styling */}
      <img
        src={doctor.photoUrl || 'https://via.placeholder.com/150/008363/FFFFFF?text=Dr'}
        alt={doctor.fullName}
        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-basil shadow-md" // Larger image, thicker border
      />
      <CardHeader className="p-0 pb-3"> {/* Increased bottom padding */}
        <CardTitle className="text-xl font-recoleta font-semibold text-foreground">{doctor.fullName}</CardTitle> {/* Serif font for name */}
        <CardDescription className="text-muted-foreground font-averta text-base">{doctor.specialtyName}</CardDescription> {/* Base font size */}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between items-center p-0 space-y-3"> {/* Increased spacing */}
        <div className="flex items-center text-sm text-stone font-averta"> {/* Stone color for address */}
          <MapPinIcon className="h-4 w-4 mr-1 text-basil" /> {doctor.clinicAddress.split(',')[0]}
        </div>
        <div className="flex items-center text-sm text-yellow-500 font-averta">
          <StarIcon className="h-4 w-4 mr-1 fill-yellow-500" /> {doctor.rating.toFixed(1)}
        </div>
        <Link to={`/doctor/${doctor.id}`} className="w-full mt-5"> {/* Increased top margin */}
          <Button className="w-full" variant="custom-primary" size="custom-sm">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;