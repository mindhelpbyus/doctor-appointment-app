import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DoctorCard from '@/components/common/DoctorCard';
import PromoBanner from '@/components/common/PromoBanner';
import { getAgencyBySlug, getDoctorsByAgencyId, getPromotionsByAgencyId } from '@/services/localApi';

const AgencyPage: React.FC = () => {
  const { agencySlug } = useParams<{ agencySlug: string }>();
  
  const agency = agencySlug ? getAgencyBySlug(agencySlug) : undefined;
  const doctors = agency ? getDoctorsByAgencyId(agency.id) : [];
  const promotions = agency ? getPromotionsByAgencyId(agency.id) : [];

  if (!agency) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold">Agency Not Found</h1>
        <p className="text-lg text-muted-foreground">The agency you are looking for does not exist.</p>
      </div>
    );
  }

  const agencyStyle = {
    '--agency-primary': agency.theme.primaryColor,
    '--agency-secondary': agency.theme.secondaryColor,
  } as React.CSSProperties;

  return (
    <div className="space-y-10" style={agencyStyle}>
      <header 
        className="text-center py-8 rounded-lg shadow-lg bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${agency.headerImageUrl})` }}
      >
        {agency.logoUrl && <img src={agency.logoUrl} alt={`${agency.name} Logo`} className="mx-auto mb-4 h-20 w-auto bg-white p-2 rounded-md" />}
        <h1 className="text-5xl font-extrabold">{agency.name}</h1>
        <p className="text-xl mt-2">{agency.address}</p>
      </header>

      {promotions.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Current Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map(promo => (
              <PromoBanner key={promo.id} promotion={{...promo, imageUrl: 'https://via.placeholder.com/400x150/008000/FFFFFF?text=Promo!'}} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Doctors</h2>
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={{...doctor, location: agency.name}} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">This agency currently has no doctors listed.</p>
        )}
      </section>
    </div>
  );
};

export default AgencyPage;