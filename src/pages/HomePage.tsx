import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AgencyCard from '@/components/common/AgencyCard';
import { getAgencies } from '@/services/localApi';

interface Agency {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  address: string;
}

const HomePage = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    setAgencies(getAgencies());
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your Health, Simplified.
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Find and book appointments with top doctors and healthcare agencies effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/search">
            <Button size="lg" className="text-lg px-8 py-6">
              Find a Doctor
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Register for Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Agencies Section */}
      {agencies.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Featured Healthcare Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {agencies.map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;