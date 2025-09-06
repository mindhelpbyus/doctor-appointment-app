import React, { useState, useEffect } from 'react';
import AgencyCard from '@/components/common/AgencyCard';
import SpecialtyCard from '@/components/common/SpecialtyCard';
import { getAgencies, getSpecialties } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Specialty } from '@/data/specialties';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import GlobalSearch from '@/components/common/GlobalSearch';

const HomePage = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setAgencies(getAgencies().filter(a => a.isActive));
    setSpecialties(getSpecialties());
  }, []);

  return (
    <>
      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="relative -mx-4 -mt-8">
          <div 
            className="w-full h-96 bg-cover bg-center flex items-center justify-center text-center text-white p-4 rounded-lg overflow-hidden"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1600x600/BFDBFE/3B82F6?text=Find+Your+Care')` }}
          >
            <div className="w-full max-w-3xl">
              <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                Find and book your perfect provider.
              </h1>
              <p className="text-xl mb-8">
                Search for doctors, specialists, and clinics in your area.
              </p>
              <Button size="lg" onClick={() => setIsSearchOpen(true)} className="w-full max-w-2xl mx-auto text-lg">
                <SearchIcon className="h-6 w-6 mr-3" /> Search by doctor, specialty, or location...
              </Button>
            </div>
          </div>
        </section>

        {/* Browse by Specialty Section */}
        {specialties.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Browse by Specialty</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {specialties.map(specialty => (
                <SpecialtyCard key={specialty.id} specialty={specialty} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Agencies Section */}
        {agencies.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Featured Healthcare Providers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {agencies.map(agency => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default HomePage;