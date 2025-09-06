"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AgencyPerformanceReport, DoctorPerformanceReport, PromotionReport } from '@/data/reports';

interface AgencyReportsTabProps {
  agencyPerformance: AgencyPerformanceReport | undefined;
  doctorPerformance: DoctorPerformanceReport[];
  promotionReportsData: PromotionReport[];
}

const AgencyReportsTab: React.FC<AgencyReportsTabProps> = ({
  agencyPerformance,
  doctorPerformance,
  promotionReportsData,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Agency Performance Overview</h2>
      {agencyPerformance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${agencyPerformance.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencyPerformance.totalAppointments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg. Appt. Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${agencyPerformance.averageAppointmentValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {agencyPerformance?.monthlyRevenue && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={agencyPerformance.monthlyRevenue} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 mt-8">Doctor Performance Reports</h2>
      <Card>
        <CardHeader>
          <CardTitle>Individual Doctor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {doctorPerformance.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorPerformance.map((docReport) => (
                  <TableRow key={docReport.doctorId}>
                    <TableCell className="font-medium">{docReport.doctorName}</TableCell>
                    <TableCell>{docReport.averageRating.toFixed(1)} <StarIcon className="inline-block h-4 w-4 fill-yellow-500 text-yellow-500 ml-1" /></TableCell>
                    <TableCell>{docReport.totalAppointments}</TableCell>
                    <TableCell>{docReport.patientSatisfactionScore.toFixed(1)}/5</TableCell>
                    <TableCell>${docReport.revenueGenerated.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No doctor performance data available for this agency.</p>
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 mt-8">Promotion Performance Reports</h2>
      <Card>
        <CardHeader>
          <CardTitle>Promotion Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          {promotionReportsData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Promotion</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Redemptions</TableHead>
                  <TableHead>Revenue Generated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotionReportsData.map((promoReport) => (
                  <TableRow key={promoReport.promotionId}>
                    <TableCell className="font-medium">{promoReport.promotionTitle}</TableCell>
                    <TableCell>
                      <Badge variant={promoReport.status === 'approved' ? 'default' : promoReport.status === 'pending' ? 'secondary' : 'destructive'}>
                        {promoReport.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{promoReport.redemptions}</TableCell>
                    <TableCell>${promoReport.revenueGenerated.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No promotion reports available for this agency.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyReportsTab;