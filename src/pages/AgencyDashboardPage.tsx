import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getAgencyById, getDoctorsByAgencyId, getAppointmentsForDoctors, getPatientById } from '@/services/localApi';

const AgencyDashboardPage: React.FC = () => {
  const { agencyId } = useParams<{ agencyId: string }>();
  
  if (!agencyId) {
    return <div>Invalid agency ID.</div>;
  }

  const agency = getAgencyById(agencyId);
  const doctors = getDoctorsByAgencyId(agencyId);
  const doctorIds = doctors.map(d => d.id);
  const appointments = getAppointmentsForDoctors(doctorIds);

  if (!agency) {
    return <div>Agency not found.</div>;
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Welcome, {agency.name}</h1>
        <p className="text-muted-foreground">Here's an overview of your agency's activity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Doctors</CardTitle>
            <CardDescription>A list of all doctors associated with your agency.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>NPI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map(doctor => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.fullName}</TableCell>
                    <TableCell>{doctor.specialtyId}</TableCell> {/* In a real app, resolve to name */}
                    <TableCell>{doctor.npi}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>All scheduled appointments for your doctors.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map(appt => {
                  const patient = getPatientById(appt.patientId);
                  const doctor = doctors.find(d => d.id === appt.doctorId);
                  return (
                    <TableRow key={appt.id}>
                      <TableCell>{patient?.name || 'Unknown'}</TableCell>
                      <TableCell>{doctor?.fullName || 'Unknown'}</TableCell>
                      <TableCell>{new Date(appt.datetime).toLocaleString()}</TableCell>
                      <TableCell><Badge>{appt.status}</Badge></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgencyDashboardPage;