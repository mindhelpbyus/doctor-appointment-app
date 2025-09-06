import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAgencies, getSpecialties } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Specialty } from '@/data/specialties';
import SpecialtyCard from '@/components/common/SpecialtyCard';
import AgencyCard from '@/components/common/AgencyCard';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { TopDoctors, LocationBasedFeatures, Testimonials } from '@/components/home';

const HomePage = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAgencies(getAgencies().filter(a => a.isActive).slice(0, 5)); // Show top 5
    setSpecialties(getSpecialties());
  }, []);

  const handleSearch = (query: string, location: string) => {
    const searchParams = new URLSearchParams();
    if (query.trim()) searchParams.set('q', query.trim());
    if (location.trim()) searchParams.set('loc', location.trim());
    
    if (searchParams.toString()) {
      navigate(`/search?${searchParams.toString()}`);
    } else {
      navigate('/search');
    }
  };

  const topSpecialties = specialties.filter(s => 
    ['Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology'].includes(s.name)
  );

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl md:text-6xl font-recoleta font-extrabold mb-6 leading-tight text-foreground">
          Consult top doctors online or in-person for any health concern
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-muted-foreground font-averta max-w-3xl mx-auto">
          Instantly book appointments with a network of trusted doctors and specialists.
        </p>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Top-searched specialties */}
      {topSpecialties.length > 0 && (
        <section>
          <h2 className="text-4xl font-bold text-center mb-10 font-recoleta text-foreground">Top-Searched Specialties</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {topSpecialties.map(specialty => (
              <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="custom-secondary" size="custom-sm">
              <Link to="/search">View All Specialties</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Healthcare Agencies */}
      {agencies.length > 0 && (
        <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold font-recoleta text-foreground">Connect with Leading Healthcare Groups</h2>
            <p className="text-lg text-muted-foreground mt-2 font-averta">
              Access a network of trusted clinics and hospitals for comprehensive care.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {agencies.map(agency => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </section>
      )}

      {/* Top-rated doctors */}
      <TopDoctors />

      {/* Location-Based Features Section */}
      <LocationBasedFeatures />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default HomePage;