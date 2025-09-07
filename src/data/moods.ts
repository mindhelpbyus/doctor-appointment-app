import { Mood } from '@/data/moods';

export const moods: Mood[] = [
  // Recent mood entries for patient PAT001
  {
    id: 'MOOD001',
    patientId: 'PAT001',
    mood: 'Happy',
    notes: 'Feeling great after my morning walk.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  },
  {
    id: 'MOOD002',
    patientId: 'PAT001',
    mood: 'Calm',
    notes: 'Ready to start the day.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
  },
  {
    id: 'MOOD003',
    patientId: 'PAT001',
    mood: 'Anxious',
    notes: 'A bit worried about the upcoming presentation.',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
  },
];
