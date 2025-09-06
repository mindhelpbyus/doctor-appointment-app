import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getDoctors, getSpecialties } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';
import { User, MapPin, Stethoscope } from 'lucide-react';

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ open, onOpenChange }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allDoctors = getDoctors();
    const allSpecialties = getSpecialties();
    setDoctors(allDoctors);
    setSpecialties(allSpecialties);

    // Extract unique locations
    const uniqueLocations = [...new Set(allDoctors.map(d => d.clinicAddress.split(',')[1]?.trim()).filter(Boolean))];
    setLocations(uniqueLocations as string[]);
  }, []);

  const handleSelect = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search by doctor, specialty, or location..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Doctors">
          {doctors.map((doctor) => (
            <CommandItem key={doctor.id} onSelect={() => handleSelect(`/doctor/${doctor.id}`)} value={doctor.fullName}>
              <User className="mr-2 h-4 w-4" />
              <span>{doctor.fullName}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Specialties">
          {specialties.map((specialty) => (
            <CommandItem key={specialty.id} onSelect={() => handleSelect(`/search?q=${specialty.name}`)} value={specialty.name}>
              <Stethoscope className="mr-2 h-4 w-4" />
              <span>{specialty.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Locations">
          {locations.map((location) => (
            <CommandItem key={location} onSelect={() => handleSelect(`/search?q=${location}`)} value={location}>
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;