import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FeatureTabs from '@/components/common/FeatureTabs';
import { getAgencies, getSpecialties } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Specialty } from '@/data/specialties';
import SpecialtyCard from '@/components/common/SpecialtyCard';
import AgencyCard from '@/components/common/AgencyCard';
import GlobalSearch from '@/components/common/GlobalSearch';
import { SearchIcon } from 'lucide-react';

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
        <section className="relative -mx-4 -mt-8 md:-mx-16">
          <div
            className="w-full h-[60vh] min-h-[500px] bg-foreground flex items-center justify-center text-center text-background p-4 rounded-lg overflow-hidden" // Using new foreground/background colors
          >
            <div className="w-full max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-recoleta font-extrabold mb-4 leading-tight"> {/* Using Recoleta font */}
                Find and book your perfect provider.
              </h1>
              <p className="text-xl mb-8 opacity-90 font-averta"> {/* Using Averta font */}
                Search for doctors, specialists, and clinics in your area.
              </p>
              <Button size="custom-lg" variant="custom-primary" onClick={() => setIsSearchOpen(true)} className="bg-accent text-foreground hover:bg-accent/90"> {/* Using new custom-lg size and custom-primary variant */}
                <SearchIcon className="h-6 w-6 mr-3" /> Search Now
              </Button>
            </div>
          </div>
        </section>

        {/* Browse by Specialty Section */}
        {specialties.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 font-averta">Browse by Specialty</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {specialties.map(specialty => (
                <SpecialtyCard key={specialty.id} specialty={specialty} />
              ))}
            </div>
          </section>
        )}

        {/* Browse by Provider Section */}
        {agencies.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 font-averta">Browse by Provider</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {agencies.map(agency => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-averta">Run your practice with confidence</h2>
            <p className="text-muted-foreground text-lg mt-2 font-averta">All the tools you need, all in one place.</p>
          </div>
          <FeatureTabs />
        </section>
      </div>
    </>
  );
};

export default HomePage;