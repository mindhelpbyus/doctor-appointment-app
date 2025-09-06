"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ClockIcon } from 'lucide-react';
import { getDoctorById, addAppointment, getPatientById } from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Appointment } from '@/data/appointments';
import { showSuccess, showError } from '@/utils/toast';
import { sendAppointmentReminder } from '@/utils/notifications';
import { generateFutureAvailabilitySlots } from '@/utils/time'; // Import the new utility
import { format, addDays, startOfDay } from 'date-fns';
import { getLoggedInUser } from '@/utils/auth';

const BookingPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<{ date: string; slots: string[] }[]>([]);
  const currentUser = getLoggedInUser();

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'patient') {
      showError('You must be logged in as a patient to book an appointment.');
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (doctorId) {
      const foundDoctor = getDoctorById(doctorId);
      setDoctor(foundDoctor);

      if (foundDoctor && foundDoctor.weeklyAvailability) {
        // Generate slots for the next 30 days starting from today
        const today = startOfDay(new Date());
        const generatedSlots = generateFutureAvailabilitySlots(foundDoctor.weeklyAvailability, today, 30, 30);
        setAvailableSlots(generatedSlots);
      }
    }
  }, [doctorId]);

  const handleBooking = () => {
    if (!selectedSlot || !doctor) {
      showError('Please select a time slot.');
      return;
    }

    const patientId = currentUser?.id;
    if (!patientId) {
      showError('Could not identify patient. Please log in again.');
      return;
    }

    try {
      const newAppointment: Omit<Appointment, 'id'> = {
        patientId,
        doctorId: doctor.id,
        datetime: selectedSlot,
        type: doctor.videoConsultation ? 'video' : 'in-person',
        status: 'booked',
      };
      const addedAppointment = addAppointment(newAppointment);
      
      const patient = getPatientById(patientId);

      if (addedAppointment && patient) {
        showSuccess(`Appointment with ${doctor.fullName} booked successfully!`);
        sendAppointmentReminder(addedAppointment, doctor, patient);
        navigate('/dashboard'); // Redirect to patient dashboard
      } else {
        showError('Failed to retrieve patient or appointment details for reminder.');
      }

    } catch (error) {
      showError('Failed to book appointment.');
    }
  };

  if (!doctor || !currentUser) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Book with {doctor.fullName}</CardTitle>
          <CardDescription>Select an available time slot below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {availableSlots.length > 0 ? (
            availableSlots.map(day => (
              <div key={day.date}>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                  <CalendarDaysIcon className="h-5 w-5 text-primary" />
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {day.slots.map(time => {
                    const datetime = new Date(`${day.date}T${time}:00`).toISOString();
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
            ))
          ) : (
            <p className="text-center text-lg text-muted-foreground">No available slots for this doctor in the next 30 days.</p>
          )}
          <Button size="lg" className="w-full mt-4" onClick={handleBooking} disabled={!selectedSlot}>
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;