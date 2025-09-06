import { mockDoctors } from '@/data/mockData';

// Define a type for our doctor data for better type safety
type Doctor = typeof mockDoctors[0];

const DOCTORS_STORAGE_KEY = 'healthconnect_doctors';

// Seed the local storage with initial data if it's empty
const seedData = () => {
  const storedData = localStorage.getItem(DOCTORS_STORAGE_KEY);
  if (!storedData) {
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(mockDoctors));
  }
};

// Initialize data on load
seedData();

// --- API Functions ---

export const getDoctors = (): Doctor[] => {
  const storedData = localStorage.getItem(DOCTORS_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const getDoctorById = (id: string): Doctor | undefined => {
  const doctors = getDoctors();
  return doctors.find(doctor => doctor.id === id);
};