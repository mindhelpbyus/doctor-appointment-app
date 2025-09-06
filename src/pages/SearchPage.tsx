import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/common/SearchBar';
import DoctorCard from '@/components/common/DoctorCard';
import { getDoctors, getSpecialties } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';
import { Stethoscope } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  useEffect(() => {
    const doctorsData = getDoctors();
    const specialtiesData = getSpecialties();
    setAllDoctors(doctorsData);
    setSpecialties(specialtiesData);
  }, []);

  const getSpecialty = (specialtyId: string) => {
    return specialties.find(s => s.id === specialtyId);
  };

  const performSearch = (query: string) => {
    if (!query) {
      setFilteredDoctors(allDoctors);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const results = allDoctors.filter(doctor => {
      const specialtyName = getSpecialty(doctor.specialtyId)?.name || '';
      return (
        doctor.fullName.toLowerCase().includes(lowercasedQuery) ||
        specialtyName.toLowerCase().includes(lowercasedQuery) ||
        doctor.clinicAddress.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredDoctors(results);
  };

  useEffect(() => {
    if (allDoctors.length > 0 && specialties.length > 0) {
      performSearch(initialQuery);
    }
  }, [allDoctors, specialties, initialQuery]);

  const handleSearch = (query: string) => {
    setSearchParams(query ? { q: query } : {});
    performSearch(query);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center flex items-center justify-center gap-3">
        <Stethoscope className="w-10 h-10 text-primary" />
        Find Your Doctor
      </h1>
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search by doctor, specialty, or location..." 
        defaultValue={initialQuery} 
      />

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
            <p className="text-lg text-muted-foreground">No doctors found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;