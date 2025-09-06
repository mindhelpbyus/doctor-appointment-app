import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProviderOnboardingForm from '@/components/forms/ProviderOnboardingForm';

const ProviderOnboardingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Register Your Practice</CardTitle>
          <CardDescription>Join HealthConnect and reach more patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProviderOnboardingForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderOnboardingPage;