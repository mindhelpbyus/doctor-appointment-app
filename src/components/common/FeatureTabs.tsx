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
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660fc9717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGJvb2tpbmd8ZW58MHwwfHx8MTcxOTk0NTYwMHww&ixlib=rb-4.0.3&q=80&w=500',
  },
  {
    value: 'payments',
    title: 'Payments & Billing',
    description: 'Streamline your revenue cycle with our all-in-one billing and payment processing. From invoicing to checkout, we provide a secure and seamless financial experience for you and your patients.',
    icon: CreditCard,
    imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwcHJvY2Vzc2luZ3xlbnwwfDB8fHwxNzE5OTQ1NjAwfDA&ixlib=rb-4.0.3&q=80&w=500',
  },
  {
    value: 'marketing',
    title: 'Smarter Marketing Tools',
    description: 'Turn new patients into regulars. With automated email and text campaigns, you can easily collect contact info and convert newcomers into loyal patients with personalized messages.',
    icon: Megaphone,
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965da9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBjYW1wYWlnbnN8ZW58MHwwfHx8MTcxOTk0NTYwMHww&ixlib=rb-4.0.3&q=80&w=500',
  },
  {
    value: 'reporting',
    title: 'Data-Driven Reporting',
    description: 'See how your practice is performing with instant, detailed access to your most critical metrics. Make smart, informed decisions backed by our best-in-class analytics.',
    icon: BarChart3,
    imageUrl: 'https://images.unsplash.com/photo-1551288259-cd11ad771f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzfGVufDB8MHx8fDE3MTk5NDU2MDB8MA&ixlib=rb-4.0.3&q=80&w=500',
  },
  {
    value: 'staff',
    title: 'Staff Management',
    description: 'Keep your people moving with integrated staffing tools. From scheduling to performance reviews, automated substitutions to payroll, it\'s all on HealthConnect.',
    icon: Users,
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0f3899cd5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzZXR0aW5nJTIwdGVhbXxlbnwwfDB8fHwxNzE5OTQ1NjAwfDA&ixlib=rb-4.0.3&q=80&w=500',
  },
];

const FeatureTabs: React.FC = () => {
  return (
    <Tabs defaultValue="scheduling" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
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