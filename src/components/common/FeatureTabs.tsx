import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Megaphone, BarChart3, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const features = [
  {
    value: 'scheduling',
    title: 'Effortless Scheduling',
    description: 'Manage your entire calendar for staffing and booking. Classes and appointments are seamlessly updated in real time, on every device, keeping your entire team coordinated.',
    icon: Calendar,
    imageUrl: 'https://images.unsplash.com/photo-1587854692137-87ad9f93522e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // High-quality image
    link: '/features/scheduling',
  },
  {
    value: 'payments',
    title: 'Payments & Billing',
    description: 'Streamline your revenue cycle with our all-in-one billing and payment processing. From invoicing to checkout, we provide a secure and seamless financial experience for you and your patients.',
    icon: CreditCard,
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-fa020b955579?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // High-quality image
    link: '/features/payments',
  },
  {
    value: 'marketing',
    title: 'Smarter Marketing Tools',
    description: 'Turn new patients into regulars. With automated email and text campaigns, you can easily collect contact info and convert newcomers into loyal patients with personalized messages.',
    icon: Megaphone,
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965da9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // High-quality image
    link: '/features/marketing',
  },
  {
    value: 'reporting',
    title: 'Data-Driven Reporting',
    description: 'See how your practice is performing with instant, detailed access to your most critical metrics. Make smart, informed decisions backed by our best-in-class analytics.',
    icon: BarChart3,
    imageUrl: 'https://images.unsplash.com/photo-1551288259-cd11ad942024?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // High-quality image
    link: '/features/reporting',
  },
  {
    value: 'staff',
    title: 'Staff Management',
    description: 'Keep your people moving with integrated staffing tools. From scheduling to performance reviews, automated substitutions to payroll, it\'s all on HealthConnect.',
    icon: Users,
    imageUrl: 'https://images.unsplash.com/photo-1504805572947-34fd45f1d088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // High-quality image
    link: '/features/staff-management',
  },
];

const FeatureTabs: React.FC = () => {
  return (
    <Tabs defaultValue="scheduling" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto bg-light-grey p-2 rounded-xl shadow-inner"> {/* Refined TabsList styling */}
        {features.map((feature) => (
          <TabsTrigger key={feature.value} value={feature.value} className="flex flex-col items-center gap-2 p-4 h-full data-[state=active]:bg-background data-[state=active]:shadow-subtle data-[state=active]:text-primary data-[state=active]:font-semibold rounded-lg transition-all duration-200 text-muted-foreground hover:text-primary font-averta"> {/* Refined TabsTrigger styling */}
            <feature.icon className="h-6 w-6 text-current" /> {/* text-current to inherit color */}
            <span className="text-center text-sm font-semibold">{feature.title}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {features.map((feature) => (
        <TabsContent key={feature.value} value={feature.value} className="mt-6"> {/* Added top margin */}
          <Card className="overflow-hidden rounded-2xl shadow-medium border-none"> {/* Stronger shadow, no border */}
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 items-center bg-background"> {/* Explicit background */}
                <div className="p-8 lg:p-12 space-y-6 order-2 md:order-1"> {/* Increased padding and spacing */}
                  <h3 className="text-3xl lg:text-4xl font-recoleta font-bold text-foreground">{feature.title}</h3> {/* Serif font, larger */}
                  <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed font-averta">{feature.description}</p> {/* Larger, relaxed leading */}
                  <Button asChild variant="custom-primary" size="custom-sm" className="shadow-md hover:shadow-lg">
                    <Link to={feature.link}>Learn More</Link>
                  </Button>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="w-full h-full object-cover min-h-[250px] md:min-h-[400px] lg:min-h-[500px]" // Increased min-heights
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