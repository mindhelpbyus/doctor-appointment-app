"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, CalendarPlus, Phone, Mail } from 'lucide-react';
import { Doctor } from '@/data/doctors';
import { getOrCreateConversation } from '@/services/localApi';
import { showError } from '@/utils/toast';

interface CurrentDoctorCardProps {
  doctor: Doctor;
  patientId: string;
}

const CurrentDoctorCard: React.FC<CurrentDoctorCardProps> = ({ doctor, patientId }) => {
  const navigate = useNavigate();

  const handleMessageDoctor = () => {
    if (!patientId) {
      showError('Could not identify patient to start conversation.');
      return;
    }
    const conversation = getOrCreateConversation(patientId, doctor.id);
    navigate(`/dashboard/messages/${conversation.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Next Appointment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={doctor.photoUrl} alt={doctor.fullName} />
            <AvatarFallback>{doctor.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{doctor.fullName}</h3>
            <p className="text-muted-foreground">{doctor.clinicAddress}</p>
          </div>
        </div>
        <div className="border-t pt-4 space-y-2">
          <p className="flex items-center text-sm text-muted-foreground">
            <Phone className="w-4 h-4 mr-2" /> {doctor.phone}
          </p>
          <p className="flex items-center text-sm text-muted-foreground">
            <Mail className="w-4 h-4 mr-2" /> {doctor.email}
          </p>
        </div>
        <div className="flex gap-2 pt-2">
          <Button onClick={handleMessageDoctor} className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" /> Message
          </Button>
          <Button variant="outline" onClick={() => navigate(`/book/${doctor.id}`)} className="flex-1">
            <CalendarPlus className="w-4 h-4 mr-2" /> New Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentDoctorCard;