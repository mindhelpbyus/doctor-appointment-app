import React from 'react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { paymentMethodsByCountry, insuranceProvidersByCountry } from '@/data/paymentMethods';
import { Skeleton } from '@/components/ui/skeleton';

const LogoBox = ({ name }: { name: string }) => (
  <div className="h-16 flex items-center justify-center px-6 bg-gray-100 rounded-lg shadow-sm">
    <span className="font-bold text-lg text-gray-500 tracking-wide">{name}</span>
  </div>
);

const LocationBasedFeatures: React.FC = () => {
  const { location, loading } = useGeolocation();

  const countryCode = location?.country || 'default';
  const countryName = location?.countryName || 'your region';

  // We'll show a curated list of top partners instead of the full list
  const paymentPartners = (paymentMethodsByCountry[countryCode] || paymentMethodsByCountry.default).slice(0, 4);
  const insurancePartners = (insuranceProvidersByCountry[countryCode] || insuranceProvidersByCountry.default).slice(0, 4);

  return (
    <section className="py-12 bg-light-grey rounded-2xl">
      <div className="container mx-auto text-center">
        {loading ? (
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        ) : (
          <h2 className="text-4xl font-bold font-recoleta text-foreground mb-4">
            Our Network of Trusted Partners
          </h2>
        )}
        <p className="text-lg text-muted-foreground mb-10 font-averta max-w-2xl mx-auto">
          We partner with leading insurance and payment providers to make your healthcare journey seamless in {countryName}.
        </p>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-muted-foreground font-semibold text-xl mb-6">Top Insurance Providers</h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {insurancePartners.map(provider => (
                <LogoBox key={provider} name={provider} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-muted-foreground font-semibold text-xl mb-6">Accepted Payment Methods</h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {paymentPartners.map(method => (
                <LogoBox key={method.name} name={method.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBasedFeatures;