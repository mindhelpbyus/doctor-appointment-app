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
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-12"> {/* Added vertical padding */}
      <Card className="w-full max-w-md rounded-2xl shadow-medium border-none bg-background p-6"> {/* Enhanced card styling */}
        <CardHeader className="text-center pb-6"> {/* Increased bottom padding */}
          <CardTitle className="text-3xl font-recoleta text-foreground mb-2">Login</CardTitle> {/* Serif font, larger */}
          <CardDescription className="font-averta text-muted-foreground text-base">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6"> {/* Increased spacing */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-averta text-foreground text-sm font-semibold">Email</Label> {/* Semibold label */}
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
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
          <Button type="submit" className="w-full shadow-md hover:shadow-lg" onClick={handleLogin} variant="custom-primary" size="custom-sm">Login</Button> {/* Button with shadow */}
          <Button variant="custom-secondary" className="w-full shadow-md hover:shadow-lg" onClick={handleDemoLogin} size="custom-sm">Login as Demo Patient</Button> {/* Button with shadow */}
          <p className="text-center text-sm text-muted-foreground font-averta pt-2"> {/* Added top padding */}
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-dark-health-blue font-semibold">Register</Link> {/* Semibold link */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;