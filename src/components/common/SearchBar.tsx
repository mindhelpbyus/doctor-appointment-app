import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, User, Stethoscope, Building, MapPin, Crosshair } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getDoctors, getSpecialties, getAgencies } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';
import { Agency } from '@/data/agencies';
import { showSuccess } from '@/utils/toast';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  placeholder?: string;
  defaultQuery?: string;
  defaultLocation?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search doctors, specialties...", defaultQuery = '', defaultLocation = '' }) => {
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const [suggestions, setSuggestions] = useState<{ doctors: Doctor[], specialties: Specialty[], agencies: Agency[] }>({ doctors: [], specialties: [], agencies: [] });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    setLocation(defaultLocation);
  }, [defaultLocation]);

  useEffect(() => {
    if (query.length > 1) {
      const allDoctors = getDoctors();
      const allSpecialties = getSpecialties();
      const allAgencies = getAgencies();
      const lowercasedQuery = query.toLowerCase();
      
      const filteredDoctors = allDoctors.filter(d => d.fullName.toLowerCase().includes(lowercasedQuery)).slice(0, 3);
      const filteredSpecialties = allSpecialties.filter(s => s.name.toLowerCase().includes(lowercasedQuery)).slice(0, 3);
      const filteredAgencies = allAgencies.filter(a => a.name.toLowerCase().includes(lowercasedQuery)).slice(0, 3);
      
      setSuggestions({ doctors: filteredDoctors, specialties: filteredSpecialties, agencies: filteredAgencies });
      setIsPopoverOpen(true);
    } else {
      setSuggestions({ doctors: [], specialties: [], agencies: [] });
      setIsPopoverOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    setIsPopoverOpen(false);
    onSearch(query, location);
  };

  const handleSelect = (path: string) => {
    setIsPopoverOpen(false);
    navigate(path);
  };

  const handleUseMyLocation = () => {
    // In a real app, this would use navigator.geolocation.
    // For this demo, we'll simulate finding a nearby city from our data.
    const mockLocation = "Central City";
    setLocation(mockLocation);
    showSuccess(`Location set to ${mockLocation}`);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto" ref={searchContainerRef}>
      <div className="flex w-full items-center space-x-2 p-1.5 bg-background rounded-full shadow-medium border border-granite focus-within:border-primary transition-all duration-300">
        {/* Query Input */}
        <div className="flex-grow relative flex items-center">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setIsPopoverOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground placeholder:text-stone pl-12 pr-4 py-3 text-lg font-averta"
          />
        </div>
        
        <div className="w-px h-6 bg-granite self-center"></div>

        {/* Location Input */}
        <div className="flex-grow relative flex items-center">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone" />
          <Input
            type="text"
            placeholder="City or Zip Code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground placeholder:text-stone pl-12 pr-10 py-3 text-lg font-averta"
          />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" onClick={handleUseMyLocation}>
            <Crosshair className="h-5 w-5 text-stone hover:text-primary" />
          </Button>
        </div>

        <Button onClick={handleSearch} variant="custom-primary" size="custom-sm" className="rounded-full px-6 py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300">
          Search
        </Button>
      </div>

      {isPopoverOpen && (suggestions.doctors.length > 0 || suggestions.specialties.length > 0 || suggestions.agencies.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-background rounded-2xl shadow-lg border border-border z-50 overflow-hidden">
          <Command>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {suggestions.doctors.length > 0 && (
                <CommandGroup heading="Doctors">
                  {suggestions.doctors.map((doctor) => (
                    <CommandItem key={doctor.id} onSelect={() => handleSelect(`/doctor/${doctor.id}`)} value={doctor.fullName}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{doctor.fullName}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {suggestions.specialties.length > 0 && (
                <CommandGroup heading="Specialties">
                  {suggestions.specialties.map((specialty) => (
                    <CommandItem key={specialty.id} onSelect={() => { setQuery(specialty.name); onSearch(specialty.name, location); setIsPopoverOpen(false); }} value={specialty.name}>
                      <Stethoscope className="mr-2 h-4 w-4" />
                      <span>{specialty.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {suggestions.agencies.length > 0 && (
                <CommandGroup heading="Agencies">
                  {suggestions.agencies.map((agency) => (
                    <CommandItem key={agency.id} onSelect={() => handleSelect(`/a/${agency.slug}`)} value={agency.name}>
                      <Building className="mr-2 h-4 w-4" />
                      <span>{agency.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default SearchBar;