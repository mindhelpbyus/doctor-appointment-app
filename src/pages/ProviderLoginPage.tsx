import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAgencyUsers, getDoctorById } from '@/services/localApi';
import { showError, showSuccess } from '@/utils/toast';
import { loginUser } from '@/utils/auth';

const ProviderLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = getAgencyUsers().find(u => u.email === email);

    if (user) {
      loginUser(user.id, 'agencyUser');
      showSuccess('Login successful!');
      navigate(`/agency-dashboard/${user.agencyId}`);
    } else {
      showError('Provider not found. Please check your email.');
    }
  };

  const handleDemoAgencyProviderLogin = () => {
    const demoProvider = getAgencyUsers().find(u => u.id === 'user-demo');
    if (demoProvider) {
      setEmail(demoProvider.email);
      loginUser(demoProvider.id, 'agencyUser');
      showSuccess('Logged in as Demo Agency Admin!');
      navigate(`/agency-dashboard/${demoProvider.agencyId}`);
    } else {
      showError('Demo agency provider account not found.');
    }
  };

  const handleDemoIndividualDoctorLogin = () => {
    const demoDoctorId = 'doc-1';
    const demoDoctor = getDoctorById(demoDoctorId);

    if (demoDoctor) {
      loginUser(demoDoctor.id, 'doctor');
      showSuccess(`Logged in as Dr. ${demoDoctor.fullName}!`);
      navigate('/doctor-dashboard');
    } else {
      showError('Demo individual doctor profile not found.');
    }
  };

  const handleDemoAgencyDoctorLogin = () => {
    const demoDoctorId = 'doc-2';
    const demoDoctor = getDoctorById(demoDoctorId);

    if (demoDoctor) {
      loginUser(demoDoctor.id, 'doctor');
      showSuccess(`Logged in as Dr. ${demoDoctor.fullName} (Agency Doctor)!`);
      navigate('/doctor-dashboard');
    } else {
      showError('Demo agency doctor profile not found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-averta text-foreground">Provider Login</CardTitle>
          <CardDescription className="font-averta text-muted-foreground">Access your agency dashboard or view a doctor profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-averta text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="manager@agency.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm border-foreground focus:border-basil"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-averta text-foreground">Password</Label>
            <Input id="password" type="password" required defaultValue="password" className="rounded-sm border-foreground focus:border-basil" />
          </div>
          <Button onClick={handleLogin} className="w-full" variant="custom-primary" size="custom-sm">Login</Button>
          <div className="space-y-2 pt-2">
            <Button variant="custom-secondary" className="w-full" onClick={handleDemoAgencyProviderLogin} size="custom-sm">Login as Demo Agency Admin</Button>
            <Button variant="custom-tertiary" className="w-full" onClick={handleDemoIndividualDoctorLogin} size="custom-sm">Login as Demo Individual Doctor</Button>
            <Button variant="ghost" className="w-full text-basil hover:text-dark-basil" onClick={handleDemoAgencyDoctorLogin} size="custom-sm">Login as Demo Agency Doctor</Button>
          </div>
          <p className="text-center text-sm text-muted-foreground pt-2 font-averta">
            Want to list your practice on HealthConnect?{' '}
            <Link to="/onboard-provider" className="text-basil hover:text-dark-basil">Register here</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderLoginPage;