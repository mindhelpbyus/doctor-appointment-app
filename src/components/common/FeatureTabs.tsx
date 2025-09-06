import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Megaphone, BarChart3, Users, CreditCard, BotMessageSquare } from 'lucide-react';

const features = [
  {
    value: 'scheduling',
    title: 'Effortless Scheduling',
    description: 'Manage your entire calendar for staffing and booking. Classes and appointments are seamlessly updated in real time, on every device, keeping your entire team coordinated.',
    icon: Calendar,
    imageUrl: 'https://via.placeholder.com/500x350/BFDBFE/3B82F6?text=Scheduling',
  },
  {
    value: 'marketing',
    title: 'Smarter Marketing Tools',
    description: 'Turn new patients into regulars. With automated email and text campaigns, you can easily collect contact info and convert newcomers into loyal patients with personalized messages.',
    icon: Megaphone,
    imageUrl: 'https://via.placeholder.com/500x350/A7F3D0/16A34A?text=Marketing',
  },
  {
    value: 'reporting',
    title: 'Data-Driven Reporting',
    description: 'See how your practice is performing with instant, detailed access to your most critical metrics. Make smart, informed decisions backed by our best-in-class analytics.',
    icon: BarChart3,
    imageUrl: 'https://via.placeholder.com/500x350/FBCFE8/86198F?text=Reporting',
  },
  {
    value: 'staff',
    title: 'Staff Management',
    description: 'Keep your people moving with integrated staffing tools. From scheduling to performance reviews, automated substitutions to payroll, it\'s all on HealthConnect.',
    icon: Users,
    imageUrl: 'https://via.placeholder.com/500x350/FDE68A/B45309?text=Staff+Mgmt',
  },
];

const FeatureTabs: React.FC = () => {
  return (
    <Tabs defaultValue="scheduling" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        {features.map((feature) => (
          <TabsTrigger key={feature.value} value={feature.value} className="flex items-center gap-2">
            <feature.icon className="h-4 w-4" />
            {feature.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {features.map((feature) => (
        <TabsContent key={feature.value} value={feature.value}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 space-y-4">
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                  <Button>Learn More</Button>
                </div>
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FeatureTabs;