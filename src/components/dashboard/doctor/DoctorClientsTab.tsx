"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MessageSquare, Eye } from 'lucide-react';
import { getPatients, getConversationsForUser, getOrCreateConversation } from '@/services/localApi';
import { Patient } from '@/data/patients';
import { Conversation } from '@/data/chat';
import { showError } from '@/utils/toast';

interface DoctorClientsTabProps {
  currentDoctorId: string;
}

const DoctorClientsTab: React.FC<DoctorClientsTabProps> = ({ currentDoctorId }) => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const loadPatientsAndConversations = useCallback(() => {
    const allPatients = getPatients();
    // For demo purposes, let's assume a doctor can see all patients or patients they've interacted with.
    // In a real app, this would be filtered by actual patient-doctor relationships.
    setPatients(allPatients);

    const fetchedConversations = getConversationsForUser(currentDoctorId);
    setConversations(fetchedConversations);
  }, [currentDoctorId]);

  useEffect(() => {
    loadPatientsAndConversations();
  }, [loadPatientsAndConversations]);

  const handleMessagePatient = (patientId: string) => {
    try {
      const conversation = getOrCreateConversation(patientId, currentDoctorId);
      navigate(`/doctor-dashboard/messages/${conversation.id}`);
    } catch (error) {
      showError('Failed to start conversation.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Patients</CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length > 0 ? (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.location}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleMessagePatient(patient.id)}>
                          <MessageSquare className="h-4 w-4 mr-2" /> Message
                        </Button>
                        {/* <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" /> View Profile
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground">No patients found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorClientsTab;