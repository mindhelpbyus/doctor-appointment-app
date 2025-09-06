"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, SearchIcon, MessageSquare, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import GlobalSearch from '@/components/common/GlobalSearch';
import { getLoggedInUser, logoutUser } from '@/utils/auth';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!getLoggedInUser());
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <header className="bg-background text-foreground border-b border-border p-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-basil font-recoleta"> {/* Using new basil color and recoleta font */}
            HealthConnect
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center font-averta font-semibold">
            <Button variant="ghost" onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2 text-muted-foreground hover:text-basil">
              <SearchIcon className="h-5 w-5" /> Search
            </Button>
            {isLoggedIn && (
              <>
                <Link to="/messages" className="text-muted-foreground hover:text-basil flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" /> Messages
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-basil">
                  <LogOut className="h-5 w-5" /> Logout
                </Button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="text-muted-foreground hover:text-basil">Patient Login</Link>
                <Link to="/provider-login">
                  <Button variant="custom-secondary" size="custom-sm">Provider Login</Button> {/* Using new custom-secondary button */}
                </Link>
                <Link to="/register">
                  <Button variant="custom-primary" size="custom-sm">Sign Up</Button> {/* Using new custom-primary button */}
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-foreground">
              <SearchIcon className="h-6 w-6" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background text-foreground">
                <nav className="flex flex-col space-y-4 p-4 font-averta font-semibold">
                  <Link to="/" className="text-lg text-foreground hover:text-basil">Home</Link>
                  {isLoggedIn && (
                    <>
                      <Link to="/messages" className="text-lg text-foreground hover:text-basil flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 mr-2" /> Messages
                      </Link>
                      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-lg text-foreground hover:text-basil flex items-center gap-2">
                        <LogOut className="h-5 w-5 mr-2" /> Logout
                      </Button>
                    </>
                  )}
                  {!isLoggedIn && (
                    <>
                      <Link to="/login" className="text-lg text-foreground hover:text-basil">Patient Login</Link>
                      <Link to="/provider-login">
                        <Button variant="custom-secondary" className="w-full">Provider Login</Button>
                      </Link>
                      <Link to="/register">
                        <Button variant="custom-primary" className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;