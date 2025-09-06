import React from 'react';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background p-4 text-center shadow-inner mt-auto font-averta"> {/* Using new foreground/background colors */}
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} HealthConnect. All rights reserved.</p>
        <div className="flex justify-center items-center gap-4 mt-2">
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-basil">Admin Login</Link> {/* Using new muted-foreground and basil colors */}
          <MadeWithDyad />
        </div>
      </div>
    </footer>
  );
};

export default Footer;