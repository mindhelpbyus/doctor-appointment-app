import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { getPatients } from '@/services/localApi';
import { loginUser } from '@/utils/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = getPatients().find(u => u.email === email);

    if (user) {
      loginUser(user.id, 'patient');
      showSuccess('Login successful!');
      navigate('/dashboard');
    } else {
      showError('Patient not found. Please check your email.');
    }
  };

  const handleDemoLogin = () => {
    const demoPatient = getPatients().find(p => p.id === 'pat-demo');
    if (demoPatient) {
      setEmail(demoPatient.email);
      loginUser(demoPatient.id, 'patient');
      showSuccess('Logged in as Demo Patient!');
      navigate('/dashboard');
    } else {
      showError('Demo patient account not found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-averta text-foreground">Login</CardTitle>
          <CardDescription className="font-averta text-muted-foreground">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-averta text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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
          <Button type="submit" className="w-full" onClick={handleLogin} variant="custom-primary" size="custom-sm">Login</Button>
          <Button variant="custom-secondary" className="w-full" onClick={handleDemoLogin} size="custom-sm">Login as Demo Patient</Button>
          <p className="text-center text-sm text-muted-foreground font-averta">
            Don't have an account?{' '}
            <Link to="/register" className="text-basil hover:text-dark-basil">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;