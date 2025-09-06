import React from 'react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground p-4 text-center shadow-inner mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} HealthConnect. All rights reserved.</p>
        <div className="flex justify-center items-center gap-4 mt-2">
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">Admin Login</Link>
          <MadeWithDyad />
        </div>
      </div>
    </footer>
  );
};

export default Footer;