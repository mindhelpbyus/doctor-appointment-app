export interface VisitSummary {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string; // ISO 8601 date of the visit
  diagnosis: string;
  treatmentPlan: string;
  notes: string;
  followUpRecommended: boolean;
  followUpDate?: string; // ISO 8601 date
}

export const visitSummaries: VisitSummary[] = [
  {
    id: 'vs-1',
    appointmentId: 'appt-1',
    patientId: 'pat-1',
    doctorId: 'doc-3',
    date: '2024-10-26',
    diagnosis: 'Common cold',
    treatmentPlan: 'Rest, fluids, over-the-counter medication.',
    notes: 'Patient presented with mild fever and congestion. Advised to monitor symptoms.',
    followUpRecommended: false,
  },
  {
    id: 'vs-2',
    appointmentId: 'appt-4', // This appointment was cancelled, but for demo, let's assume a summary was made before cancellation or it was a completed visit that was later cancelled.
    patientId: 'pat-1',
    doctorId: 'doc-4',
    date: '2024-11-08',
    diagnosis: 'Seasonal allergies',
    treatmentPlan: 'Antihistamines, avoid allergens.',
    notes: 'Patient reported sneezing and itchy eyes. Discussed environmental triggers.',
    followUpRecommended: true,
    followUpDate: '2024-12-08',
  },
];