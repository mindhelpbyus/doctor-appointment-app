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
      <div className="text-center py-16"> {/* Increased vertical padding */}
        <h1 className="text-4xl font-recoleta font-bold text-foreground mb-4">Doctor Not Found</h1> {/* Serif font, larger */}
        <p className="text-lg text-muted-foreground font-averta mb-6">The doctor you are looking for does not exist or has been removed.</p> {/* Muted text, added margin */}
        <Link to="/search">
          <Button variant="custom-primary" size="custom-sm" className="shadow-md hover:shadow-lg">Back to Search</Button> {/* Button with shadow */}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 py-8"> {/* Increased max-width and vertical padding */}
      <Card className="shadow-medium rounded-2xl border-none bg-background"> {/* Stronger shadow, no border */}
        <CardHeader className="flex flex-col md:flex-row items-center gap-8 p-8 lg:p-12 border-b border-granite"> {/* Increased gap and padding, subtle border */}
          <img
            src={doctor.photoUrl || 'https://via.placeholder.com/200/008363/FFFFFF?text=Dr'}
            alt={doctor.fullName}
            className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg flex-shrink-0" // Larger image, thicker border, shadow
          />
          <div className="text-center md:text-left flex-grow">
            <CardTitle className="text-4xl lg:text-5xl font-recoleta font-extrabold mb-2 text-foreground leading-tight">{doctor.fullName}</CardTitle> {/* Larger, serif font, tighter leading */}
            <CardDescription className="text-xl lg:text-2xl text-muted-foreground mb-3 font-averta">{specialtyName}</CardDescription> {/* Larger description */}
            <div className="flex items-center justify-center md:justify-start text-lg text-stone mb-1 font-averta"> {/* Stone color */}
              <MapPinIcon className="h-5 w-5 mr-2 text-primary" /> {doctor.clinicAddress}
            </div>
            <div className="flex items-center justify-center md:justify-start text-lg text-yellow-500 font-averta">
              <StarIcon className="h-5 w-5 mr-2 fill-yellow-500" /> {doctor.rating.toFixed(1)} Rating
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 lg:p-12 space-y-8"> {/* Increased padding and spacing */}
          <section>
            <h2 className="text-2xl font-recoleta font-semibold mb-4 text-foreground">About Dr. {doctor.fullName.split(' ')[1]}</h2> {/* Serif font for heading */}
            <p className="text-muted-foreground leading-relaxed text-lg font-averta">{doctor.biography}</p> {/* Larger, relaxed leading */}
          </section>

          <section>
            <h2 className="text-2xl font-recoleta font-semibold mb-4 text-foreground">Contact Information</h2> {/* Serif font for heading */}
            <div className="space-y-3"> {/* Increased spacing */}
              <p className="flex items-center text-muted-foreground text-lg font-averta">
                <PhoneIcon className="h-5 w-5 mr-3 text-primary" /> Phone: {doctor.phone}
              </p>
              <p className="flex items-center text-muted-foreground text-lg font-averta">
                <MailIcon className="h-5 w-5 mr-3 text-primary" /> Email: {doctor.email}
              </p>
            </div>
          </section>

          <section className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-granite"> {/* Added top border and padding */}
            <h2 className="text-2xl font-semibold mb-3 sr-only">Actions</h2>
            <Link to={`/book/${doctor.id}`}>
              <Button size="custom-lg" variant="custom-primary" className="flex items-center gap-2 shadow-md hover:shadow-lg"> {/* Button with shadow */}
                <CalendarDaysIcon className="h-5 w-5" /> Schedule Now
              </Button>
            </Link>
            <Button size="custom-lg" variant="custom-secondary" className="flex items-center gap-2 shadow-md hover:shadow-lg" onClick={handleMessageDoctor}> {/* Button with shadow */}
              <MessageSquare className="h-5 w-5" /> Message Doctor
            </Button>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfilePage;