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
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setFilteredDoctors(allDoctors);
  }, [allDoctors]);

  const getSpecialty = (specialtyId: string) => specialties.find(s => s.id === specialtyId);

  const handleSearch = (query: string, location: string) => {
    if (!query && !location) {
      setFilteredDoctors(allDoctors);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    let results = allDoctors;
    const lowercasedQuery = query.toLowerCase();
    const lowercasedLocation = location.toLowerCase();

    if (query) {
      results = results.filter(doctor => 
        doctor.fullName.toLowerCase().includes(lowercasedQuery) ||
        (getSpecialty(doctor.specialtyId)?.name || '').toLowerCase().includes(lowercasedQuery)
      );
    }

    if (location) {
      results = results.filter(doctor => 
        doctor.clinicAddress.toLowerCase().includes(lowercasedLocation)
      );
    }
    
    setFilteredDoctors(results);
  };

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

      {hasSearched ? (
        <section>
          <h2 className="text-2xl font-bold mb-4">Search Results ({filteredDoctors.length})</h2>
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
            <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          )}
        </section>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Top Rated Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                )
              })}
            </div>
          </section>

          {doctorsWithPromos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Doctors With Promotions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctorsWithPromos.map(doctor => {
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
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDoctorsTab;