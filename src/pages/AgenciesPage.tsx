import React, { useState, useEffect } from 'react';
import { getAgencies } from '@/services/localApi';
import { Agency } from '@/data/agencies';
import AgencyCard from '@/components/common/AgencyCard';

const AgenciesPage: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => {
    setAgencies(getAgencies().filter(agency => agency.isActive));
  }, []);

  return (
    <div className="space-y-10 py-8">
      <h1 className="text-4xl font-recoleta font-bold text-center text-foreground">Our Healthcare Agencies</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-2xl mx-auto">
        Explore our network of trusted clinics, hospitals, and health systems.
      </p>

      {agencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agencies.map(agency => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">No active agencies found at this time.</p>
        </div>
      )}
    </div>
  );
};

export default AgenciesPage;