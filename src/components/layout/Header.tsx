import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, SearchIcon, MessageSquare } from 'lucide-react'; // Import MessageSquare icon
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import GlobalSearch from '@/components/common/GlobalSearch';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <header className="bg-background text-foreground border-b p-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            HealthConnect
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center font-medium">
            <Button variant="ghost" onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" /> Search
            </Button>
            <Link to="/messages" className="hover:text-primary flex items-center gap-2"> {/* New Messages link */}
              <MessageSquare className="h-5 w-5" /> Messages
            </Link>
            <Link to="/login" className="hover:text-primary">Patient Login</Link>
            <Link to="/provider-login">
              <Button variant="outline">Provider Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <SearchIcon className="h-6 w-6" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 p-4">
                  <Link to="/" className="text-lg font-semibold hover:text-primary">Home</Link>
                  <Link to="/messages" className="text-lg font-semibold hover:text-primary flex items-center gap-2"> {/* New Messages link */}
                    <MessageSquare className="h-5 w-5 mr-2" /> Messages
                  </Link>
                  <Link to="/login" className="text-lg font-semibold hover:text-primary">Patient Login</Link>
                  <Link to="/provider-login">
                    <Button variant="outline" className="w-full">Provider Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
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