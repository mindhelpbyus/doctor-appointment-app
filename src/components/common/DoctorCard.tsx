import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorInfo {
  id: string;
  fullName: string;
  specialtyName: string;
  specialtyIcon?: React.ElementType;
  clinicAddress: string;
  rating: number;
  photoUrl?: string;
}

interface DoctorCardProps {
  doctor: DoctorInfo;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const defaultDoctorImage = '/images/doctors/default.jpg';
  const Icon = doctor.specialtyIcon;

  return (
    <Card className="flex flex-col items-center text-center p-6 border-none rounded-2xl shadow-subtle transition-all duration-300 hover:shadow-medium hover:border-primary hover:scale-[1.02] bg-background"> {/* Enhanced card styling */}
      <img
        src={doctor.photoUrl || defaultDoctorImage}
        alt={doctor.fullName}
        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-primary shadow-md" // Larger image, thicker border
      />
      <CardHeader className="p-0 pb-3"> {/* Increased bottom padding */}
        <CardTitle className="text-xl font-recoleta font-semibold text-foreground">{doctor.fullName}</CardTitle> {/* Serif font for name */}
        <CardDescription className="text-muted-foreground font-averta text-base flex items-center justify-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {doctor.specialtyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between items-center p-0 space-y-3 w-full"> {/* Added w-full */}
        <div className="flex items-center text-sm text-stone font-averta"> {/* Stone color for address */}
          <MapPinIcon className="h-4 w-4 mr-1 text-primary" /> {doctor.clinicAddress.split(',')[0]}
        </div>
        <div className="flex items-center text-sm text-yellow-500 font-averta">
          <StarIcon className="h-4 w-4 mr-1 fill-yellow-500" /> {doctor.rating.toFixed(1)}
        </div>
        <div className="w-full mt-5 flex flex-col sm:flex-row gap-2">
          <Link to={`/doctor/${doctor.id}`} className="flex-1">
            <Button className="w-full" variant="custom-secondary" size="custom-sm">View Profile</Button>
          </Link>
          <Link to={`/book/${doctor.id}`} className="flex-1">
            <Button className="w-full" variant="custom-primary" size="custom-sm">Book Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;