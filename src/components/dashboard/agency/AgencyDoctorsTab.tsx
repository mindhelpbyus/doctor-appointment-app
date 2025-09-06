"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, StarIcon } from 'lucide-react';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';

interface AgencyDoctorsTabProps {
  doctors: Doctor[];
  specialties: Specialty[];
}

const AgencyDoctorsTab: React.FC<AgencyDoctorsTabProps> = ({ doctors, specialties }) => {
  const getSpecialtyName = (specialtyId: string) => specialties.find(s => s.id === specialtyId)?.name || 'N/A';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Doctors ({doctors.length})</CardTitle>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Doctor
          </Button>
        </CardHeader>
        <CardContent>
          {doctors.length > 0 ? (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctors.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.fullName}</TableCell>
                      <TableCell>{getSpecialtyName(doc.specialtyId)}</TableCell>
                      <TableCell>{doc.yearsExperience} years</TableCell>
                      <TableCell>{doc.rating.toFixed(1)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/doctor/${doc.id}`}>View Profile</Link>
                        </Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground">No doctors affiliated with your agency yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyDoctorsTab;