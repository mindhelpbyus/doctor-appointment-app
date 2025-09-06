"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '@/components/common/DoctorCard';
import SearchBar from '@/components/common/SearchBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';
import { Promotion } from '@/data/promotions';

interface PatientDoctorsTabProps {
  allDoctors: Doctor[];
  specialties: Specialty[];
  promotions: Promotion[];
}

const PatientDoctorsTab: React.FC<PatientDoctorsTabProps> = ({ allDoctors, specialties, promotions }) => {
  const navigate = useNavigate();
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Initially, show all doctors
    setFilteredDoctors(allDoctors);
  }, [allDoctors]);

  const getSpecialtyName = (specialtyId: string) => specialties.find(s => s.id === specialtyId)?.name || 'N/A';

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDoctors(allDoctors);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const results = allDoctors.filter(doctor => 
      doctor.fullName.toLowerCase().includes(lowercasedQuery) ||
      getSpecialtyName(doctor.specialtyId).toLowerCase().includes(lowercasedQuery) ||
      doctor.clinicAddress.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDoctors(results);
  };

  // Recommendations Logic
  const topRatedDoctors = [...allDoctors].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const doctorsWithPromos = allDoctors.filter(doc => 
    promotions.some(promo => promo.targetDoctorId === doc.id || promo.targetAgencyId === doc.agencyId)
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      <SearchBar 
        onSearch={handleSearch} 
        placeholder="Search by doctor, specialty, or location..." 
      />

      {/* Conditional rendering based on search results */}
      {filteredDoctors.length < allDoctors.length ? (
        <section>
          <h2 className="text-2xl font-bold mb-4">Search Results ({filteredDoctors.length})</h2>
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
        </section>
      ) : (
        <div className="space-y-8">
          {/* Recommendations */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Top Rated Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedDoctors.map(doctor => (
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
          </section>

          {doctorsWithPromos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Doctors With Promotions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctorsWithPromos.map(doctor => (
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
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDoctorsTab;