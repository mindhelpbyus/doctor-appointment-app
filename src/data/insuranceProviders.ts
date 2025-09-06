
export interface InsuranceProvider {
  id: string;
  name: string;
  logo: string;
}

export const insuranceProviders: InsuranceProvider[] = [
  {
    id: '1',
    name: 'Aetna',
    logo: '/logos/aetna.svg',
  },
  {
    id: '2',
    name: 'Blue Cross Blue Shield',
    logo: '/logos/bcbs.svg',
  },
  {
    id: '3',
    name: 'Cigna',
    logo: '/logos/cigna.svg',
  },
  {
    id: '4',
    name: 'Humana',
    logo: '/logos/humana.svg',
  },
  {
    id: '5',
    name: 'UnitedHealthcare',
    logo: '/logos/uhc.svg',
  },
    {
    id: '6',
    name: 'Kaiser Permanente',
    logo: '/logos/kaiser.svg',
  },
];
