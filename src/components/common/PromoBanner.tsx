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
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {promotion.imageUrl && (
        <img src={promotion.imageUrl} alt={promotion.title} className="w-full h-40 object-cover" />
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