import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { getAgencies, getDoctors, getPromotions, updateAgency, updateDoctor, updatePromotion } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Doctor } from '@/data/doctors';
import { Promotion } from '@/data/promotions';
import { showError, showSuccess } from '@/utils/toast';

const AdminPage: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = () => {
    setAgencies(getAgencies());
    setDoctors(getDoctors());
    setPromotions(getPromotions());
  };

  const handleAgencyStatusChange = (agency: Agency, isActive: boolean) => {
    try {
      updateAgency({ ...agency, isActive });
      reloadData();
      showSuccess(`Agency "${agency.name}" ${isActive ? 'enabled' : 'disabled'}.`);
    } catch (error) {
      showError('Failed to update agency.');
    }
  };

  const handleDoctorAgencyChange = (doctor: Doctor, agencyId: string) => {
    try {
      const newAgencyId = agencyId === 'none' ? undefined : agencyId;
      updateDoctor({ ...doctor, agencyId: newAgencyId, type: newAgencyId ? 'agency' : 'individual' });
      reloadData();
      showSuccess(`Dr. ${doctor.fullName} assigned to new agency.`);
    } catch (error) {
      showError('Failed to update doctor.');
    }
  };

  const handlePromotionStatusChange = (promotion: Promotion, status: 'approved' | 'rejected') => {
    try {
      updatePromotion({ ...promotion, status });
      reloadData();
      showSuccess(`Promotion "${promotion.title}" has been ${status}.`);
    } catch (error) {
      showError('Failed to update promotion.');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center font-averta text-foreground">Admin Dashboard</h1>
      <Tabs defaultValue="agencies">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agencies" className="font-averta text-foreground">Manage Agencies</TabsTrigger>
          <TabsTrigger value="doctors" className="font-averta text-foreground">Manage Doctors</TabsTrigger>
          <TabsTrigger value="promotions" className="font-averta text-foreground">Manage Promotions</TabsTrigger>
        </TabsList>

        {/* Agencies Tab */}
        <TabsContent value="agencies">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="font-averta text-foreground">Healthcare Agencies</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-averta text-muted-foreground">Name</TableHead>
                    <TableHead className="font-averta text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right font-averta text-muted-foreground">Enable/Disable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agencies.map(agency => (
                    <TableRow key={agency.id}>
                      <TableCell className="font-medium font-averta text-foreground">{agency.name}</TableCell>
                      <TableCell className="font-averta text-muted-foreground">{agency.isActive ? 'Active' : 'Inactive'}</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={agency.isActive}
                          onCheckedChange={(checked) => handleAgencyStatusChange(agency, checked)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Doctors Tab */}
        <TabsContent value="doctors">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="font-averta text-foreground">Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-averta text-muted-foreground">Name</TableHead>
                    <TableHead className="font-averta text-muted-foreground">Current Agency</TableHead>
                    <TableHead className="text-right font-averta text-muted-foreground">Assign Agency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map(doctor => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium font-averta text-foreground">{doctor.fullName}</TableCell>
                      <TableCell className="font-averta text-muted-foreground">{agencies.find(a => a.id === doctor.agencyId)?.name || 'Independent'}</TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={doctor.agencyId || 'none'}
                          onValueChange={(value) => handleDoctorAgencyChange(doctor, value)}
                        >
                          <SelectTrigger className="w-[220px] rounded-sm border-foreground focus:border-basil">
                            <SelectValue placeholder="Select Agency" className="font-averta text-foreground" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none" className="font-averta text-foreground">Independent</SelectItem>
                            {agencies.map(agency => (
                              <SelectItem key={agency.id} value={agency.id} className="font-averta text-foreground">{agency.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="font-averta text-foreground">Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-averta text-muted-foreground">Title</TableHead>
                    <TableHead className="font-averta text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right font-averta text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map(promo => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium font-averta text-foreground">{promo.title}</TableCell>
                      <TableCell className="font-averta text-muted-foreground">{promo.status}</TableCell>
                      <TableCell className="text-right space-x-2">
                        {promo.status !== 'approved' && (
                          <Button size="custom-sm" variant="custom-primary" onClick={() => handlePromotionStatusChange(promo, 'approved')}>Approve</Button>
                        )}
                        {promo.status !== 'rejected' && (
                          <Button size="custom-sm" variant="destructive" onClick={() => handlePromotionStatusChange(promo, 'rejected')}>Reject</Button>
                        )}
                      </TableCell>
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

export default AdminPage;