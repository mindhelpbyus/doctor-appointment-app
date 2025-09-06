import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, VideoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAppointments, getDoctorById, getSpecialtyById } from '@/services/localApi';
import { Appointment } from '@/data/appointments';

interface EnrichedAppointment extends Appointment {
  doctorName: string;
  doctorSpecialty: string;
}

const AppointmentsPage: React.FC = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<EnrichedAppointment[]>([]);

  useEffect(() => {
    const allAppointments = getAppointments();
    const upcoming = allAppointments
      .filter(a => a.status === 'booked')
      .map(appointment => {
        const doctor = getDoctorById(appointment.doctorId);
        const specialty = doctor ? getSpecialtyById(doctor.specialtyId) : undefined;
        return {
          ...appointment,
          doctorName: doctor?.fullName || 'Unknown Doctor',
          doctorSpecialty: specialty?.name || 'Unknown Specialty',
        };
      });
    setUpcomingAppointments(upcoming);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">My Appointments</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(appointment => (
            <Card key={appointment.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {appointment.type === 'video' ? <VideoIcon className="h-5 w-5" /> : <CalendarIcon className="h-5 w-5" />}
                  {appointment.doctorName} - {appointment.doctorSpecialty}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-medium">{new Date(appointment.datetime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <p className="text-muted-foreground">Type: {appointment.type === 'video' ? 'Video Consult' : 'In-person'}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="destructive">Cancel</Button>
                  {appointment.type === 'video' && <Button>Join Video</Button>}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-lg col-span-full">No upcoming appointments. <Link to="/search" className="text-primary hover:underline">Book one now!</Link></p>
        )}
      </section>
    </div>
  );
};

export default AppointmentsPage;