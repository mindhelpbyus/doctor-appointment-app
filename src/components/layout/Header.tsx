import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          HealthConnect
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link to="/search" className="hover:underline">Search Doctors</Link>
          <Link to="/appointments" className="hover:underline">My Appointments</Link>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">Register</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background text-foreground">
              <nav className="flex flex-col space-y-4 p-4">
                <Link to="/" className="text-lg font-semibold hover:text-primary">Home</Link>
                <Link to="/search" className="text-lg font-semibold hover:text-primary">Search Doctors</Link>
                <Link to="/appointments" className="text-lg font-semibold hover:text-primary">My Appointments</Link>
                <Link to="/login">
                  <Button className="w-full">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="w-full">Register</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;