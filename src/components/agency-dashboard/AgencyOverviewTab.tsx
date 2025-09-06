"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, Stethoscope, Megaphone } from 'lucide-react';
import { Agency } from '@/data/agencies';
import { AgencyPerformanceReport } from '@/data/reports';

interface AgencyOverviewTabProps {
  agency: Agency;
  totalDoctors: number;
  totalActiveAppointments: number;
  totalPromotions: number;
  agencyPerformance: AgencyPerformanceReport | undefined;
}

const AgencyOverviewTab: React.FC<AgencyOverviewTabProps> = ({
  agency,
  totalDoctors,
  totalActiveAppointments,
  totalPromotions,
  agencyPerformance,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDoctors}</div>
            <p className="text-xs text-muted-foreground">Affiliated with your agency</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveAppointments}</div>
            <p className="text-xs text-muted-foreground">Across all agency doctors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPromotions}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (Est.)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${agencyPerformance?.totalRevenue.toLocaleString() || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agency Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Name:</strong> {agency.name}</p>
          <p><strong>Address:</strong> {agency.address}</p>
          <p><strong>Contact Email:</strong> {agency.contactEmail}</p>
          <p><strong>Status:</strong> <Badge variant={agency.isActive ? 'default' : 'destructive'}>{agency.isActive ? 'Active' : 'Inactive'}</Badge></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyOverviewTab;