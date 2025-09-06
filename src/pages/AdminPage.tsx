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
    <div className="space-y-10 py-8"> {/* Increased spacing and vertical padding */}
      <h1 className="text-4xl font-recoleta font-bold text-center text-foreground">Admin Dashboard</h1> {/* Serif font, larger */}
      <Tabs defaultValue="agencies">
        <TabsList className="grid w-full grid-cols-3 bg-light-grey p-2 rounded-xl shadow-inner"> {/* Refined TabsList styling */}
          <TabsTrigger value="agencies" className="font-averta text-foreground data-[state=active]:bg-background data-[state=active]:shadow-subtle data-[state=active]:text-primary data-[state=active]:font-semibold rounded-lg transition-all duration-200 text-stone hover:text-charcoal">Manage Agencies</TabsTrigger>
          <TabsTrigger value="doctors" className="font-averta text-foreground data-[state=active]:bg-background data-[state=active]:shadow-subtle data-[state=active]:text-primary data-[state=active]:font-semibold rounded-lg transition-all duration-200 text-stone hover:text-charcoal">Manage Doctors</TabsTrigger>
          <TabsTrigger value="promotions" className="font-averta text-foreground data-[state=active]:bg-background data-[state=active]:shadow-subtle data-[state=active]:text-primary data-[state=active]:font-semibold rounded-lg transition-all duration-200 text-stone hover:text-charcoal">Manage Promotions</TabsTrigger>
        </TabsList>

        {/* Agencies Tab */}
        <TabsContent value="agencies">
          <Card className="rounded-2xl shadow-medium border-none bg-background"> {/* Enhanced card styling */}
            <CardHeader className="pb-4">
              <CardTitle className="font-recoleta text-2xl text-foreground">Healthcare Agencies</CardTitle> {/* Serif font, larger */}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-light-grey hover:bg-light-grey"> {/* Subtle background for header row */}
                    <TableHead className="font-averta text-muted-foreground text-base">Name</TableHead>
                    <TableHead className="font-averta text-muted-foreground text-base">Status</TableHead>
                    <TableHead className="text-right font-averta text-muted-foreground text-base">Enable/Disable</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agencies.map(agency => (
                    <TableRow key={agency.id} className="border-b border-granite hover:bg-light-grey transition-colors"> {/* Subtle row border and hover */}
                      <TableCell className="font-medium font-averta text-foreground">{agency.name}</TableCell>
                      <TableCell className="font-averta text-muted-foreground">{agency.isActive ? 'Active' : 'Inactive'}</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={agency.isActive}
                          onCheckedChange={(checked) => handleAgencyStatusChange(agency, checked)}
                          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground" // Custom switch colors
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
          <Card className="rounded-2xl shadow-medium border-none bg-background"> {/* Enhanced card styling */}
            <CardHeader className="pb-4">
              <CardTitle className="font-recoleta text-2xl text-foreground">Doctors</CardTitle> {/* Serif font, larger */}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-light-grey hover:bg-light-grey"> {/* Subtle background for header row */}
                    <TableHead className="font-averta text-muted-foreground text-base">Name</TableHead>
                    <TableHead className="font-averta text-muted-foreground text-base">Current Agency</TableHead>
                    <TableHead className="text-right font-averta text-muted-foreground text-base">Assign Agency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map(doctor => (
                    <TableRow key={doctor.id} className="border-b border-granite hover:bg-light-grey transition-colors"> {/* Subtle row border and hover */}
                      <TableCell className="font-medium font-averta text-foreground">{doctor.fullName}</TableCell>
                      <TableCell className="font-averta text-muted-foreground">{agencies.find(a => a.id === doctor.agencyId)?.name || 'Independent'}</TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={doctor.agencyId || 'none'}
                          onValueChange={(value) => handleDoctorAgencyChange(doctor, value)}
                        >
                          <SelectTrigger className="w-[220px] rounded-md border-granite focus:border-primary text-foreground font-averta"> {/* Refined select styling */}
                            <SelectValue placeholder="Select Agency" />
                          </SelectTrigger>
                          <SelectContent className="rounded-md shadow-subtle"> {/* Refined select content styling */}
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
          <Card className="rounded-2xl shadow-medium border-none bg-background"> {/* Enhanced card styling */}
            <CardHeader className="pb-4">
              <CardTitle className="font-recoleta text-2xl text-foreground">Promotions</CardTitle> {/* Serif font, larger */}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-light-grey hover:bg-light-grey"> {/* Subtle background for header row */}
                    <TableHead className="font-averta text-muted-foreground text-base">Title</TableHead>
                    <TableHead className="font-averta text-muted-foreground text-base">Status</TableHead>
                    <TableHead className="text-right font-averta text-muted-foreground text-base">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map(promo => (
                    <TableRow key={promo.id} className="border-b border-granite hover:bg-light-grey transition-colors"> {/* Subtle row border and hover */}
                      <TableCell className="font-medium font-averta text-foreground">{promo.title}</TableCell>
                      <TableCell className="font-averta text-muted-foreground">{promo.status}</TableCell>
                      <TableCell className="text-right space-x-2">
                        {promo.status !== 'approved' && (
                          <Button size="custom-sm" variant="custom-primary" className="shadow-sm hover:shadow-md" onClick={() => handlePromotionStatusChange(promo, 'approved')}>Approve</Button>
                        )}
                        {promo.status !== 'rejected' && (
                          <Button size="custom-sm" variant="destructive" className="shadow-sm hover:shadow-md" onClick={() => handlePromotionStatusChange(promo, 'rejected')}>Reject</Button>
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