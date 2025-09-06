import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, VideoIcon } from 'lucide-react';

const AppointmentsPage: React.FC = () => {
  // Placeholder for upcoming appointments
  const upcomingAppointments = [
    {
      id: 'app1',
      doctor: 'Dr. Alice Smith',
      specialty: 'Pediatrics',
      date: '2024-10-26',
      time: '10:00 AM',
      type: 'Video Consult',
    },
    {
      id: 'app2',
      doctor: 'Dr. Bob Johnson',
      specialty: 'Cardiology',
      date: '2024-11-01',
      time: '02:30 PM',
      type: 'In-person',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">My Appointments</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(appointment => (
            <Card key={appointment.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {appointment.type === 'Video Consult' ? <VideoIcon className="h-5 w-5" /> : <CalendarIcon className="h-5 w-5" />}
                  {appointment.doctor} - {appointment.specialty}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-lg font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appointment.time}</p>
                <p className="text-muted-foreground">Type: {appointment.type}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="destructive">Cancel</Button>
                  {appointment.type === 'Video Consult' && <Button>Join Video</Button>}
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