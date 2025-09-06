export interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  npi: string;
  specialtyId: string;
  agencyId?: string; // Optional: for independent doctors
  bio: string;
  rating: number;
  yearsExperience: number;
  availability: { date: string; slots: string[] }[];
  isVideoAvailable: boolean;
  languages: string[];
  address: string;
  phone: string;
  email: string;
}

export const doctors: Doctor[] = [
  // Independent Doctors
  { id: 'doc-1', name: 'Dr. Evelyn Reed', imageUrl: 'https://via.placeholder.com/150/7C3AED/FFFFFF?text=ER', npi: '1112223331', specialtyId: 'spec-2', bio: 'An independent dermatologist with a focus on cosmetic procedures.', rating: 4.9, yearsExperience: 12, availability: [{ date: '2024-11-10', slots: ['09:00', '11:00'] }], isVideoAvailable: true, languages: ['English', 'Spanish'], address: '101 Skin Care Ave, Beautiville', phone: '555-111-1111', email: 'evelyn.reed@email.com' },
  { id: 'doc-2', name: 'Dr. Frank Miller', imageUrl: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=FM', npi: '1112223332', specialtyId: 'spec-4', bio: 'Specializing in sports medicine and orthopedic surgery.', rating: 4.8, yearsExperience: 15, availability: [{ date: '2024-11-11', slots: ['14:00', '16:30'] }], isVideoAvailable: false, languages: ['English'], address: '202 Recovery Rd, Sportstown', phone: '555-222-2222', email: 'frank.miller@email.com' },
  
  // Wellness Grove Clinic Doctors (agency-1)
  { id: 'doc-3', name: 'Dr. Alice Smith', imageUrl: 'https://via.placeholder.com/150/16A34A/FFFFFF?text=AS', npi: '1112223333', specialtyId: 'spec-3', agencyId: 'agency-1', bio: 'A board-certified pediatrician passionate about child health.', rating: 4.8, yearsExperience: 10, availability: [{ date: '2024-11-12', slots: ['10:00', '10:30', '11:00'] }], isVideoAvailable: true, languages: ['English'], address: '123 Health St, Greensville', phone: '555-100-1001', email: 'alice.smith@wgc.com' },
  { id: 'doc-4', name: 'Dr. Bob Johnson', imageUrl: 'https://via.placeholder.com/150/16A34A/FFFFFF?text=BJ', npi: '1112223334', specialtyId: 'spec-6', agencyId: 'agency-1', bio: 'A dedicated general practitioner focusing on holistic family wellness.', rating: 4.7, yearsExperience: 8, availability: [{ date: '2024-11-12', slots: ['13:00', '14:00'] }], isVideoAvailable: true, languages: ['English', 'French'], address: '123 Health St, Greensville', phone: '555-100-1002', email: 'bob.johnson@wgc.com' },

  // City General Hospital Doctors (agency-2)
  { id: 'doc-5', name: 'Dr. Carol White', imageUrl: 'https://via.placeholder.com/150/2563EB/FFFFFF?text=CW', npi: '1112223335', specialtyId: 'spec-1', agencyId: 'agency-2', bio: 'Leading cardiologist at City General with expertise in interventional cardiology.', rating: 4.9, yearsExperience: 18, availability: [{ date: '2024-11-13', slots: ['08:00', '12:00'] }], isVideoAvailable: false, languages: ['English'], address: '456 Metro Ave, Central City', phone: '555-200-2001', email: 'carol.white@cgh.com' },
  { id: 'doc-6', name: 'Dr. David Green', imageUrl: 'https://via.placeholder.com/150/2563EB/FFFFFF?text=DG', npi: '1112223336', specialtyId: 'spec-5', agencyId: 'agency-2', bio: 'Head of Neurology, specializing in stroke and epilepsy.', rating: 4.8, yearsExperience: 20, availability: [{ date: '2024-11-14', slots: ['11:00'] }], isVideoAvailable: true, languages: ['English', 'German'], address: '456 Metro Ave, Central City', phone: '555-200-2002', email: 'david.green@cgh.com' },
  { id: 'doc-7', name: 'Dr. Grace Hall', imageUrl: 'https://via.placeholder.com/150/2563EB/FFFFFF?text=GH', npi: '1112223337', specialtyId: 'spec-4', agencyId: 'agency-2', bio: 'Orthopedic surgeon known for knee and hip replacements.', rating: 4.9, yearsExperience: 14, availability: [], isVideoAvailable: false, languages: ['English'], address: '456 Metro Ave, Central City', phone: '555-200-2003', email: 'grace.hall@cgh.com' },

  // Apex Health System Doctors (agency-3)
  { id: 'doc-8', name: 'Dr. Henry Taylor', imageUrl: 'https://via.placeholder.com/150/374151/FFFFFF?text=HT', npi: '1112223338', specialtyId: 'spec-1', agencyId: 'agency-3', bio: 'Preventive cardiology specialist at Apex Health.', rating: 4.7, yearsExperience: 9, availability: [{ date: '2024-11-15', slots: ['09:30', '10:30'] }], isVideoAvailable: true, languages: ['English'], address: '789 Summit Rd, Hightower', phone: '555-300-3001', email: 'henry.taylor@ahs.com' },
  { id: 'doc-9', name: 'Dr. Irene King', imageUrl: 'https://via.placeholder.com/150/374151/FFFFFF?text=IK', npi: '1112223339', specialtyId: 'spec-2', agencyId: 'agency-3', bio: 'Expert in pediatric dermatology.', rating: 4.9, yearsExperience: 11, availability: [{ date: '2024-11-15', slots: ['13:00', '15:00'] }], isVideoAvailable: true, languages: ['English', 'Mandarin'], address: '789 Summit Rd, Hightower', phone: '555-300-3002', email: 'irene.king@ahs.com' },
  { id: 'doc-10', name: 'Dr. Jack Lewis', imageUrl: 'https://via.placeholder.com/150/374151/FFFFFF?text=JL', npi: '1112223340', specialtyId: 'spec-5', agencyId: 'agency-3', bio: 'Neurologist focusing on movement disorders.', rating: 4.8, yearsExperience: 13, availability: [{ date: '2024-11-18', slots: ['10:00', '11:00', '12:00'] }], isVideoAvailable: false, languages: ['English'], address: '789 Summit Rd, Hightower', phone: '555-300-3003', email: 'jack.lewis@ahs.com' },
];