"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, TrendingUp, MessageSquare } from 'lucide-react';
import { Appointment } from '@/data/appointments';
import { Doctor } from '@/data/doctors';
import { Conversation } from '@/data/chat';
import { getDoctorById, getPatientById } from '@/services/localApi';
import { storageManager } from '@/utils/dataStorage';

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

  const totalSessions = upcomingAppointments.length + pastAppointments.length;
  const unreadMessagesCount = conversations.reduce((sum, conv) => {
    const otherParticipantId = conv.participantIds.find(id => id !== patientId);
    if (otherParticipantId) {
      return sum + conv.unreadCount;
    }
    return sum;
  }, 0);

  const getDoctorName = (doctorId: string) => getDoctorById(doctorId)?.fullName || 'Unknown Doctor';
  const getPatientName = (patientId: string) => getPatientById(patientId)?.name || 'Unknown Patient';

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
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(appt => (
                  <div key={appt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{getDoctorName(appt.doctorId)}</p>
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Mock Recent Activity */}
              <div className="flex items-start gap-3">
                <BookOpen className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="text-sm">New journal entry added (mock)</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              {conversations.length > 0 && (
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 mt-1 text-primary" />
                  <div>
                    <p className="text-sm">New message from {getDoctorName(conversations[0].participantIds.find(id => id !== patientId) || '')}</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <p className="text-sm">Appointment with {getDoctorName(pastAppointments[0]?.doctorId || '')} completed</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientOverviewTab;