export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

export const patients: Patient[] = [
  { id: 'pat-1', name: 'Charlie Brown', email: 'charlie@email.com', phone: '555-001-0001', location: 'Greensville' },
  { id: 'pat-2', name: 'Diana Prince', email: 'diana@email.com', phone: '555-002-0002', location: 'Central City' },
  { id: 'pat-3', name: 'Bruce Wayne', email: 'bruce@email.com', phone: '555-003-0003', location: 'Hightower' },
  { id: 'pat-4', name: 'Peter Parker', email: 'peter@email.com', phone: '555-004-0004', location: 'Central City' },
];