export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: 'video' | 'in-person';
  datetime: string; // ISO 8601 format
  status: 'booked' | 'cancelled' | 'completed';
}

export const appointments: Appointment[] = [
  { id: 'appt-1', patientId: 'pat-1', doctorId: 'doc-3', type: 'in-person', datetime: '2024-10-26T10:00:00Z', status: 'completed' },
  { id: 'appt-2', patientId: 'pat-2', doctorId: 'doc-5', type: 'in-person', datetime: '2024-11-28T14:30:00Z', status: 'booked' },
  { id: 'appt-3', patientId: 'pat-3', doctorId: 'doc-10', type: 'video', datetime: '2024-11-29T09:00:00Z', status: 'booked' },
  { id: 'appt-4', patientId: 'pat-1', doctorId: 'doc-4', type: 'video', datetime: '2024-11-08T15:00:00Z', status: 'cancelled' },
  { id: 'appt-5', patientId: 'pat-4', doctorId: 'doc-2', type: 'in-person', datetime: '2024-12-02T11:00:00Z', status: 'booked' },
];