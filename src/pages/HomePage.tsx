import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAgencies, getSpecialties } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import { Specialty } from '@/data/specialties';
import SpecialtyCard from '@/components/common/SpecialtyCard';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { TopDoctors, LocationBasedFeatures, Testimonials } from '@/components/home';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { insuranceProviders } from '@/data/insuranceProviders';
import { ThumbsUp, ShieldCheck, HeartHandshake } from 'lucide-react';

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
      <section className="bg-powder-blue text-center py-20 rounded-2xl shadow-subtle">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-recoleta font-extrabold mb-6 leading-tight text-foreground">
            Consult top doctors online or in-person for any health concern
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground font-averta max-w-3xl mx-auto">
            Instantly book appointments with a network of trusted doctors and specialists.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
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
            <Button asChild className="btn-primary-soft font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
              <Link to="/search">View All Specialties</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Why Choose Docsy? Section */}
      <section className="bg-misty-rose py-20">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold font-recoleta text-foreground mb-12">Why Choose Docsy?</h2>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full shadow-medium mb-4">
                        <ThumbsUp className="h-8 w-8 text-health-green" />
                    </div>
                    <h3 className="text-2xl font-recoleta font-bold text-foreground mb-2">Expert-Led Care</h3>
                    <p className="text-muted-foreground font-averta max-w-xs">Access a curated network of highly-qualified doctors and specialists, ensuring you receive top-tier medical advice and treatment.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full shadow-medium mb-4">
                        <ShieldCheck className="h-8 w-8 text-health-blue" />
                    </div>
                    <h3 className="text-2xl font-recoleta font-bold text-foreground mb-2">Secure & Confidential</h3>
                    <p className="text-muted-foreground font-averta max-w-xs">Your privacy is our priority. We use state-of-the-art security to protect your personal and medical information.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-full shadow-medium mb-4">
                        <HeartHandshake className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-recoleta font-bold text-foreground mb-2">Patient-Centric Approach</h3>
                    <p className="text-muted-foreground font-averta max-w-xs">We are dedicated to empowering you on your health journey with easy-to-use tools and compassionate support.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Top Insurance Providers */}
      <section>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold font-recoleta text-foreground">Top Insurance Providers</h2>
            <p className="text-lg text-muted-foreground mt-2 font-averta">
              We work with a wide range of insurance providers to ensure you get the best care.
            </p>
          </div>
          <InfiniteMovingCards
            items={insuranceProviders}
            direction="right"
            speed="slow"
          />
        </section>

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
