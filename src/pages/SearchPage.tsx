import React from 'react';
import SearchBar from '@/components/common/SearchBar';
import DoctorCard from '@/components/common/DoctorCard';

const SearchPage: React.FC = () => {
  // Placeholder data for demonstration
  const doctors = [
    { id: '1', name: 'Dr. Alice Smith', specialty: 'Pediatrics', location: 'New York, NY', rating: 4.8, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=AS' },
    { id: '2', name: 'Dr. Bob Johnson', specialty: 'Cardiology', location: 'Los Angeles, CA', rating: 4.5, imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=BJ' },
    { id: '3', name: 'Dr. Carol White', specialty: 'Dermatology', location: 'Chicago, IL', rating: 4.9, imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?text=CW' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Find Your Doctor</h1>
      <SearchBar onSearch={(query) => console.log('Searching for:', query)} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </section>
    </div>
  );
};

export default SearchPage;