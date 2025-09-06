import { agencies, Agency } from '@/data/agencies';
import { appointments, Appointment } from '@/data/appointments';
import { doctors, Doctor } from '@/data/doctors';
import { patients, Patient } from '@/data/patients';
import { promotions, Promotion } from '@/data/promotions';
import { specialties, Specialty } from '@/data/specialties';
import { admins, Admin } from '@/data/admins';

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
  // Specialties are not seeded as they contain non-serializable components (icons)
  seedEntity('admins', admins);
};

// Initialize data on first load
seedAllData();

// --- Generic Getter ---
const getEntity = <T>(key: string): T[] => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

// --- Generic Updater ---
const updateEntity = <T extends { id: string }>(key: string, updatedItem: T): void => {
  const items = getEntity<T>(key);
  const newItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
  localStorage.setItem(key, JSON.stringify(newItems));
};

// --- Specific Getters ---
export const getAgencies = (): Agency[] => getEntity<Agency>('agencies');
export const getAppointments = (): Appointment[] => getEntity<Appointment>('appointments');
export const getDoctors = (): Doctor[] => getEntity<Doctor>('doctors');
export const getPatients = (): Patient[] => getEntity<Patient>('patients');
export const getPromotions = (): Promotion[] => getEntity<Promotion>('promotions');
export const getSpecialties = (): Specialty[] => specialties; // Return directly to preserve components
export const getAdmins = (): Admin[] => getEntity<Admin>('admins');

// --- Specific Updaters ---
export const updateAgency = (agency: Agency): void => updateEntity<Agency>('agencies', agency);
export const updateDoctor = (doctor: Doctor): void => updateEntity<Doctor>('doctors', doctor);
export const updatePromotion = (promotion: Promotion): void => updateEntity<Promotion>('promotions', promotion);

export const addAppointment = (appointment: Omit<Appointment, 'id'>): void => {
  const items = getEntity<Appointment>('appointments');
  const newAppointment = { ...appointment, id: `appt-${Date.now()}` };
  const newItems = [...items, newAppointment];
  localStorage.setItem('appointments', JSON.stringify(newItems));
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return getDoctors().find(doctor => doctor.id === id);
};

export const getSpecialtyById = (id: string): Specialty | undefined => {
  return getSpecialties().find(s => s.id === id);
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