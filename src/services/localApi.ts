import { agencies, Agency } from '@/data/agencies';
import { appointments, Appointment } from '@/data/appointments';
import { doctors, Doctor } from '@/data/doctors';
import { patients, Patient } from '@/data/patients';
import { promotions, Promotion } from '@/data/promotions';
import { specialties, Specialty } from '@/data/specialties';

// --- Seeding Logic ---
const seedEntity = (key: string, data: unknown[]) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const seedAllData = () => {
  seedEntity('agencies', agencies);
  seedEntity('appointments', appointments);
  seedEntity('doctors', doctors);
  seedEntity('patients', patients);
  seedEntity('promotions', promotions);
  seedEntity('specialties', specialties);
};

// Initialize data on first load
seedAllData();

// --- Generic Getter ---
const getEntity = <T>(key: string): T[] => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

// --- Specific Getters ---
export const getAgencies = (): Agency[] => getEntity<Agency>('agencies');
export const getAppointments = (): Appointment[] => getEntity<Appointment>('appointments');
export const getDoctors = (): Doctor[] => getEntity<Doctor>('doctors');
export const getPatients = (): Patient[] => getEntity<Patient>('patients');
export const getPromotions = (): Promotion[] => getEntity<Promotion>('promotions');
export const getSpecialties = (): Specialty[] => getEntity<Specialty>('specialties');

export const getDoctorById = (id: string): Doctor | undefined => {
  return getDoctors().find(doctor => doctor.id === id);
};

export const getAgencyBySlug = (slug: string): Agency | undefined => {
  return getAgencies().find(agency => agency.slug === slug);
};

export const getDoctorsByAgencyId = (agencyId: string): Doctor[] => {
  return getDoctors().filter(doctor => doctor.agencyId === agencyId);
};

export const getPromotionsByAgencyId = (agencyId: string): Promotion[] => {
  return getPromotions().filter(promo => promo.targetAgencyId === agencyId);
};