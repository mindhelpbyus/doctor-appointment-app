'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Calendar,
  Users,
  Settings,
  LogOut,
  Stethoscope,
  StarIcon,
  ClockIcon,
  MapPinIcon,
  CalendarDays,
} from 'lucide-react';
import { getLoggedInUser, logoutUser } from '@/utils/auth';
import {
  getDoctorById,
  getAppointments,
  getConversationsForUser,
  getPatientById,
  getSpecialties,
  getMessagesForConversation,
  updateDoctorWeeklyAvailability,
} from '@/services/localApi';
import { Doctor } from '@/data/doctors';
import { Appointment } from '@/data/appointments';
import { Conversation } from '@/data/chat';
import { MessagingSection, DoctorAvailabilityCalendar, DoctorClientsTab } from '@/components/dashboard/doctor';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IAvailability } from '@/models/Doctor';
import Dashboard from '@/components/Dashboard'; // Import the new Dashboard component

interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const DoctorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId?: string }>();

  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');

  const currentUserId = getLoggedInUser()?.id;
  const currentUserType = getLoggedInUser()?.type;

  const loadDoctorData = useCallback(() => {
    if (!currentUserId || currentUserType !== 'doctor') {
      navigate('/provider-login');
      return;
    }
    const fetchedDoctor = getDoctorById(currentUserId);
    setDoctor(fetchedDoctor);
  }, [currentUserId, currentUserType, navigate]);

  useEffect(() => {
    loadDoctorData();
  }, [loadDoctorData]);

  useEffect(() => {
    if (conversationId) {
      setActiveTab('messages');
    }
  }, [conversationId]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleSaveAvailability = (updatedAvailability: IAvailability[]) => {
    if (doctor) {
      updateDoctorWeeklyAvailability(doctor.id, updatedAvailability);
      setDoctor(prevDoctor => prevDoctor ? { ...prevDoctor, weeklyAvailability: updatedAvailability } : prevDoctor);
    }
  };

  if (!doctor) {
    return <div className="text-center py-10">Loading doctor dashboard...</div>;
  }

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'messages', label: 'Messages' },
    { value: 'availability', label: 'Availability' },
    { value: 'clients', label: 'My Patients' },
    { value: 'schedule', label: 'Schedule' },
    { value: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex flex-col items-start">
                <span className="text-2xl font-recoleta font-bold text-primary">Docsy</span>
                <span className="text-xs text-muted-foreground font-averta -mt-1">
                  Product of Bedrock health solution.
                </span>
              </Link>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Stethoscope className="w-4 h-4" />
                <span className="ml-1 capitalize">Doctor</span>
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Welcome, Dr. {doctor.fullName.split(' ')[1]}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="w-full overflow-x-auto pb-2">
            <TabsList className="min-w-max mb-8">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview">
            {/* --- THIS IS THE NEW DYNAMIC DASHBOARD -- */}
            <Dashboard userRole="DOCTOR" />
          </TabsContent>

          <TabsContent value="messages">
            <MessagingSection currentDoctorId={doctor.id} />
          </TabsContent>

          <TabsContent value="availability">
            <DoctorAvailabilityCalendar
              initialAvailability={doctor.weeklyAvailability || []}
              onSave={handleSaveAvailability}
            />
          </TabsContent>

          <TabsContent value="clients">
            <DoctorClientsTab currentDoctorId={doctor.id} />
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Schedule management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
