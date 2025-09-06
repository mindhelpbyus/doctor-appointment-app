import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGeolocation } from '@/hooks/useGeolocation';
import { paymentMethodsByCountry, insuranceProvidersByCountry } from '@/data/paymentMethods';
import { Skeleton } from '@/components/ui/skeleton';

const LocationBasedFeatures: React.FC = () => {
  const { location, loading } = useGeolocation();

  const countryCode = location?.country || 'default';
  const countryName = location?.countryName || 'your region';

  const paymentMethods = paymentMethodsByCountry[countryCode] || paymentMethodsByCountry.default;
  const insuranceProviders = insuranceProvidersByCountry[countryCode] || insuranceProvidersByCountry.default;

  return (
    <section className="py-12 bg-light-grey rounded-2xl">
      <div className="container mx-auto text-center">
        {loading ? (
          <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
        ) : (
          <h2 className="text-4xl font-bold font-recoleta text-foreground mb-4">
            Care and Payments, Localized for {countryName}
          </h2>
        )}
        <p className="text-lg text-muted-foreground mb-8 font-averta">
          We partner with top insurance and payment providers to make your care more accessible.
        </p>
        <div className="flex justify-center items-center max-w-2xl mx-auto mb-8">
          <Input placeholder="Enter your insurance provider" className="rounded-r-none" />
          <Button className="rounded-l-none">Search</Button>
        </div>
        
        <div className="mb-8">
            <h3 className="text-muted-foreground font-semibold text-lg mb-4">Top Insurance Providers in {countryName}</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {insuranceProviders.map(provider => (
                <span key={provider} className="text-muted-foreground font-semibold text-lg">{provider}</span>
            ))}
            </div>
        </div>

        <div>
            <h3 className="text-muted-foreground font-semibold text-lg mb-4">Accepted Payment Methods</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            {paymentMethods.map(method => (
                <span key={method.name} className="text-muted-foreground font-semibold text-lg">{method.name}</span>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBasedFeatures;