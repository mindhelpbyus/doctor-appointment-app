import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-averta text-foreground">Register</CardTitle>
          <CardDescription className="font-averta text-muted-foreground">Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-averta text-foreground">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required className="rounded-sm border-foreground focus:border-basil" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-averta text-foreground">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="rounded-sm border-foreground focus:border-basil" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-averta text-foreground">Password</Label>
            <Input id="password" type="password" required className="rounded-sm border-foreground focus:border-basil" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="font-averta text-foreground">Confirm Password</Label>
            <Input id="confirm-password" type="password" required className="rounded-sm border-foreground focus:border-basil" />
          </div>
          <Button type="submit" className="w-full" variant="custom-primary" size="custom-sm">Register</Button>
          <p className="text-center text-sm text-muted-foreground font-averta">
            Already have an account?{' '}
            <Link to="/login" className="text-basil hover:text-dark-basil">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;