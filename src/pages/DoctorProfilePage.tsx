"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, MapPinIcon, CalendarDaysIcon, PhoneIcon, MailIcon } from 'lucide-react';

// Placeholder data for demonstration
const mockDoctors = [
  { id: '1', name: 'Dr. Alice Smith', specialty: 'Pediatrics', location: 'New York, NY', rating: 4.8, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=AS', bio: 'Dr. Smith is a board-certified pediatrician with over 10 years of experience. She is passionate about child health and development.', phone: '555-123-4567', email: 'alice.smith@example.com' },
  { id: '2', name: 'Dr. Bob Johnson', specialty: 'Cardiology', location: 'Los Angeles, CA', rating: 4.5, imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=BJ', bio: 'Dr. Johnson specializes in cardiovascular diseases and has a strong focus on preventive care and patient education.', phone: '555-987-6543', email: 'bob.johnson@example.com' },
  { id: '3', name: 'Dr. Carol White', specialty: 'Dermatology', location: 'Chicago, IL', rating: 4.9, imageUrl: 'https://via.placeholder.com/150/008000/FFFFFF?text=CW', bio: 'Dr. White is an expert in medical and cosmetic dermatology, dedicated to helping patients achieve healthy, radiant skin.', phone: '555-555-1212', email: 'carol.white@example.com' },
  { id: 'd1', name: 'Dr. Emily White', specialty: 'General Practice', location: '123 Main St', rating: 4.7, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=EW', bio: 'Dr. White provides comprehensive primary care for patients of all ages, focusing on holistic health and wellness.', phone: '555-111-2222', email: 'emily.white@example.com' },
  { id: 'd2', name: 'Dr. David Green', specialty: 'Internal Medicine', location: '123 Main St', rating: 4.6, imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=DG', bio: 'Dr. Green is an internal medicine specialist with a focus on managing complex adult diseases and promoting long-term health.', phone: '555-333-4444', email: 'david.green@example.com' },
  { id: 'd3', name: 'Dr. Sarah Lee', specialty: 'Emergency Medicine', location: '456 Oak Ave', rating: 4.9, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=SL', bio: 'Dr. Lee is an experienced emergency physician, providing critical care and rapid diagnosis in urgent situations.', phone: '555-666-7777', email: 'sarah.lee@example.com' },
];

const DoctorProfilePage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const doctor = mockDoctors.find(d => d.id === doctorId);

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