import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import DoctorCard from '@/components/common/DoctorCard';
import { getDoctors } from '@/services/localApi';

// Define the Doctor type based on its structure
type Doctor = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  imageUrl?: string;
  bio: string;
  phone: string;
  email: string;
};

const SearchPage: React.FC = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const doctors = getDoctors();
    setAllDoctors(doctors);
    setFilteredDoctors(doctors);
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDoctors(allDoctors);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const results = allDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(lowercasedQuery) ||
      doctor.specialty.toLowerCase().includes(lowercasedQuery) ||
      doctor.location.toLowerCase().includes(lowercasedQuery)
    );
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
              <DoctorCard key={doctor.id} doctor={doctor} />
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