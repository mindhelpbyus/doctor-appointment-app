import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import DoctorCard from '@/components/common/DoctorCard';
import { getDoctors, getSpecialties } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';

const SearchPage: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const doctorsData = getDoctors();
    const specialtiesData = getSpecialties();
    setAllDoctors(doctorsData);
    setFilteredDoctors(doctorsData);
    setSpecialties(specialtiesData);
  }, []);

  const getSpecialtyName = (specialtyId: string) => {
    return specialties.find(s => s.id === specialtyId)?.name || '';
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDoctors(allDoctors);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const results = allDoctors.filter(doctor => {
      const specialtyName = getSpecialtyName(doctor.specialtyId).toLowerCase();
      return (
        doctor.fullName.toLowerCase().includes(lowercasedQuery) ||
        specialtyName.includes(lowercasedQuery) ||
        doctor.clinicAddress.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredDoctors(results);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Find Your Doctor</h1>
      <SearchBar onSearch={handleSearch} />

      <section>
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={{
                id: doctor.id,
                fullName: doctor.fullName,
                specialtyName: getSpecialtyName(doctor.specialtyId),
                clinicAddress: doctor.clinicAddress,
                rating: doctor.rating,
                photoUrl: doctor.photoUrl,
              }} />
            ))}
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