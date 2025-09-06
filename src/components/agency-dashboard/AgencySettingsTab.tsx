"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AgencySettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agency Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your agency's profile, branding, and user access here. Coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencySettingsTab;