import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/common/SearchBar';
import DoctorCard from '@/components/common/DoctorCard';
import { getDoctors, getSpecialties } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';
import { Stethoscope } from 'lucide-react';
import {
  PopularSearches,
  SpecialtiesOverview,
  CommonConcerns,
  OffersSection,
  HowItWorks,
} from '@/components/search';

const SearchPage: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('loc') || '';
  const [hasSearched, setHasSearched] = useState(!!(initialQuery || initialLocation));

  useEffect(() => {
    const doctorsData = getDoctors();
    const specialtiesData = getSpecialties();
    setAllDoctors(doctorsData);
    setSpecialties(specialtiesData);
  }, []);

  const getSpecialty = (specialtyId: string) => {
    return specialties.find(s => s.id === specialtyId);
  };

  const performSearch = (query: string, location: string) => {
    if (!query && !location) {
      setFilteredDoctors([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    let results = allDoctors;
    const lowercasedQuery = query.toLowerCase();
    const lowercasedLocation = location.toLowerCase();

    if (query) {
      results = results.filter(doctor => {
        const specialtyName = getSpecialty(doctor.specialtyId)?.name || '';
        return (
          doctor.fullName.toLowerCase().includes(lowercasedQuery) ||
          specialtyName.toLowerCase().includes(lowercasedQuery)
        );
      });
    }

    if (location) {
      results = results.filter(doctor => 
        doctor.clinicAddress.toLowerCase().includes(lowercasedLocation)
      );
    }

    setFilteredDoctors(results);
  };

  useEffect(() => {
    if (allDoctors.length > 0 && specialties.length > 0) {
      performSearch(initialQuery, initialLocation);
    }
  }, [allDoctors, specialties, initialQuery, initialLocation]);

  const handleSearch = (query: string, location: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('loc', location);
    setSearchParams(params);
    performSearch(query, location);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center flex items-center justify-center gap-3">
        <Stethoscope className="w-10 h-10 text-primary" />
        Find Your Doctor
      </h1>
      <SearchBar 
        onSearch={handleSearch} 
        defaultQuery={initialQuery}
        defaultLocation={initialLocation}
      />

      {hasSearched ? (
        <section>
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => {
                const specialty = getSpecialty(doctor.specialtyId);
                return (
                  <DoctorCard key={doctor.id} doctor={{
                    id: doctor.id,
                    fullName: doctor.fullName,
                    specialtyName: specialty?.name || 'N/A',
                    specialtyIcon: specialty?.icon,
                    clinicAddress: doctor.clinicAddress,
                    rating: doctor.rating,
                    photoUrl: doctor.photoUrl,
                  }} />
                )
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">No doctors found matching your search criteria.</p>
            </div>
          )}
        </section>
      ) : (
        <div className="space-y-8">
          <PopularSearches />
          <SpecialtiesOverview />
          <CommonConcerns />
          <OffersSection />
          <HowItWorks />
        </div>
      )}
    </div>
  );
};

export default SearchPage;