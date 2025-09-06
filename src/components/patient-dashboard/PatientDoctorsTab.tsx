"use client";

import React from 'react';
import DoctorCard from '@/components/common/DoctorCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';

interface PatientDoctorsTabProps {
  recentlyViewedDoctors: Doctor[];
  specialties: Specialty[];
}

const PatientDoctorsTab: React.FC<PatientDoctorsTabProps> = ({ recentlyViewedDoctors, specialties }) => {
  const getSpecialtyName = (specialtyId: string) => specialties.find(s => s.id === specialtyId)?.name || 'N/A';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recently Viewed Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          {recentlyViewedDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewedDoctors.map(doctor => (
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
            <p className="text-muted-foreground">No recently viewed doctors.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDoctorsTab;