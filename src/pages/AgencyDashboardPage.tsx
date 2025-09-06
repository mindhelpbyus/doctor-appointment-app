"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getLoggedInUser, logoutUser } from '@/utils/auth';
import {
  getAgencyById,
  getDoctorsByAgencyId,
  getAppointmentsForDoctors,
  getPromotionsByAgencyId,
  getSpecialties,
  getAgencyUserById,
  getAgencyPerformanceReport,
  getDoctorPerformanceReports,
  getPromotionReports,
} from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Doctor } from '@/data/doctors';
import { Promotion } from '@/data/promotions';
import { Specialty } from '@/data/specialties';
import { showError } from '@/utils/toast';
import {
  AgencyPerformanceReport,
  DoctorPerformanceReport,
  PromotionReport,
} from '@/data/reports';

import {
  AgencyDashboardHeader,
  AgencyOverviewTab,
  AgencyDoctorsTab,
  AgencyPromotionsTab,
  AgencyReportsTab,
  AgencySettingsTab,
} from '@/components/agency-dashboard';

const AgencyDashboardPage: React.FC = () => {
  const { agencyId } = useParams<{ agencyId: string }>();
  const navigate = useNavigate();
  const [agency, setAgency] = useState<Agency | undefined>(undefined);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // State for reports data
  const [agencyPerformance, setAgencyPerformance] = useState<AgencyPerformanceReport | undefined>(undefined);
  const [doctorPerformance, setDoctorPerformance] = useState<DoctorPerformanceReport[]>([]);
  const [promotionReportsData, setPromotionReportsData] = useState<PromotionReport[]>([]);

  const currentUserId = getLoggedInUser()?.id;
  const currentUserType = getLoggedInUser()?.type;

  const loadAgencyData = useCallback(() => {
    if (!currentUserId || currentUserType !== 'agencyUser' || !agencyId) {
      navigate('/provider-login');
      return;
    }

    const loggedInAgencyUser = getAgencyUserById(currentUserId);
    if (!loggedInAgencyUser || loggedInAgencyUser.agencyId !== agencyId) {
      showError('Access Denied: You do not have permission to view this agency dashboard.');
      navigate('/provider-login');
      return;
    }

    const fetchedAgency = getAgencyById(agencyId);
    if (!fetchedAgency) {
      showError('Agency not found.');
      navigate('/provider-login');
      return;
    }
    setAgency(fetchedAgency);

    const fetchedDoctors = getDoctorsByAgencyId(agencyId);
    setDoctors(fetchedDoctors);

    const fetchedPromotions = getPromotionsByAgencyId(agencyId);
    setPromotions(fetchedPromotions);

    const fetchedSpecialties = getSpecialties();
    setSpecialties(fetchedSpecialties);

    // Fetch report data
    setAgencyPerformance(getAgencyPerformanceReport());
    setDoctorPerformance(getDoctorPerformanceReports(agencyId));
    setPromotionReportsData(getPromotionReports(agencyId));
  }, [agencyId, currentUserId, currentUserType, navigate]);

  useEffect(() => {
    loadAgencyData();
  }, [loadAgencyData]);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handlePromotionsUpdated = () => {
    // Re-fetch promotions after a new one is added
    if (agencyId) {
      setPromotions(getPromotionsByAgencyId(agencyId));
    }
  };

  if (!agency) {
    return <div className="text-center py-10">Loading agency dashboard...</div>;
  }

  // Calculate agency-wide metrics for overview
  const totalDoctors = doctors.length;
  const totalActiveAppointments = getAppointmentsForDoctors(doctors.map(d => d.id)).length;
  const totalPromotions = promotions.length;

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'doctors', label: 'Doctors' },
    { value: 'promotions', label: 'Promotions' },
    { value: 'reports', label: 'Reports' },
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
      default: return 'grid-cols-1'; // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AgencyDashboardHeader
        userName={getLoggedInUser()?.name || 'Agency Admin'}
        onLogout={handleLogout}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{agency.name} Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${getGridColsClass(tabs.length)} mb-8`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <AgencyOverviewTab
              agency={agency}
              totalDoctors={totalDoctors}
              totalActiveAppointments={totalActiveAppointments}
              totalPromotions={totalPromotions}
              agencyPerformance={agencyPerformance}
            />
          </TabsContent>

          <TabsContent value="doctors">
            <AgencyDoctorsTab
              doctors={doctors}
              specialties={specialties}
            />
          </TabsContent>

          <TabsContent value="promotions">
            <AgencyPromotionsTab
              agencyId={agency.id}
              promotions={promotions}
              onPromotionsUpdated={handlePromotionsUpdated}
            />
          </TabsContent>

          <TabsContent value="reports">
            <AgencyReportsTab
              agencyPerformance={agencyPerformance}
              doctorPerformance={doctorPerformance}
              promotionReportsData={promotionReportsData}
            />
          </TabsContent>

          <TabsContent value="settings">
            <AgencySettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgencyDashboardPage;