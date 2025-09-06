import React from 'react';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground p-4 text-center shadow-inner mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} HealthConnect. All rights reserved.</p>
        <MadeWithDyad />
      </div>
    </footer>
  );
};

export default Footer;