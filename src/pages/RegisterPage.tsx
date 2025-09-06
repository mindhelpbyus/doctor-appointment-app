import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] py-12"> {/* Added vertical padding */}
      <Card className="w-full max-w-md rounded-2xl shadow-medium border-none bg-background p-6"> {/* Enhanced card styling */}
        <CardHeader className="text-center pb-6"> {/* Increased bottom padding */}
          <CardTitle className="text-3xl font-recoleta text-foreground mb-2">Register</CardTitle> {/* Serif font, larger */}
          <CardDescription className="font-averta text-muted-foreground text-base">Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6"> {/* Increased spacing */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-averta text-foreground text-sm font-semibold">Full Name</Label> {/* Semibold label */}
            <Input id="name" type="text" placeholder="John Doe" required className="rounded-md border-granite focus:border-basil text-foreground placeholder:text-stone font-averta px-4 py-2" /> {/* Refined input styling */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-averta text-foreground text-sm font-semibold">Email</Label> {/* Semibold label */}
            <Input id="email" type="email" placeholder="m@example.com" required className="rounded-md border-granite focus:border-basil text-foreground placeholder:text-stone font-averta px-4 py-2" /> {/* Refined input styling */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-averta text-foreground text-sm font-semibold">Password</Label> {/* Semibold label */}
            <Input id="password" type="password" required className="rounded-md border-granite focus:border-basil text-foreground placeholder:text-stone font-averta px-4 py-2" /> {/* Refined input styling */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="font-averta text-foreground text-sm font-semibold">Confirm Password</Label> {/* Semibold label */}
            <Input id="confirm-password" type="password" required className="rounded-md border-granite focus:border-basil text-foreground placeholder:text-stone font-averta px-4 py-2" /> {/* Refined input styling */}
          </div>
          <Button type="submit" className="w-full shadow-md hover:shadow-lg" variant="custom-primary" size="custom-sm">Register</Button> {/* Button with shadow */}
          <p className="text-center text-sm text-muted-foreground font-averta pt-2"> {/* Added top padding */}
            Already have an account?{' '}
            <Link to="/login" className="text-basil hover:text-dark-basil font-semibold">Login</Link> {/* Semibold link */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;