import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light-grey"> {/* Added a subtle background to the entire layout */}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10 md:px-8 lg:px-16"> {/* Increased vertical padding */}
        <Outlet /> {/* This is where the routed components will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;