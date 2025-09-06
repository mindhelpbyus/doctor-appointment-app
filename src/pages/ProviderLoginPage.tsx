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
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-12"> {/* Added vertical padding */}
      <Card className="w-full max-w-md rounded-2xl shadow-medium border-none bg-background p-6"> {/* Enhanced card styling */}
        <CardHeader className="text-center pb-6"> {/* Increased bottom padding */}
          <CardTitle className="text-3xl font-recoleta text-foreground mb-2">Provider Login</CardTitle> {/* Serif font, larger */}
          <CardDescription className="font-averta text-muted-foreground text-base">Access your agency dashboard or view a doctor profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6"> {/* Increased spacing */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-averta text-foreground text-sm font-semibold">Email</Label> {/* Semibold label */}
            <Input
              id="email"
              type="email"
              placeholder="manager@agency.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border-granite focus:border-primary text-foreground placeholder:text-stone font-averta px-4 py-2" // Refined input styling
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-averta text-foreground text-sm font-semibold">Password</Label> {/* Semibold label */}
            <Input id="password" type="password" required defaultValue="password" className="rounded-md border-granite focus:border-primary text-foreground placeholder:text-stone font-averta px-4 py-2" /> {/* Refined input styling */}
          </div>
          <Button onClick={handleLogin} className="w-full shadow-md hover:shadow-lg" variant="custom-primary" size="custom-sm">Login</Button> {/* Button with shadow */}
          <div className="space-y-3 pt-2"> {/* Increased spacing and top padding */}
            <Button variant="custom-secondary" className="w-full shadow-md hover:shadow-lg" onClick={handleDemoAgencyProviderLogin} size="custom-sm">Login as Demo Agency Admin</Button>
            <Button variant="custom-tertiary" className="w-full shadow-md hover:shadow-lg" onClick={handleDemoIndividualDoctorLogin} size="custom-sm">Login as Demo Individual Doctor</Button>
            <Button variant="ghost" className="w-full text-primary hover:text-dark-health-blue font-semibold" onClick={handleDemoAgencyDoctorLogin} size="custom-sm">Login as Demo Agency Doctor</Button> {/* Semibold link */}
          </div>
          <p className="text-center text-sm text-muted-foreground pt-4 font-averta"> {/* Increased top padding */}
            Want to list your practice on HealthConnect?{' '}
            <Link to="/onboard-provider" className="text-primary hover:text-dark-health-blue font-semibold">Register here</Link> {/* Semibold link */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderLoginPage;