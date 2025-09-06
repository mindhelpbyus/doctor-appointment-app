export interface Specialty {
  id: string;
  name: string;
  description: string;
}

export const specialties: Specialty[] = [
  { id: 'spec-1', name: 'Cardiology', description: 'Specializes in heart-related issues.' },
  { id: 'spec-2', name: 'Dermatology', description: 'Manages diseases of the skin, hair, and nails.' },
  { id: 'spec-3', name: 'Pediatrics', description: 'Provides medical care for infants, children, and adolescents.' },
  { id: 'spec-4', name: 'Orthopedics', description: 'Focuses on the musculoskeletal system.' },
  { id: 'spec-5', name: 'Neurology', description: 'Deals with disorders of the nervous system.' },
  { id: 'spec-6', name: 'General Practice', description: 'Provides routine health care (e.g., physicals, immunizations).' },
];