"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PatientSettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your patient profile and preferences here. Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientSettingsTab;