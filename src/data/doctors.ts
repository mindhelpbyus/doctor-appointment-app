import { IAvailability } from '@/models/Doctor'; // Import the new interface

export interface Doctor {
  id: string;
  fullName: string;
  photoUrl: string;
  gender: 'male' | 'female';
  npi: string;
  type: 'individual' | 'agency';
  specialtyId: string;
  agencyId?: string;
  biography: string;
  rating: number;
  yearsExperience: number;
  availability: { date: string; slots: string[] }[]; // Existing field for specific dates
  weeklyAvailability: IAvailability[]; // New field for recurring weekly availability
  videoConsultation: boolean;
  languages: string[];
  clinicAddress: string;
  phone: string;
  email: string;
}

// Default weekly availability for a doctor (e.g., Mon-Fri, 9-5)
const defaultWeeklyAvailability: IAvailability[] = [
  { dayOfWeek: 0, isAvailable: false, time_ranges: [] }, // Sunday
  { dayOfWeek: 1, isAvailable: true, time_ranges: [{ start: '09:00', end: '17:00' }] }, // Monday
  { dayOfWeek: 2, isAvailable: true, time_ranges: [{ start: '09:00', end: '17:00' }] }, // Tuesday
  { dayOfWeek: 3, isAvailable: true, time_ranges: [{ start: '09:00', end: '17:00' }] }, // Wednesday
  { dayOfWeek: 4, isAvailable: true, time_ranges: [{ start: '09:00', end: '17:00' }] }, // Thursday
  { dayOfWeek: 5, isAvailable: true, time_ranges: [{ start: '09:00', end: '17:00' }] }, // Friday
  { dayOfWeek: 6, isAvailable: false, time_ranges: [] }, // Saturday
];

// Example of a doctor with slightly different availability
const variedWeeklyAvailability: IAvailability[] = [
  { dayOfWeek: 0, isAvailable: false, time_ranges: [] },
  { dayOfWeek: 1, isAvailable: true, time_ranges: [{ start: '10:00', end: '18:00' }] },
  { dayOfWeek: 2, isAvailable: false, time_ranges: [] },
  { dayOfWeek: 3, isAvailable: true, time_ranges: [{ start: '08:00', end: '12:00' }, { start: '14:00', end: '17:00' }] },
  { dayOfWeek: 4, isAvailable: true, time_ranges: [{ start: '09:00', end: '17:00' }] },
  { dayOfWeek: 5, isAvailable: true, time_ranges: [{ start: '09:00', end: '13:00' }] },
  { dayOfWeek: 6, isAvailable: false, time_ranges: [] },
];


export const doctors: Doctor[] = [
  // Independent Doctors
  { id: 'doc-1', fullName: 'Dr. Evelyn Reed', photoUrl: '/images/doctors/doc-1.jpg', gender: 'female', npi: '1112223331', type: 'individual', specialtyId: 'spec-2', biography: 'An independent dermatologist with a focus on cosmetic procedures and advanced skincare treatments.', rating: 4.9, yearsExperience: 12, availability: [{ date: '2024-11-10', slots: ['09:00', '11:00'] }], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: true, languages: ['English', 'Spanish'], clinicAddress: '101 Skin Care Ave, Beautiville', phone: '555-111-1111', email: 'evelyn.reed@email.com' },
  { id: 'doc-2', fullName: 'Dr. Frank Miller', photoUrl: '/images/doctors/doc-2.jpg', gender: 'male', npi: '1112223332', type: 'individual', specialtyId: 'spec-4', biography: 'Specializing in sports medicine and orthopedic surgery for athletes of all levels.', rating: 4.8, yearsExperience: 15, availability: [{ date: '2024-11-11', slots: ['14:00', '16:30'] }], weeklyAvailability: variedWeeklyAvailability, videoConsultation: false, languages: ['English'], clinicAddress: '202 Recovery Rd, Sportstown', phone: '555-222-2222', email: 'frank.miller@email.com' },
  
  // Wellness Grove Clinic Doctors (agency-1)
  { id: 'doc-3', fullName: 'Dr. Alice Smith', photoUrl: '/images/doctors/doc-3.jpg', gender: 'female', npi: '1112223333', type: 'agency', specialtyId: 'spec-3', agencyId: 'agency-1', biography: 'A board-certified pediatrician passionate about child health and development.', rating: 4.8, yearsExperience: 10, availability: [{ date: '2024-11-12', slots: ['10:00', '10:30', '11:00'] }], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: true, languages: ['English'], clinicAddress: '123 Health St, Greensville', phone: '555-100-1001', email: 'alice.smith@wgc.com' },
  { id: 'doc-4', fullName: 'Dr. Bob Johnson', photoUrl: '/images/doctors/doc-4.jpg', gender: 'male', npi: '1112223334', type: 'agency', specialtyId: 'spec-6', agencyId: 'agency-1', biography: 'A dedicated general practitioner focusing on holistic family wellness and preventive care.', rating: 4.7, yearsExperience: 8, availability: [{ date: '2024-11-12', slots: ['13:00', '14:00'] }], weeklyAvailability: variedWeeklyAvailability, videoConsultation: true, languages: ['English', 'French'], clinicAddress: '123 Health St, Greensville', phone: '555-100-1002', email: 'bob.johnson@wgc.com' },

  // City General Hospital Doctors (agency-2)
  { id: 'doc-5', fullName: 'Dr. Carol White', photoUrl: '/images/doctors/doc-5.jpg', gender: 'female', npi: '1112223335', type: 'agency', specialtyId: 'spec-1', agencyId: 'agency-2', biography: 'Leading cardiologist at City General with expertise in interventional cardiology and heart failure management.', rating: 4.9, yearsExperience: 18, availability: [{ date: '2024-11-13', slots: ['08:00', '12:00'] }], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: false, languages: ['English'], clinicAddress: '456 Metro Ave, Central City', phone: '555-200-2001', email: 'carol.white@cgh.com' },
  { id: 'doc-6', fullName: 'Dr. David Green', photoUrl: '/images/doctors/doc-6.jpg', gender: 'male', npi: '1112223336', type: 'agency', specialtyId: 'spec-5', agencyId: 'agency-2', biography: 'Head of Neurology, specializing in the treatment of stroke, epilepsy, and other complex neurological conditions.', rating: 4.8, yearsExperience: 20, availability: [{ date: '2024-11-14', slots: ['11:00'] }], weeklyAvailability: variedWeeklyAvailability, videoConsultation: true, languages: ['English', 'German'], clinicAddress: '456 Metro Ave, Central City', phone: '555-200-2002', email: 'david.green@cgh.com' },
  { id: 'doc-7', fullName: 'Dr. Grace Hall', photoUrl: '/images/doctors/doc-7.jpg', gender: 'female', npi: '1112223337', type: 'agency', specialtyId: 'spec-4', agencyId: 'agency-2', biography: 'Orthopedic surgeon renowned for pioneering new techniques in knee and hip replacement surgery.', rating: 4.9, yearsExperience: 14, availability: [], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: false, languages: ['English'], clinicAddress: '456 Metro Ave, Central City', phone: '555-200-2003', email: 'grace.hall@cgh.com' },

  // Apex Health System Doctors (agency-3)
  { id: 'doc-8', fullName: 'Dr. Henry Taylor', photoUrl: '/images/doctors/doc-8.jpg', gender: 'male', npi: '1112223338', type: 'agency', specialtyId: 'spec-1', agencyId: 'agency-3', biography: 'Preventive cardiology specialist at Apex Health, focusing on lifestyle and risk factor management.', rating: 4.7, yearsExperience: 9, availability: [{ date: '2024-11-15', slots: ['09:30', '10:30'] }], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: true, languages: ['English'], clinicAddress: '789 Summit Rd, Hightower', phone: '555-300-3001', email: 'henry.taylor@ahs.com' },
  { id: 'doc-9', fullName: 'Dr. Irene King', photoUrl: '', gender: 'female', npi: '1112223339', type: 'agency', specialtyId: 'spec-2', agencyId: 'agency-3', biography: 'Expert in pediatric dermatology, treating common and rare skin conditions in children.', rating: 4.9, yearsExperience: 11, availability: [{ date: '2024-11-15', slots: ['13:00', '15:00'] }], weeklyAvailability: variedWeeklyAvailability, videoConsultation: true, languages: ['English', 'Mandarin'], clinicAddress: '789 Summit Rd, Hightower', phone: '555-300-3002', email: 'irene.king@ahs.com' },
  { id: 'doc-10', fullName: 'Dr. Jack Lewis', photoUrl: '', gender: 'male', npi: '1112223340', type: 'agency', specialtyId: 'spec-5', agencyId: 'agency-3', biography: 'Neurologist focusing on movement disorders, including Parkinson\'s disease and tremors.', rating: 4.8, yearsExperience: 13, availability: [{ date: '2024-11-18', slots: ['10:00', '11:00', '12:00'] }], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: false, languages: ['English'], clinicAddress: '789 Summit Rd, Hightower', phone: '555-300-3003', email: 'jack.lewis@ahs.com' },
  
  // Additional Doctors for more data
  { id: 'doc-11', fullName: 'Dr. Olivia Wilson', photoUrl: '', gender: 'female', npi: '1112223341', type: 'individual', specialtyId: 'spec-6', biography: 'Experienced general practitioner with a focus on family health and preventive care.', rating: 4.6, yearsExperience: 7, availability: [], weeklyAvailability: defaultWeeklyAvailability, videoConsultation: true, languages: ['English'], clinicAddress: '303 Family Health, Suburbia', phone: '555-400-4001', email: 'olivia.wilson@email.com' },
  { id: 'doc-12', fullName: 'Dr. Liam Davis', photoUrl: '', gender: 'male', npi: '1112223342', type: 'agency', specialtyId: 'spec-3', agencyId: 'agency-1', biography: 'Pediatric specialist dedicated to providing compassionate care for children of all ages.', rating: 4.9, yearsExperience: 9, availability: [], weeklyAvailability: variedWeeklyAvailability, videoConsultation: true, languages: ['English', 'Hindi'], clinicAddress: '123 Health St, Greensville', phone: '555-100-1004', email: 'liam.davis@wgc.com' },
];