"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ClockIcon } from 'lucide-react';
import { getDoctorById, addAppointment } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Appointment } from '@/data/appointments';
import { showSuccess, showError } from '@/utils/toast';

const BookingPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (doctorId) {
      const foundDoctor = getDoctorById(doctorId);
      setDoctor(foundDoctor);
    }
  }, [doctorId]);

  const handleBooking = () => {
    if (!selectedSlot || !doctor) {
      showError('Please select a time slot.');
      return;
    }

    try {
      // In a real app, you'd get the logged-in patient's ID. We'll use a placeholder.
      const patientId = 'pat-1'; 
      const newAppointment: Omit<Appointment, 'id'> = {
        patientId,
        doctorId: doctor.id,
        datetime: selectedSlot,
        type: doctor.videoConsultation ? 'video' : 'in-person',
        status: 'booked',
      };
      addAppointment(newAppointment);
      showSuccess(`Appointment with ${doctor.fullName} booked successfully!`);
      navigate('/appointments');
    } catch (error) {
      showError('Failed to book appointment.');
    }
  };

  if (!doctor) {
    return <div className="text-center py-10">Loading doctor details...</div>;
  }

  // Group slots by date
  const availabilityByDate = doctor.availability.reduce((acc, day) => {
    acc[day.date] = day.slots;
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Book with {doctor.fullName}</CardTitle>
          <CardDescription>Select an available time slot below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.keys(availabilityByDate).map(date => (
            <div key={date}>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                <CalendarDaysIcon className="h-5 w-5 text-primary" />
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {availabilityByDate[date].map(time => {
                  const datetime = new Date(`${date}T${time}:00`).toISOString();
                  return (
                    <Button
                      key={datetime}
                      variant={selectedSlot === datetime ? 'default' : 'outline'}
                      onClick={() => setSelectedSlot(datetime)}
                      className="flex items-center gap-2"
                    >
                      <ClockIcon className="h-4 w-4" /> {time}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
          <Button size="lg" className="w-full mt-4" onClick={handleBooking} disabled={!selectedSlot}>
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;