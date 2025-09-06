import { HeartPulse, Stethoscope, Baby, Bone, Brain, Microscope } from 'lucide-react';

export interface Specialty {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

export const specialties: Specialty[] = [
  { id: 'spec-1', name: 'Cardiology', description: 'Specializes in heart-related issues.', icon: HeartPulse },
  { id: 'spec-2', name: 'Dermatology', description: 'Manages diseases of the skin, hair, and nails.', icon: Microscope },
  { id: 'spec-3', name: 'Pediatrics', description: 'Provides medical care for infants, children, and adolescents.', icon: Baby },
  { id: 'spec-4', name: 'Orthopedics', description: 'Focuses on the musculoskeletal system.', icon: Bone },
  { id: 'spec-5', name: 'Neurology', description: 'Deals with disorders of the nervous system.', icon: Brain },
  { id: 'spec-6', name: 'General Practice', description: 'Provides routine health care (e.g., physicals, immunizations).', icon: Stethoscope },
];