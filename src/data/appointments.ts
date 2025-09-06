export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: 'video' | 'in-person';
  date: string;
  time: string;
  status: 'booked' | 'cancelled' | 'completed';
}

export const appointments: Appointment[] = [
  { id: 'appt-1', patientId: 'pat-1', doctorId: 'doc-3', type: 'in-person', date: '2024-10-26', time: '10:00 AM', status: 'completed' },
  { id: 'appt-2', patientId: 'pat-2', doctorId: 'doc-5', type: 'in-person', date: '2024-11-01', time: '02:30 PM', status: 'booked' },
  { id: 'appt-3', patientId: 'pat-3', doctorId: 'doc-10', type: 'video', date: '2024-11-05', time: '09:00 AM', status: 'booked' },
  { id: 'appt-4', patientId: 'pat-1', doctorId: 'doc-4', type: 'video', date: '2024-11-08', time: '03:00 PM', status: 'cancelled' },
];