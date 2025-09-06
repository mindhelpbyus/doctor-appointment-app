import React from 'react';
import DoctorCard from '@/components/DoctorCard';
import { doctors } from '@/data/doctors';
import { specialties } from '@/data/specialties';
import { agencies } from '@/data/agencies';
import RootLayout from './layout';

const HomePage: React.FC = () => {
  return (
    <RootLayout>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-800 text-white shadow-md">
          <div className="container mx-auto px-6 py-4">
            <h1 className="text-3xl font-bold">Find Your Doctor</h1>
            <p className="mt-1 text-lg">Book appointments with the best doctors near you.</p>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </main>

        <footer className="bg-gray-800 text-white mt-12">
          <div className="container mx-auto px-6 py-4 text-center">
            <p>&copy; 2024 HealthCare. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </RootLayout>
  );
};

export default HomePage;
