import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, SearchIcon } from 'lucide-react';
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
          <nav className="hidden md:flex space-x-6 items-center font-medium">
            <Link to="/search" className="hover:text-primary">Features</Link>
            <Link to="/search" className="hover:text-primary">Pricing</Link>
            <Link to="/search" className="hover:text-primary">Resources</Link>
            <Button variant="ghost" onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2">
              <SearchIcon className="h-5 w-5" />
            </Button>
            <Link to="/provider-login">
              <Button variant="outline">Staff Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get a Demo</Button>
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
                  <Link to="/search" className="text-lg font-semibold hover:text-primary">Features</Link>
                  <Link to="/search" className="text-lg font-semibold hover:text-primary">Pricing</Link>
                  <Link to="/search" className="text-lg font-semibold hover:text-primary">Resources</Link>
                  <Link to="/provider-login">
                    <Button variant="outline" className="w-full">Staff Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full">Get a Demo</Button>
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