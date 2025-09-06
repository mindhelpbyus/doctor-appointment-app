"use client";

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
import { MessagingSection, DoctorAvailabilityCalendar, DoctorClientsTab } from '@/components/dashboard/doctor'; // Import new DoctorClientsTab
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IAvailability } from '@/models/Doctor';

const DoctorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { conversationId } = useParams<{ conversationId?: string }>();

  const [doctor, setDoctor] = useState<Doctor | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [specialtyName, setSpecialtyName] = useState<string>('');
  const [specialties, setSpecialties] = useState<any[]>([]);

  const currentUserId = getLoggedInUser()?.id;
  const currentUserType = getLoggedInUser()?.type;

  const loadDoctorData = useCallback(() => {
    if (!currentUserId || currentUserType !== 'doctor') {
      navigate('/provider-login');
      return;
    }

    console.log("Loading doctor data for ID:", currentUserId); // Log for debugging
    const fetchedDoctor = getDoctorById(currentUserId);
    setDoctor(fetchedDoctor);

    if (fetchedDoctor) {
      console.log("Doctor found:", fetchedDoctor.fullName); // Log for debugging
      const allAppointments = getAppointments().filter(a => a.doctorId === fetchedDoctor.id);
      const now = new Date();
      setUpcomingAppointments(allAppointments.filter(a => new Date(a.datetime) >= now && a.status === 'booked'));
      setPastAppointments(allAppointments.filter(a => new Date(a.datetime) < now || a.status !== 'booked'));

      const fetchedSpecialties = getSpecialties();
      setSpecialties(fetchedSpecialties);
      const specialty = fetchedSpecialties.find(s => s.id === fetchedDoctor.specialtyId);
      setSpecialtyName(specialty?.name || 'N/A');

      const fetchedConversations = getConversationsForUser(currentUserId);
      setConversations(fetchedConversations);
    } else {
      console.error("Doctor not found for ID:", currentUserId); // Log error if doctor not found
    }
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
    console.log("User logged out."); // Log logout action
  };

  const handleSaveAvailability = (updatedAvailability: IAvailability[]) => {
    if (doctor) {
      updateDoctorWeeklyAvailability(doctor.id, updatedAvailability);
      console.log("Doctor availability updated for ID:", doctor.id); // Log availability update
      // Optionally, re-fetch doctor data to ensure state is fully updated
      setDoctor(prevDoctor => prevDoctor ? { ...prevDoctor, weeklyAvailability: updatedAvailability } : prevDoctor);
    } else {
      console.error("Attempted to save availability without a doctor object."); // Log error
    }
  };

  if (!doctor) {
    return <div className="text-center py-10">Loading doctor dashboard...</div>;
  }

  const totalClients = new Set(conversations.map(conv => conv.participantIds.find(id => id !== doctor.id))).size;
  const unreadMessagesCount = conversations.reduce((sum, conv) => {
    const messagesForConv = getMessagesForConversation(conv.id);
    const unreadForDoctor = messagesForConv.filter(msg => !msg.read && msg.receiverId === doctor.id);
    return sum + unreadForDoctor.length;
  }, 0);

  const sessionsThisWeek = upcomingAppointments.filter(appt => {
    const apptDate = new Date(appt.datetime);
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    startOfWeek.setHours(0, 0, 0, 0); // Set to beginning of the day
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day
    return apptDate >= startOfWeek && apptDate <= endOfWeek;
  }).length;

  const getPatientName = (patientId: string) => getPatientById(patientId)?.name || 'Unknown Patient';
  const getSpecialtyName = (specialtyId: string) => specialties.find(s => s.id === specialtyId)?.name || 'N/A';

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'messages', label: 'Messages' },
    { value: 'availability', label: 'Availability' },
    { value: 'clients', label: 'My Patients' }, // New tab
    { value: 'schedule', label: 'Schedule' },
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
      default: return 'grid-cols-1';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2"> {/* Adjusted for logo only */}
                <img src="/medixy.jpeg" alt="Medixy Logo" className="h-10 w-auto" /> {/* Increased height */}
              </Link>
              <Badge className="bg-accent text-accent-foreground border-primary/20">
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${getGridColsClass(tabs.length)} mb-8`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalClients}</div>
                  <p className="text-xs text-muted-foreground">Patients you've interacted with</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sessionsThisWeek}</div>
                  <p className="text-xs text-muted-foreground">{upcomingAppointments.length} upcoming</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <StarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{doctor.rating.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">From patient reviews</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{unreadMessagesCount}</div>
                  <p className="text-xs text-muted-foreground">From your patients</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingAppointments.map(appt => (
                          <TableRow key={appt.id}>
                            <TableCell className="font-medium">{getPatientName(appt.patientId)}</TableCell>
                            <TableCell>{new Date(appt.datetime).toLocaleString()}</TableCell>
                            <TableCell><Badge>{appt.type}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center text-gray-700">
                    <Stethoscope className="h-5 w-5 mr-2 text-primary" /> Specialty: {specialtyName}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <MapPinIcon className="h-5 w-5 mr-2 text-primary" /> Clinic: {doctor.clinicAddress}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <ClockIcon className="h-5 w-5 mr-2 text-primary" /> Experience: {doctor.yearsExperience} years
                  </p>
                </CardContent>
              </Card>
            </div>
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