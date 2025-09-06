"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLoggedInUser, logoutUser } from '@/utils/auth';
import {
  getPatientById,
  getAppointments,
  getDoctors,
  getSpecialties,
  getConversationsForUser,
  getPromotions,
} from '@/services/localApi';
import { Patient } from '@/data/patients';
import { Appointment } from '@/data/appointments';
import { Doctor } from '@/data/doctors';
import { Specialty } from '@/data/specialties';
import { Conversation } from '@/data/chat';
import { Promotion } from '@/data/promotions';
import { showError } from '@/utils/toast';

import {
  PatientDashboardHeader,
  PatientOverviewTab,
  PatientAppointmentsTab,
  PatientDoctorsTab,
  PatientMessagingTab,
  PatientSettingsTab,
  PatientJournalTab,
  PatientMoodTrackerTab,
} from '@/components/dashboard/patient';

const PatientDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId?: string }>();

  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const currentUserId = getLoggedInUser()?.id;
  const currentUserType = getLoggedInUser()?.type;

  const loadPatientData = useCallback(() => {
    if (!currentUserId || currentUserType !== 'patient') {
      showError('Please log in as a patient to view your dashboard.');
      navigate('/login');
      return;
    }

    const fetchedPatient = getPatientById(currentUserId);
    if (!fetchedPatient) {
      showError('Patient data not found.');
      navigate('/login');
      return;
    }
    setPatient(fetchedPatient);

    const allAppointments = getAppointments().filter(a => a.patientId === fetchedPatient.id);
    const now = new Date();
    setUpcomingAppointments(allAppointments.filter(a => new Date(a.datetime) >= now && a.status === 'booked'));
    setPastAppointments(allAppointments.filter(a => new Date(a.datetime) < now || a.status !== 'booked'));

    setAllDoctors(getDoctors());
    setSpecialties(getSpecialties());
    setConversations(getConversationsForUser(currentUserId));
    setPromotions(getPromotions().filter(p => p.status === 'approved'));
  }, [currentUserId, currentUserType, navigate]);

  useEffect(() => {
    loadPatientData();
  }, [loadPatientData]);

  useEffect(() => {
    if (conversationId) {
      setActiveTab('messages');
    }
  }, [conversationId]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (!patient) {
    return <div className="text-center py-10">Loading patient dashboard...</div>;
  }

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'appointments', label: 'Appointments' },
    { value: 'doctors', label: 'Find Doctors' },
    { value: 'journal', label: 'Journal' },
    { value: 'mood-tracker', label: 'Mood Tracker' },
    { value: 'messages', label: 'Messages' },
    { value: 'settings', label: 'Settings' },
  ];

  const getGridColsClass = (count: number) => {
    switch (count) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      case 5: return 'grid-cols-5';
      case 6: return 'grid-cols-6';
      case 7: return 'grid-cols-7';
      case 8: return 'grid-cols-8';
      default: return 'grid-cols-1';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PatientDashboardHeader
        patientName={patient.name}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${getGridColsClass(tabs.length)} mb-8`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <PatientOverviewTab
              patientId={patient.id}
              upcomingAppointments={upcomingAppointments}
              pastAppointments={pastAppointments}
              conversations={conversations}
            />
          </TabsContent>

          <TabsContent value="appointments">
            <PatientAppointmentsTab
              upcomingAppointments={upcomingAppointments}
              pastAppointments={pastAppointments}
            />
          </TabsContent>

          <TabsContent value="doctors">
            <PatientDoctorsTab
              allDoctors={allDoctors}
              specialties={specialties}
              promotions={promotions}
            />
          </TabsContent>

          <TabsContent value="journal">
            <PatientJournalTab patientId={patient.id} />
          </TabsContent>

          <TabsContent value="mood-tracker">
            <PatientMoodTrackerTab patientId={patient.id} />
          </TabsContent>

          <TabsContent value="messages">
            <PatientMessagingTab
              patientId={patient.id}
              initialConversationId={conversationId}
            />
          </TabsContent>

          <TabsContent value="settings">
            <PatientSettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboardPage;