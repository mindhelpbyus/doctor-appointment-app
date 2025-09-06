import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAgencyUsers } from '@/services/localApi';
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

  const handleDemoLogin = () => {
    const demoProvider = getAgencyUsers().find(u => u.id === 'user-demo');
    if (demoProvider) {
      setEmail(demoProvider.email); // Pre-fill email for visual feedback
      showSuccess('Logged in as Demo Provider!');
      navigate(`/agency-dashboard/${demoProvider.agencyId}`);
    } else {
      showError('Demo provider account not found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Provider Login</CardTitle>
          <CardDescription>Access your agency dashboard.</CardDescription>
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
          <Button variant="outline" className="w-full" onClick={handleDemoLogin}>Login as Demo Provider</Button>
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