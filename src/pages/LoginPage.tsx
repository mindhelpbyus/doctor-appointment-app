import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { getPatients } from '@/services/localApi';
import { loginUser } from '@/utils/auth'; // Import loginUser

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = getPatients().find(u => u.email === email);

    if (user) {
      loginUser(user.id, 'patient'); // Log in the patient
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
      loginUser(demoPatient.id, 'patient'); // Log in the demo patient
      showSuccess('Logged in as Demo Patient!');
      navigate('/dashboard');
    } else {
      showError('Demo patient account not found.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
          <Button type="submit" className="w-full" onClick={handleLogin}>Login</Button>
          <Button variant="outline" className="w-full" onClick={handleDemoLogin}>Login as Demo Patient</Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;