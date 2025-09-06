import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, XIcon, UserIcon, LogOutIcon, LayoutDashboard, MessageSquare, CalendarDays, Settings, BriefcaseBusiness, HeartHandshake, SearchIcon, MailIcon } from 'lucide-react';
import { getLoggedInUser, logoutUser } from '@/utils/auth';
import { User } from '@/data/users';
import { showSuccess } from '@/utils/toast';
import { getDoctorById } from '@/services/localApi';

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      const loggedInUser = getLoggedInUser();
      setUser(loggedInUser);
    };

    // Initial check
    handleAuthChange();

    // Listen for changes
    window.addEventListener('authChange', handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    showSuccess('Logged out successfully!');
    navigate('/');
    setIsSheetOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.type === 'patient') return '/dashboard';
    if (user.type === 'agencyUser') return `/agency-dashboard/${user.agencyId}`;
    if (user.type === 'doctor') return '/doctor-dashboard';
    if (user.type === 'admin') return '/admin';
    return '/';
  };

  const getProfileLink = () => {
    if (!user) return '/login';
    if (user.type === 'doctor') {
      const doctor = getDoctorById(user.id);
      return `/doctor/${doctor?.id}`;
    }
    return '/profile'; // Generic profile for patients/agency users
  };

  const renderAuthButtons = () => (
    <>
      <Button asChild variant="custom-secondary" size="custom-sm" className="w-full md:w-auto">
        <Link to="/login" onClick={() => setIsSheetOpen(false)}>Login</Link>
      </Button>
      <Button asChild variant="custom-primary" size="custom-sm" className="w-full md:w-auto">
        <Link to="/register" onClick={() => setIsSheetOpen(false)}>Register</Link>
      </Button>
      <Button asChild variant="ghost" size="custom-sm" className="w-full md:w-auto text-primary hover:text-dark-health-blue">
        <Link to="/provider-login" onClick={() => setIsSheetOpen(false)}>Provider Login</Link>
      </Button>
    </>
  );

  const renderUserMenu = () => (
    <>
      <Link to={getDashboardLink()} className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
        <LayoutDashboard className="h-5 w-5 text-primary" />
        <span className="font-averta">Dashboard</span>
      </Link>
      {user?.type === 'patient' && (
        <>
          <Link to="/appointments" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <CalendarDays className="h-5 w-5 text-primary" />
            <span className="font-averta">Appointments</span>
          </Link>
          <Link to="/messages" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="font-averta">Messages</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <UserIcon className="h-5 w-5 text-primary" />
            <span className="font-averta">Profile</span>
          </Link>
        </>
      )}
      {user?.type === 'doctor' && (
        <>
          <Link to={getProfileLink()} className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <UserIcon className="h-5 w-5 text-primary" />
            <span className="font-averta">My Profile</span>
          </Link>
          <Link to="/doctor-settings" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <Settings className="h-5 w-5 text-primary" />
            <span className="font-averta">Settings</span>
          </Link>
        </>
      )}
      {user?.type === 'agencyUser' && (
        <>
          <Link to="/agency-profile" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <BriefcaseBusiness className="h-5 w-5 text-primary" />
            <span className="font-averta">Agency Profile</span>
          </Link>
          <Link to="/agency-settings" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
            <Settings className="h-5 w-5 text-primary" />
            <span className="font-averta">Settings</span>
          </Link>
        </>
      )}
      {user?.type === 'admin' && (
        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
          <HeartHandshake className="h-5 w-5 text-primary" />
          <span className="font-averta">Admin Panel</span>
        </Link>
      )}
      <Button onClick={handleLogout} variant="ghost" size="custom-sm" className="w-full justify-start text-destructive hover:bg-destructive/10 mt-2">
        <LogOutIcon className="h-5 w-5 mr-2" />
        <span className="font-averta">Logout</span>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8 lg:px-16">
        <Link to="/" className="flex items-center gap-2"> {/* Adjusted to flex items-center for logo only */}
          <img src="/medixy.jpeg" alt="Medixy Logo" className="h-14 w-auto" /> {/* Increased height */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/search" className="text-foreground hover:text-primary transition-colors font-averta">Find a Provider</Link>
          <Link to="/agencies" className="text-foreground hover:text-primary transition-colors font-averta">Agencies</Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors font-averta">About Us</Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-averta">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative group">
              <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary">
                <UserIcon className="h-5 w-5" />
                <span className="font-averta">{user.firstName || 'User'}</span>
              </Button>
              <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2 space-y-1">
                {renderUserMenu()}
              </div>
            </div>
          ) : (
            renderAuthButtons()
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6 text-foreground" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px] flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}> {/* Adjusted for logo only */}
                <img src="/medixy.jpeg" alt="Medixy Logo" className="h-12 w-auto" /> {/* Increased height */}
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                <XIcon className="h-6 w-6 text-foreground" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>
            <nav className="flex flex-col gap-2 py-4 flex-grow">
              <Link to="/search" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
                <SearchIcon className="h-5 w-5 text-primary" />
                <span className="font-averta">Find a Provider</span>
              </Link>
              <Link to="/agencies" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
                <BriefcaseBusiness className="h-5 w-5 text-primary" />
                <span className="font-averta">Agencies</span>
              </Link>
              <Link to="/about" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
                <HeartHandshake className="h-5 w-5 text-primary" />
                <span className="font-averta">About Us</span>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 px-4 py-2 text-foreground hover:bg-accent/20 rounded-md transition-colors" onClick={() => setIsSheetOpen(false)}>
                <MailIcon className="h-5 w-5 text-primary" />
                <span className="font-averta">Contact</span>
              </Link>
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                {user ? renderUserMenu() : renderAuthButtons()}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;