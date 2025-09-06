export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  headerImage: string;
  websiteUrl: string;
  address: string;
  phone: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}

export const agencies: Agency[] = [
  {
    id: 'agency-1',
    name: 'Wellness Grove Clinic',
    slug: 'wellness-grove',
    logo: 'https://via.placeholder.com/150/22C55E/FFFFFF?text=WGC',
    headerImage: 'https://via.placeholder.com/1200x300/A7F3D0/22C55E?text=Wellness+Grove+Clinic',
    websiteUrl: 'https://wellnessgrove.example.com',
    address: '123 Health St, Greensville, USA',
    phone: '555-100-1000',
    theme: {
      primaryColor: 'hsl(142 71% 45%)', // green-500
      secondaryColor: 'hsl(142 76% 90%)', // green-100
    },
  },
  {
    id: 'agency-2',
    name: 'City General Hospital',
    slug: 'city-general',
    logo: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=CGH',
    headerImage: 'https://via.placeholder.com/1200x300/BFDBFE/3B82F6?text=City+General+Hospital',
    websiteUrl: 'https://citygeneral.example.com',
    address: '456 Metro Ave, Central City, USA',
    phone: '555-200-2000',
    theme: {
      primaryColor: 'hsl(217 91% 60%)', // blue-600
      secondaryColor: 'hsl(219 91% 90%)', // blue-100
    },
  },
  {
    id: 'agency-3',
    name: 'Apex Health System',
    slug: 'apex-health',
    logo: 'https://via.placeholder.com/150/1F2937/FFFFFF?text=AHS',
    headerImage: 'https://via.placeholder.com/1200x300/D1D5DB/1F2937?text=Apex+Health+System',
    websiteUrl: 'https://apexhealth.example.com',
    address: '789 Summit Rd, Hightower, USA',
    phone: '555-300-3000',
    theme: {
      primaryColor: 'hsl(215 28% 17%)', // gray-800
      secondaryColor: 'hsl(220 13% 91%)', // gray-200
    },
  },
];