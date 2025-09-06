import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAgencyById, getDoctorsByAgencyId, getAppointmentsForDoctors, getPatientById, getPromotionsByAgencyId } from '@/services/localApi';
import { Promotion } from '@/data/promotions';
import CreatePromotionForm from '@/components/forms/CreatePromotionForm';

const AgencyDashboardPage: React.FC = () => {
  const { agencyId } = useParams<{ agencyId: string }>();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isCreatePromoOpen, setCreatePromoOpen] = useState(false);

  const agency = agencyId ? getAgencyById(agencyId) : undefined;
  const doctors = agencyId ? getDoctorsByAgencyId(agencyId) : [];
  const doctorIds = doctors.map(d => d.id);
  const appointments = getAppointmentsForDoctors(doctorIds);

  const loadPromotions = useCallback(() => {
    if (agencyId) {
      setPromotions(getPromotionsByAgencyId(agencyId));
    }
  }, [agencyId]);

  useEffect(() => {
    loadPromotions();
  }, [loadPromotions]);

  if (!agencyId || !agency) {
    return <div>Agency not found.</div>;
  }

  const handlePromotionCreated = () => {
    setCreatePromoOpen(false);
    loadPromotions();
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold">Welcome, {agency.name}</h1>
        <p className="text-muted-foreground">Here's an overview of your agency's activity.</p>
      </header>

      <Tabs defaultValue="doctors">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>

        <TabsContent value="doctors">
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
                      <TableCell>{doctor.specialtyId}</TableCell>
                      <TableCell>{doctor.npi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
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
        </TabsContent>

        <TabsContent value="promotions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Promotions</CardTitle>
                <CardDescription>Manage your promotional offers.</CardDescription>
              </div>
              <Dialog open={isCreatePromoOpen} onOpenChange={setCreatePromoOpen}>
                <DialogTrigger asChild>
                  <Button>Create Promotion</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Promotion</DialogTitle>
                  </DialogHeader>
                  <CreatePromotionForm agencyId={agencyId} onSuccess={handlePromotionCreated} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map(promo => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.title}</TableCell>
                      <TableCell>{promo.discountType === 'percent' ? `${promo.discountValue}%` : `$${promo.discountValue}`}</TableCell>
                      <TableCell><Badge variant={promo.status === 'approved' ? 'default' : 'secondary'}>{promo.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgencyDashboardPage;