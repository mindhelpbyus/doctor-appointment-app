"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/data/appointments';
import { getDoctorById } from '@/services/localApi';

interface PatientAppointmentsTabProps {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
}

const PatientAppointmentsTab: React.FC<PatientAppointmentsTabProps> = ({
  upcomingAppointments,
  pastAppointments,
}) => {
  const getDoctorName = (id: string) => getDoctorById(id)?.fullName || 'Unknown Doctor';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled upcoming appointments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
          <CardDescription>Your appointment history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientAppointmentsTab;