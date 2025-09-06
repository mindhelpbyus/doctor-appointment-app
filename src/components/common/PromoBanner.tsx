import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

interface PromoBannerProps {
  promotion: Promotion;
  className?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ promotion, className }) => {
  const defaultPromoImage = 'https://images.unsplash.com/photo-1517245381868-b19179dcba7b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {(promotion.imageUrl || defaultPromoImage) && (
        <img src={promotion.imageUrl || defaultPromoImage} alt={promotion.title} className="w-full h-40 object-cover" />
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{promotion.title}</CardTitle>
        <CardDescription>{promotion.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {promotion.link && (
          <Button asChild className={cn("w-full", className)}>
            <a href={promotion.link} target="_blank" rel="noopener noreferrer">Learn More</a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PromoBanner;