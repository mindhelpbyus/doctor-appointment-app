"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon, CalendarDaysIcon, PhoneIcon, MailIcon, MessageSquare } from 'lucide-react';
import { getDoctorById, getSpecialtyById, getOrCreateConversation } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { getLoggedInUser } from '@/utils/auth';
import { showError } from '@/utils/toast';

const DoctorProfilePage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [specialtyName, setSpecialtyName] = useState<string>('');
  const [currentPatientId, setCurrentPatientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser && loggedInUser.type === 'patient') {
      setCurrentPatientId(loggedInUser.id);
    } else {
      setCurrentPatientId(undefined);
    }

    if (doctorId) {
      const foundDoctor = getDoctorById(doctorId);
      setDoctor(foundDoctor);
      if (foundDoctor) {
        const specialty = getSpecialtyById(foundDoctor.specialtyId);
        setSpecialtyName(specialty?.name || 'N/A');
      }
    }
  }, [doctorId]);

  const handleMessageDoctor = () => {
    if (!currentPatientId) {
      showError('Please log in as a patient to message doctors.');
      navigate('/login');
      return;
    }
    if (doctor && currentPatientId) {
      const conversation = getOrCreateConversation(currentPatientId, doctor.id);
      navigate(`/messages/${conversation.id}`);
    }
  };

  if (!doctor) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold font-averta text-foreground">Doctor Not Found</h1>
        <p className="text-lg text-muted-foreground font-averta">The doctor you are looking for does not exist.</p>
        <Link to="/search" className="text-basil hover:text-dark-basil mt-4 inline-block">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6">
          <img
            src={doctor.photoUrl || 'https://via.placeholder.com/200'}
            alt={doctor.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-basil shadow-md"
          />
          <div className="text-center md:text-left">
            <CardTitle className="text-4xl font-recoleta font-extrabold mb-2 text-foreground">{doctor.fullName}</CardTitle>
            <CardDescription className="text-xl text-muted-foreground mb-2 font-averta">{specialtyName}</CardDescription>
            <div className="flex items-center justify-center md:justify-start text-lg text-muted-foreground mb-1 font-averta">
              <MapPinIcon className="h-5 w-5 mr-2 text-basil" /> {doctor.clinicAddress}
            </div>
            <div className="flex items-center justify-center md:justify-start text-lg text-yellow-500 font-averta">
              <StarIcon className="h-5 w-5 mr-2 fill-yellow-500" /> {doctor.rating.toFixed(1)} Rating
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 font-averta text-foreground">About Dr. {doctor.fullName.split(' ')[1]}</h2>
            <p className="text-muted-foreground leading-relaxed font-averta">{doctor.biography}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 font-averta text-foreground">Contact Information</h2>
            <div className="space-y-2">
              <p className="flex items-center text-muted-foreground font-averta">
                <PhoneIcon className="h-5 w-5 mr-2 text-basil" /> Phone: {doctor.phone}
              </p>
              <p className="flex items-center text-muted-foreground font-averta">
                <MailIcon className="h-5 w-5 mr-2 text-basil" /> Email: {doctor.email}
              </p>
            </div>
          </section>

          <section className="flex gap-4">
            <h2 className="text-2xl font-semibold mb-3 sr-only">Actions</h2>
            <Link to={`/book/${doctor.id}`}>
              <Button size="custom-lg" variant="custom-primary" className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5" /> Schedule Now
              </Button>
            </Link>
            <Button size="custom-lg" variant="custom-secondary" className="flex items-center gap-2" onClick={handleMessageDoctor}>
              <MessageSquare className="h-5 w-5" /> Message Doctor
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;