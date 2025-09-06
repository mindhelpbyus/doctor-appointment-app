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
    <div className="space-y-10 py-8"> {/* Increased spacing and vertical padding */}
      <h1 className="text-4xl font-recoleta font-bold text-center text-foreground">My Appointments</h1> {/* Serif font, larger */}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Adjusted grid for larger screens */}
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(appointment => (
            <Card key={appointment.id} className="rounded-2xl shadow-subtle border-none bg-background hover:shadow-medium transition-all duration-300"> {/* Enhanced card styling */}
              <CardHeader className="pb-4"> {/* Increased bottom padding */}
                <CardTitle className="flex items-center gap-3 font-recoleta text-2xl text-foreground leading-snug"> {/* Serif font, larger, tighter leading */}
                  {appointment.type === 'video' ? <VideoIcon className="h-6 w-6 text-primary" /> : <CalendarIcon className="h-6 w-6 text-primary" />} {/* Larger icons */}
                  Dr. {appointment.doctorName.split(' ')[1]} - {appointment.doctorSpecialty}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-averta text-lg"> {/* Increased spacing, larger text */}
                <p className="font-medium text-foreground">{new Date(appointment.datetime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <p className="text-muted-foreground">Type: {appointment.type === 'video' ? 'Video Consult' : 'In-person'}</p>
                <div className="flex gap-3 mt-5"> {/* Increased spacing and top margin */}
                  <Button variant="custom-secondary" size="custom-sm" className="shadow-sm hover:shadow-md">Reschedule</Button>
                  <Button variant="destructive" size="custom-sm" className="shadow-sm hover:shadow-md">Cancel</Button>
                  {appointment.type === 'video' && <Button variant="custom-primary" size="custom-sm" className="shadow-sm hover:shadow-md">Join Video</Button>}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-xl col-span-full font-averta text-muted-foreground py-10"> {/* Larger text, increased padding */}
            No upcoming appointments. <Link to="/search" className="text-primary hover:text-dark-health-blue font-semibold">Book one now!</Link>
          </p>
        )}
      </section>
    </div>
  );
};

export default AppointmentsPage;