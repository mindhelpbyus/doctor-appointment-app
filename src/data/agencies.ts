export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  headerImage: string;
  websiteUrl: string;
  address: string;
  phone: string;
  contactEmail: string; // Added this
  type: 'Clinic' | 'Hospital' | 'Health System';
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  isActive: boolean;
}

export const agencies: Agency[] = [
  {
    id: 'agency-1',
    name: 'Wellness Grove Clinic',
    slug: 'wellness-grove',
    logo: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHxoZWFsdGhjYXJlJTIwY2xpbmljJTIwbG9nb3xlbnwwfDB8fHwxNzE5OTQ1NjAwfDA&ixlib=rb-4.0.3&q=80&w=150',
    headerImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHxoZWFsdGhjYXJlJTIwY2xpbmljfGVufDB8MHx8fDE3MTk5NDU2MDB8MA&ixlib=rb-4.0.3&q=80&w=1200',
    websiteUrl: 'https://wellnessgrove.example.com',
    address: '123 Health St, Greensville, USA',
    phone: '555-100-1000',
    contactEmail: 'info@wellnessgrove.com', // Added
    type: 'Clinic',
    theme: {
      primaryColor: 'hsl(142 71% 45%)', // green-500
      secondaryColor: 'hsl(142 76% 90%)', // green-100
    },
    isActive: true,
  },
  {
    id: 'agency-2',
    name: 'City General Hospital',
    slug: 'city-general',
    logo: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHxob3NwaXRhbCUyMGxvZ298ZW58MHwwfHx8MTcxOTk0NTYwMHww&ixlib=rb-4.0.3&q=80&w=150',
    headerImage: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHxob3NwaXRhbHxlbnwwfDB8fHwxNzE5OTQ1NjAwfDA&ixlib=rb-4.0.3&q=80&w=1200',
    websiteUrl: 'https://citygeneral.example.com',
    address: '456 Metro Ave, Central City, USA',
    phone: '555-200-2000',
    contactEmail: 'contact@citygeneral.com', // Added
    type: 'Hospital',
    theme: {
      primaryColor: 'hsl(217 91% 60%)', // blue-600
      secondaryColor: 'hsl(219 91% 90%)', // blue-100
    },
    isActive: true,
  },
  {
    id: 'agency-3',
    name: 'Apex Health System',
    slug: 'apex-health',
    logo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzYXRlbGxpdGVfcmVwb3J0fGVufDB8MHx8fDE3MTk5NDU2MDB8MA&ixlib=rb-4.0.3&q=80&w=150',
    headerImage: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHxoZWFsdGglMjBzYXRlbGxpdGV8ZW58MHwwfHx8MTcxOTk0NTYwMHww&ixlib=rb-4.0.3&q=80&w=1200',
    websiteUrl: 'https://apexhealth.example.com',
    address: '789 Summit Rd, Hightower, USA',
    phone: '555-300-3000',
    contactEmail: 'support@apexhealth.com', // Added
    type: 'Health System',
    theme: {
      primaryColor: 'hsl(215 28% 17%)', // gray-800
      secondaryColor: 'hsl(220 13% 91%)', // gray-200
    },
    isActive: true,
  },
];