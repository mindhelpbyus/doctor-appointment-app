"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, TrendingUp, MessageSquare } from 'lucide-react';
import { Appointment } from '@/data/appointments';
import { Conversation } from '@/data/chat';
import { getDoctorById } from '@/services/localApi';
import { storageManager } from '@/utils/dataStorage';
import { CurrentDoctorCard } from '.';
import { Doctor } from '@/data/doctors';

interface PatientOverviewTabProps {
  patientId: string;
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  conversations: Conversation[];
}

const PatientOverviewTab: React.FC<PatientOverviewTabProps> = ({
  patientId,
  upcomingAppointments,
  pastAppointments,
  conversations,
}) => {
  const [journalEntriesCount, setJournalEntriesCount] = useState(0);
  const [moodAverage, setMoodAverage] = useState(0);
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | undefined>(undefined);

  useEffect(() => {
    if (patientId) {
      const entries = storageManager.getUserJournalEntries(patientId);
      setJournalEntriesCount(entries.length);

      if (entries.length > 0) {
        const totalMood = entries.reduce((sum, entry) => sum + entry.mood, 0);
        setMoodAverage(totalMood / entries.length);
      } else {
        setMoodAverage(0);
      }
    }
  }, [patientId]);

  useEffect(() => {
    // Determine the current doctor
    if (upcomingAppointments.length > 0) {
      setCurrentDoctor(getDoctorById(upcomingAppointments[0].doctorId));
    } else if (pastAppointments.length > 0) {
      // Sort past appointments to find the most recent one
      const sortedPast = [...pastAppointments].sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
      setCurrentDoctor(getDoctorById(sortedPast[0].doctorId));
    }
  }, [upcomingAppointments, pastAppointments]);

  const totalSessions = upcomingAppointments.length + pastAppointments.length;
  const unreadMessagesCount = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSessions}</div>
            <p className="text-xs text-muted-foreground">{pastAppointments.length} completed, {upcomingAppointments.length} upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journalEntriesCount}</div>
            <p className="text-xs text-muted-foreground">Total entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moodAverage.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Based on all entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessagesCount}</div>
            <p className="text-xs text-muted-foreground">From your providers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentDoctor ? (
          <CurrentDoctorCard doctor={currentDoctor} patientId={patientId} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Your Doctors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Book an appointment to see your doctor's details here.</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.slice(0, 3).map(appt => (
                  <div key={appt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{getDoctorById(appt.doctorId)?.fullName}</p>
                      <p className="text-sm text-muted-foreground">{new Date(appt.datetime).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                    <Badge>{appt.type === 'video' ? 'Video' : 'In-person'}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No upcoming appointments.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientOverviewTab;