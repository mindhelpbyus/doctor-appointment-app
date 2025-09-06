import { agencies, Agency } from '@/data/agencies';
import { appointments, Appointment } from '@/data/appointments';
import { doctors, Doctor } from '@/data/doctors';
import { patients, Patient } from '@/data/patients';
import { promotions, Promotion } from '@/data/promotions';
import { specialties, Specialty } from '@/data/specialties';
import { admins, Admin } from '@/data/admins';
import { agencyUsers, AgencyUser } from '@/data/agencyUsers';

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
  seedEntity('admins', admins);
  seedEntity('agencyUsers', agencyUsers);
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
export const getSpecialties = (): Specialty[] => specialties;
export const getAdmins = (): Admin[] => getEntity<Admin>('admins');
export const getAgencyUsers = (): AgencyUser[] => getEntity<AgencyUser>('agencyUsers');

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

// --- Complex Getters ---
export const getDoctorById = (id: string): Doctor | undefined => getDoctors().find(d => d.id === id);
export const getSpecialtyById = (id: string): Specialty | undefined => getSpecialties().find(s => s.id === id);
export const getAgencyBySlug = (slug: string): Agency | undefined => getAgencies().find(a => a.slug === slug);
export const getAgencyById = (id: string): Agency | undefined => getAgencies().find(a => a.id === id);
export const getPatientById = (id: string): Patient | undefined => getPatients().find(p => p.id === id);
export const getDoctorsByAgencyId = (agencyId: string): Doctor[] => getDoctors().filter(d => d.agencyId === agencyId);
export const getPromotionsByAgencyId = (agencyId: string): Promotion[] => getPromotions().filter(p => p.targetAgencyId === agencyId);
export const getAppointmentsForDoctors = (doctorIds: string[]): Appointment[] => {
  const doctorIdSet = new Set(doctorIds);
  return getAppointments().filter(a => doctorIdSet.has(a.doctorId) && a.status === 'booked');
};