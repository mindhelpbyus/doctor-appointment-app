import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DoctorCard from '@/components/common/DoctorCard';
import PromoBanner from '@/components/common/PromoBanner';

// This would ideally come from an API call based on agencySlug
const mockAgencyData = {
  "healthconnect-clinic": {
    name: "HealthConnect Clinic",
    logo: "https://via.placeholder.com/100x50/0000FF/FFFFFF?text=HCC",
    theme: {
      primaryColor: "hsl(222.2 47.4% 11.2%)", // Example: using HSL for dynamic theming
      secondaryColor: "hsl(210 40% 96.1%)",
      fontFamily: "sans-serif",
    },
    doctors: [
      { id: 'd1', name: 'Dr. Emily White', specialty: 'General Practice', location: '123 Main St', rating: 4.7, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=EW' },
      { id: 'd2', name: 'Dr. David Green', specialty: 'Internal Medicine', location: '123 Main St', rating: 4.6, imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=DG' },
    ],
    promotions: [
      { id: 'p1', title: 'New Patient Discount', description: '20% off your first visit!', imageUrl: 'https://via.placeholder.com/400x150/008000/FFFFFF?text=Promo1' },
    ],
  },
  "city-hospital": {
    name: "City Hospital",
    logo: "https://via.placeholder.com/100x50/FF0000/FFFFFF?text=CH",
    theme: {
      primaryColor: "hsl(0 84.2% 60.2%)",
      secondaryColor: "hsl(217.2 32.6% 17.5%)",
      fontFamily: "serif",
    },
    doctors: [
      { id: 'd3', name: 'Dr. Sarah Lee', specialty: 'Emergency Medicine', location: '456 Oak Ave', rating: 4.9, imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=SL' },
    ],
    promotions: [],
  },
};

const AgencyPage: React.FC = () => {
  const { agencySlug } = useParams<{ agencySlug: string }>();
  const agency = agencySlug ? mockAgencyData[agencySlug as keyof typeof mockAgencyData] : undefined;

  if (!agency) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Agency Not Found</h1>
        <p className="text-lg text-muted-foreground">The agency you are looking for does not exist.</p>
      </div>
    );
  }

  // Dynamic styling based on agency theme (conceptual)
  const agencyStyle = {
    '--agency-primary': agency.theme.primaryColor,
    '--agency-secondary': agency.theme.secondaryColor,
    fontFamily: agency.theme.fontFamily,
  } as React.CSSProperties; // Type assertion for custom CSS properties

  return (
    <div className="space-y-10" style={agencyStyle}>
      <header className="text-center py-8 bg-[var(--agency-primary)] text-white rounded-lg shadow-lg">
        {agency.logo && <img src={agency.logo} alt={`${agency.name} Logo`} className="mx-auto mb-4 h-16" />}
        <h1 className="text-5xl font-extrabold">{agency.name}</h1>
        <p className="text-xl mt-2">Your trusted healthcare partner.</p>
      </header>

      {agency.promotions.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Current Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agency.promotions.map(promo => (
              <PromoBanner key={promo.id} promotion={promo} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agency.doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* Additional sections like services, contact info, etc. */}
    </div>
  );
};

export default AgencyPage;