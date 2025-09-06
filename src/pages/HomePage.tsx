import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureTabs from '@/components/common/FeatureTabs';
import { getAgencies, getSpecialties } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Specialty } from '@/data/specialties';
import SpecialtyCard from '@/components/common/SpecialtyCard';
import AgencyCard from '@/components/common/AgencyCard';
import SearchBar from '@/components/common/SearchBar';

const HomePage = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAgencies(getAgencies().filter(a => a.isActive));
    setSpecialties(getSpecialties());
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <>
      <div className="space-y-20"> {/* Increased overall spacing */}
        {/* Hero Section */}
        <section className="relative -mx-4 -mt-8 md:-mx-8 lg:-mx-16"> {/* Adjusted negative margins for full width */}
          <div
            className="w-full h-[65vh] min-h-[550px] bg-gradient-to-r from-charcoal to-stone flex items-center justify-center text-center text-background p-6 rounded-2xl overflow-hidden shadow-medium" // Enhanced background and shadow
          >
            <div className="w-full max-w-4xl"> {/* Increased max-width for content */}
              <h1 className="text-5xl md:text-7xl font-recoleta font-extrabold mb-6 leading-tight text-primary"> {/* Changed text-accent to text-primary */}
                Find and book your perfect provider.
              </h1>
              <p className="text-xl md:text-2xl mb-10 opacity-90 font-averta text-stone"> {/* Larger subheading, subtle color */}
                Search for doctors, specialists, and clinics in your area with ease and confidence on Medixy.
              </p>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>

        {/* Browse by Specialty Section */}
        {specialties.length > 0 && (
          <section>
            <h2 className="text-4xl font-bold text-center mb-10 font-recoleta text-foreground">Browse by Specialty</h2> {/* Larger, serif heading */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"> {/* Increased gap */}
              {specialties.map(specialty => (
                <SpecialtyCard key={specialty.id} specialty={specialty} />
              ))}
            </div>
          </section>
        )}

        {/* Browse by Provider Section */}
        {agencies.length > 0 && (
          <section>
            <h2 className="text-4xl font-bold text-center mb-10 font-recoleta text-foreground">Top Healthcare Agencies</h2> {/* Larger, serif heading */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"> {/* Increased gap */}
              {agencies.map(agency => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="container mx-auto py-12 bg-light-grey rounded-2xl shadow-subtle"> {/* Added background, padding, shadow */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-recoleta text-primary mb-2">
              Run your practice with <span className="text-5xl">Medixy</span>
            </h2>
            <p className="text-stone text-lg mt-2 font-averta">Product of Bedrock health solution.</p>
            <p className="text-stone text-xl mt-4 font-averta">All the tools you need, all in one place.</p>
          </div>
          <FeatureTabs />
        </section>
      </div>
    </>
  );
};

export default HomePage;