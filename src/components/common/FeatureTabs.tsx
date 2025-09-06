import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Megaphone, BarChart3, Users, CreditCard } from 'lucide-react';

const features = [
  {
    value: 'scheduling',
    title: 'Effortless Scheduling',
    description: 'Manage your entire calendar for staffing and booking. Classes and appointments are seamlessly updated in real time, on every device, keeping your entire team coordinated.',
    icon: Calendar,
    imageUrl: 'https://via.placeholder.com/500x300/008363/FFFFFF?text=Scheduling',
  },
  {
    value: 'payments',
    title: 'Payments & Billing',
    description: 'Streamline your revenue cycle with our all-in-one billing and payment processing. From invoicing to checkout, we provide a secure and seamless financial experience for you and your patients.',
    icon: CreditCard,
    imageUrl: 'https://via.placeholder.com/500x300/045944/FFFFFF?text=Payments',
  },
  {
    value: 'marketing',
    title: 'Smarter Marketing Tools',
    description: 'Turn new patients into regulars. With automated email and text campaigns, you can easily collect contact info and convert newcomers into loyal patients with personalized messages.',
    icon: Megaphone,
    imageUrl: 'https://via.placeholder.com/500x300/A2A3A5/FFFFFF?text=Marketing',
  },
  {
    value: 'reporting',
    title: 'Data-Driven Reporting',
    description: 'See how your practice is performing with instant, detailed access to your most critical metrics. Make smart, informed decisions backed by our best-in-class analytics.',
    icon: BarChart3,
    imageUrl: 'https://via.placeholder.com/500x300/57585A/FFFFFF?text=Reporting',
  },
  {
    value: 'staff',
    title: 'Staff Management',
    description: 'Keep your people moving with integrated staffing tools. From scheduling to performance reviews, automated substitutions to payroll, it\'s all on HealthConnect.',
    icon: Users,
    imageUrl: 'https://via.placeholder.com/500x300/2D2D2D/FFFFFF?text=Staff',
  },
];

const FeatureTabs: React.FC = () => {
  return (
    <Tabs defaultValue="scheduling" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
        {features.map((feature) => (
          <TabsTrigger key={feature.value} value={feature.value} className="flex flex-col items-center gap-2 p-4 h-full">
            <feature.icon className="h-6 w-6 text-basil" />
            <span className="text-center text-sm font-semibold">{feature.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {features.map((feature) => (
        <TabsContent key={feature.value} value={feature.value}>
          <Card className="overflow-hidden rounded-2xl">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 space-y-4 order-2 md:order-1">
                  <h3 className="text-3xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                  <Button variant="custom-primary" size="custom-sm">Learn More</Button>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover min-h-[200px] md:min-h-[300px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FeatureTabs;