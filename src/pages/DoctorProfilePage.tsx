"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon, CalendarDaysIcon, PhoneIcon, MailIcon } from 'lucide-react';
import { getDoctorById } from '@/services/localApi';

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

const DoctorProfilePage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);

  useEffect(() => {
    if (doctorId) {
      const foundDoctor = getDoctorById(doctorId);
      setDoctor(foundDoctor);
    }
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Doctor Not Found</h1>
        <p className="text-lg text-muted-foreground">The doctor you are looking for does not exist.</p>
        <Link to="/search" className="text-primary hover:underline mt-4 inline-block">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src={doctor.imageUrl || 'https://via.placeholder.com/200'}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
          />
          <div className="text-center md:text-left">
            <CardTitle className="text-4xl font-bold mb-2">{doctor.name}</CardTitle>
            <CardDescription className="text-xl text-muted-foreground mb-2">{doctor.specialty}</CardDescription>
            <div className="flex items-center justify-center md:justify-start text-lg text-gray-600 mb-1">
              <MapPinIcon className="h-5 w-5 mr-2 text-primary" /> {doctor.location}
            </div>
            <div className="flex items-center justify-center md:justify-start text-lg text-yellow-500">
              <StarIcon className="h-5 w-5 mr-2 fill-yellow-500" /> {doctor.rating.toFixed(1)} Rating
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">About Dr. {doctor.name.split(' ')[1]}</h2>
            <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
            <div className="space-y-2">
              <p className="flex items-center text-gray-700">
                <PhoneIcon className="h-5 w-5 mr-2 text-primary" /> Phone: {doctor.phone}
              </p>
              <p className="flex items-center text-gray-700">
                <MailIcon className="h-5 w-5 mr-2 text-primary" /> Email: {doctor.email}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Book an Appointment</h2>
            <Link to="/appointments"> {/* This would ideally link to a booking form */}
              <Button size="lg" className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5" /> Schedule Now
              </Button>
            </Link>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;