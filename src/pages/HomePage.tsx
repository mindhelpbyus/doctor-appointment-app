import React from 'react';
import { Button } from '@/components/ui/button';
import FeatureTabs from '@/components/common/FeatureTabs';

const HomePage = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-8 md:-mx-16">
        <div 
          className="w-full h-[60vh] min-h-[500px] bg-cover bg-center flex items-center justify-center text-center text-white p-4 rounded-lg overflow-hidden"
          style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1600x900/BFDBFE/3B82F6?text=HealthConnect')` }}
        >
          <div className="w-full max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              More Patients. More Growth. Better Health.
            </h1>
            <p className="text-xl mb-8">
              Unlock exclusive access to our revenue-generating tools, including the world's largest healthcare marketplace. With HealthConnect, you're on the #1 platform in the business.
            </p>
            <Button size="lg" className="text-lg">
              Get a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Run your practice with confidence</h2>
          <p className="text-muted-foreground text-lg mt-2">All the tools you need, all in one place.</p>
        </div>
        <FeatureTabs />
      </section>
    </div>
  );
};

export default HomePage;