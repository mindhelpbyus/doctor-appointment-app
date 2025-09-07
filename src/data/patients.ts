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
  { id: 'pat-6', name: 'Clark Kent', email: 'clark@email.com', phone: '555-006-0006', location: 'Metropolis', savedAppointments: [], recentlyViewedDoctors: ['doc-5'] },
  { id: 'pat-7', name: 'Lois Lane', email: 'lois@email.com', phone: '555-007-0007', location: 'Metropolis', savedAppointments: [], recentlyViewedDoctors: ['doc-6'] },
  { id: 'pat-8', name: 'John Smith', email: 'john.smith@email.com', phone: '555-010-1001', location: 'Greensville', savedAppointments: ['appt-5'], recentlyViewedDoctors: ['doc-1'] },
  { id: 'pat-9', name: 'Jane Doe', email: 'jane.doe@email.com', phone: '555-010-1002', location: 'Central City', savedAppointments: [], recentlyViewedDoctors: ['doc-2', 'doc-3'] },
  { id: 'pat-10', name: 'Michael Johnson', email: 'michael.j@email.com', phone: '555-010-1003', location: 'Metropolis', savedAppointments: ['appt-6'], recentlyViewedDoctors: ['doc-4'] },
  { id: 'pat-11', name: 'Emily Davis', email: 'emily.d@email.com', phone: '555-010-1004', location: 'Hightower', savedAppointments: [], recentlyViewedDoctors: ['doc-5', 'doc-6'] },
  { id: 'pat-12', name: 'David Wilson', email: 'david.w@email.com', phone: '555-010-1005', location: 'Greensville', savedAppointments: ['appt-7'], recentlyViewedDoctors: ['doc-7'] },
  { id: 'pat-13', name: 'Sarah Miller', email: 'sarah.m@email.com', phone: '555-010-1006', location: 'Central City', savedAppointments: [], recentlyViewedDoctors: ['doc-8', 'doc-9'] },
  { id: 'pat-14', name: 'Chris Garcia', email: 'chris.g@email.com', phone: '555-010-1007', location: 'Metropolis', savedAppointments: ['appt-8'], recentlyViewedDoctors: ['doc-10'] },
  { id: 'pat-15', name: 'Jessica Rodriguez', email: 'jessica.r@email.com', phone: '555-010-1008', location: 'Hightower', savedAppointments: [], recentlyViewedDoctors: ['doc-1'] },
  { id: 'pat-16', name: 'Daniel Martinez', email: 'daniel.m@email.com', phone: '555-010-1009', location: 'Greensville', savedAppointments: ['appt-9'], recentlyViewedDoctors: ['doc-2'] },
  { id: 'pat-17', name: 'Laura Hernandez', email: 'laura.h@email.com', phone: '555-010-1010', location: 'Central City', savedAppointments: [], recentlyViewedDoctors: ['doc-3', 'doc-4'] },
  { id: 'pat-18', name: 'Kevin Lopez', email: 'kevin.l@email.com', phone: '555-010-1011', location: 'Metropolis', savedAppointments: ['appt-10'], recentlyViewedDoctors: ['doc-5'] },
  { id: 'pat-19', name: 'Amanda Gonzalez', email: 'amanda.g@email.com', phone: '555-010-1012', location: 'Hightower', savedAppointments: [], recentlyViewedDoctors: ['doc-6', 'doc-7'] },
  { id: 'pat-20', name: 'Brian Perez', email: 'brian.p@email.com', phone: '555-010-1013', location: 'Greensville', savedAppointments: [], recentlyViewedDoctors: ['doc-8'] },
  { id: 'pat-21', name: 'Michelle Sanchez', email: 'michelle.s@email.com', phone: '555-010-1014', location: 'Central City', savedAppointments: [], recentlyViewedDoctors: ['doc-9', 'doc-10'] },
  { id: 'pat-22', name: 'Jason Rivera', email: 'jason.r@email.com', phone: '555-010-1015', location: 'Metropolis', savedAppointments: [], recentlyViewedDoctors: ['doc-1'] },
  { id: 'pat-23', name: 'Jennifer Torres', email: 'jennifer.t@email.com', phone: '555-010-1016', location: 'Hightower', savedAppointments: [], recentlyViewedDoctors: ['doc-2'] },
  { id: 'pat-24', name: 'Robert Ramirez', email: 'robert.r@email.com', phone: '555-010-1017', location: 'Greensville', savedAppointments: [], recentlyViewedDoctors: ['doc-3'] },
  { id: 'pat-25', name: 'Cynthia Flores', email: 'cynthia.f@email.com', phone: '555-010-1018', location: 'Central City', savedAppointments: [], recentlyViewedDoctors: ['doc-4'] },
  { id: 'pat-26', name: 'William Gomez', email: 'william.g@email.com', phone: '555-010-1019', location: 'Metropolis', savedAppointments: [], recentlyViewedDoctors: ['doc-5'] },
  { id: 'pat-27', name: 'Karen Diaz', email: 'karen.d@email.com', phone: '555-010-1020', location: 'Hightower', savedAppointments: [], recentlyViewedDoctors: ['doc-6'] },
  // Demo Patient
  { id: 'pat-demo', name: 'Demo Patient', email: 'patient@demo.com', phone: '555-999-0001', location: 'Demo City', savedAppointments: [], recentlyViewedDoctors: [] },
];