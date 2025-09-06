import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Megaphone, Mail, MessageSquare, Star } from 'lucide-react';

const MarketingFeaturePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">Smarter Marketing Tools for Your Practice with Medixy</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        Attract and retain more patients with Medixy's built-in marketing automation, designed to turn new patients into regulars and foster loyalty.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Key Marketing Features</h2>
          <ul className="space-y-4 text-lg text-muted-foreground font-averta">
            <li className="flex items-start gap-3">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Automated email campaigns for patient engagement and education.</span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Personalized patient communication via text messages and in-app notifications.</span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Reputation management tools to gather and showcase positive patient reviews.</span>
            </li>
            <li className="flex items-start gap-3">
              <Megaphone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Easy integration with social media platforms to expand your reach.</span>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965da9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Marketing Tools"
            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">Ready to Grow Your Patient Base?</h2>
        <Button asChild size="lg" variant="custom-primary">
          <Link to="/onboard-provider">Boost Your Marketing</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingFeaturePage;