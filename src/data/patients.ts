export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  savedAppointments: string[]; // Array of appointment IDs
  recentlyViewedDoctors: string[]; // Array of doctor IDs
}

export const patients: Patient[] = [
  { id: 'pat-1', name: 'Charlie Brown', email: 'charlie@email.com', phone: '555-001-0001', location: 'Greensville', savedAppointments: ['appt-1', 'appt-4'], recentlyViewedDoctors: ['doc-3', 'doc-4'] },
  { id: 'pat-2', name: 'Diana Prince', email: 'diana@email.com', phone: '555-002-0002', location: 'Central City', savedAppointments: ['appt-2'], recentlyViewedDoctors: ['doc-5', 'doc-6', 'doc-7'] },
  { id: 'pat-3', name: 'Bruce Wayne', email: 'bruce@email.com', phone: '555-003-0003', location: 'Hightower', savedAppointments: ['appt-3'], recentlyViewedDoctors: ['doc-10'] },
  { id: 'pat-4', name: 'Peter Parker', email: 'peter@email.com', phone: '555-004-0004', location: 'Central City', savedAppointments: [], recentlyViewedDoctors: ['doc-2'] },
  { id: 'pat-5', name: 'Leia Organa', email: 'leia@email.com', phone: '555-005-0005', location: 'Greensville', savedAppointments: [], recentlyViewedDoctors: ['doc-1'] },
  // Demo Patient
  { id: 'pat-demo', name: 'Demo Patient', email: 'patient@demo.com', phone: '555-999-0001', location: 'Demo City', savedAppointments: [], recentlyViewedDoctors: [] },
];