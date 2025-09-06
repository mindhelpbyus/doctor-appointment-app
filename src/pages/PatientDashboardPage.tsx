import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DoctorCard from '@/components/common/DoctorCard';
import { getPatientById, getAppointments, getDoctorById, getSpecialtyById } from '@/services/localApi';
import { Patient } from '@/data/patients';
import { Appointment } from '@/data/appointments';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';

const PatientDashboardPage: React.FC = () => {
  // In a real app, this would come from an auth context. We'll hardcode a user.
  const currentPatientId = 'pat-1';

  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    const patientData = getPatientById(currentPatientId);
    setPatient(patientData);

    if (patientData) {
      const allAppointments = getAppointments().filter(a => a.patientId === patientData.id);
      const now = new Date();
      
      setUpcomingAppointments(allAppointments.filter(a => new Date(a.datetime) >= now && a.status === 'booked'));
      setPastAppointments(allAppointments.filter(a => new Date(a.datetime) < now || a.status !== 'booked'));

      const viewedDoctors = patientData.recentlyViewedDoctors
        .map(id => getDoctorById(id))
        .filter((d): d is Doctor => !!d);
      setRecentlyViewed(viewedDoctors);
    }
    
    // We need specialties to pass to DoctorCard
    setSpecialties(getSpecialtyById() ? [getSpecialtyById()] : []);
  }, [currentPatientId]);

  const getDoctorName = (id: string) => getDoctorById(id)?.fullName || 'Unknown Doctor';
  const getSpecialtyName = (id: string) => specialties.find(s => s.id === getDoctorById(id)?.specialtyId)?.name || 'N/A';

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold">Welcome, {patient.name}!</h1>
        <p className="text-muted-foreground">Here's your health dashboard.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled upcoming appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingAppointments.length > 0 ? upcomingAppointments.map(appt => (
                <TableRow key={appt.id}>
                  <TableCell>{getDoctorName(appt.doctorId)}</TableCell>
                  <TableCell>{new Date(appt.datetime).toLocaleString()}</TableCell>
                  <TableCell><Badge variant="default">{appt.type}</Badge></TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No upcoming appointments.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-3xl font-bold mb-4">Recently Viewed Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyViewed.map(doctor => (
            <DoctorCard key={doctor.id} doctor={{
              id: doctor.id,
              fullName: doctor.fullName,
              specialtyName: getSpecialtyName(doctor.id),
              clinicAddress: doctor.clinicAddress,
              rating: doctor.rating,
              photoUrl: doctor.photoUrl,
            }} />
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
          <CardDescription>Your appointment history.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastAppointments.length > 0 ? pastAppointments.map(appt => (
                <TableRow key={appt.id}>
                  <TableCell>{getDoctorName(appt.doctorId)}</TableCell>
                  <TableCell>{new Date(appt.datetime).toLocaleString()}</TableCell>
                  <TableCell><Badge variant={appt.status === 'completed' ? 'secondary' : 'destructive'}>{appt.status}</Badge></TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">No past appointments.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboardPage;