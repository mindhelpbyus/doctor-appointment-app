import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getPromotions, getDoctorById, getAgencyById } from '@/services/localApi';
import { Tag } from 'lucide-react';
import { Promotion } from '@/data/promotions';

const OffersSection: React.FC = () => {
  const promotions = getPromotions().filter(p => p.status === 'approved').slice(0, 3); // Get top 3 approved promotions

  const getTargetName = (promo: Promotion) => {
    if (promo.targetDoctorId) {
      return getDoctorById(promo.targetDoctorId)?.fullName || '';
    }
    if (promo.targetAgencyId) {
      return getAgencyById(promo.targetAgencyId)?.name || '';
    }
    return 'All Providers';
  };

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 font-recoleta text-foreground">Offers For You</h2>
        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map(promo => (
              <Card key={promo.id} className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-5 w-5" />
                    <CardTitle>{promo.title}</CardTitle>
                  </div>
                  <CardDescription className="text-primary-foreground/80">{getTargetName(promo)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold mb-4">
                    {promo.discountType === 'percent' ? `${promo.discountValue}% OFF` : `$${promo.discountValue} OFF`}
                  </p>
                  <p className="text-sm text-primary-foreground/90 mb-4">{promo.description}</p>
                  <Button variant="secondary" asChild className="w-full">
                    <Link to="/search">Find a Doctor</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No active offers at the moment. Check back soon!</p>
        )}
      </div>
    </section>
  );
};

export default OffersSection;