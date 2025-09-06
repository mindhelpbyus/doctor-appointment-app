import React from 'react';
import { getDoctors, getSpecialties } from '@/services/localApi';
import DoctorCard from '@/components/common/DoctorCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TopDoctors: React.FC = () => {
  const specialties = getSpecialties();
  const topRatedDoctors = getDoctors()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4); // Show top 4

  const getSpecialty = (specialtyId: string) => {
    return specialties.find(s => s.id === specialtyId);
  };

  return (
    <section>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold font-recoleta text-foreground">Top-Rated Doctors</h2>
        <p className="text-lg text-muted-foreground mt-2 font-averta">
          Consult with trusted and highly-rated specialty or primary care doctors.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topRatedDoctors.map(doctor => {
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
          );
        })}
      </div>
      <div className="text-center mt-10">
        <Button asChild variant="custom-secondary" size="custom-sm">
          <Link to="/search">Find More Doctors</Link>
        </Button>
      </div>
    </section>
  );
};

export default TopDoctors;