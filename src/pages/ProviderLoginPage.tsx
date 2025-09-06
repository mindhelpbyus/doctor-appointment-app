import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAgencyUsers, getDoctorById } from '@/services/localApi'; // Import getDoctorById
import { showError, showSuccess } from '@/utils/toast';

const ProviderLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // This is a mock authentication. In a real app, you'd verify a password.
    const user = getAgencyUsers().find(u => u.email === email);

    if (user) {
      showSuccess('Login successful!');
      navigate(`/agency-dashboard/${user.agencyId}`);
    } else {
      showError('Provider not found. Please check your email.');
    }
  };

  const handleDemoAgencyProviderLogin = () => {
    const demoProvider = getAgencyUsers().find(u => u.id === 'user-demo');
    if (demoProvider) {
      setEmail(demoProvider.email); // Pre-fill email for visual feedback
      showSuccess('Logged in as Demo Agency Provider!');
      navigate(`/agency-dashboard/${demoProvider.agencyId}`);
    } else {
      showError('Demo agency provider account not found.');
    }
  };

  const handleDemoIndividualDoctorLogin = () => {
    // For individual doctors, we'll directly navigate to a demo doctor's profile page.
    // Dr. Evelyn Reed (doc-1) is an independent doctor in our mock data.
    const demoDoctorId = 'doc-1'; 
    const demoDoctor = getDoctorById(demoDoctorId);

    if (demoDoctor) {
      showSuccess(`Viewing profile for Dr. ${demoDoctor.fullName}!`);
      navigate(`/doctor/${demoDoctorId}`);
    } else {
      showError('Demo individual doctor profile not found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Provider Login</CardTitle>
          <CardDescription>Access your agency dashboard or view a doctor profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="manager@agency.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
          <Button onClick={handleLogin} className="w-full">Login</Button>
          <div className="space-y-2 pt-2">
            <Button variant="outline" className="w-full" onClick={handleDemoAgencyProviderLogin}>Login as Demo Agency Provider</Button>
            <Button variant="secondary" className="w-full" onClick={handleDemoIndividualDoctorLogin}>View Demo Individual Doctor Profile</Button>
          </div>
          <p className="text-center text-sm text-muted-foreground pt-2">
            Want to list your practice on HealthConnect?{' '}
            <Link to="/onboard-provider" className="text-primary hover:underline">Register here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderLoginPage;