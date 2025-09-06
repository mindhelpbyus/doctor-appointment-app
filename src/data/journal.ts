export interface JournalEntry {
  id: string;
  patientId: string;
  title: string;
  content: string;
  mood: number; // 1-10 scale
  createdAt: string; // ISO 8601 string
}

export const journalEntries: JournalEntry[] = [
  { id: 'journal-1', patientId: 'pat-1', title: 'Feeling good today', content: 'Had a productive morning and a nice walk.', mood: 8, createdAt: '2024-11-01T10:00:00Z' },
  { id: 'journal-2', patientId: 'pat-1', title: 'A bit stressed', content: 'Work deadlines are piling up.', mood: 5, createdAt: '2024-11-02T14:30:00Z' },
  { id: 'journal-3', patientId: 'pat-1', title: 'Great day!', content: 'Spent time with family, feeling happy.', mood: 9, createdAt: '2024-11-03T18:00:00Z' },
  { id: 'journal-4', patientId: 'pat-1', title: 'Reflective thoughts', content: 'Thinking about future plans.', mood: 7, createdAt: '2024-11-04T09:00:00Z' },
  { id: 'journal-5', patientId: 'pat-1', title: 'Tired but content', content: 'Finished a big project.', mood: 6, createdAt: '2024-11-05T22:00:00Z' },
  { id: 'journal-6', patientId: 'pat-1', title: 'Feeling hopeful', content: 'New opportunities on the horizon.', mood: 8, createdAt: '2024-11-06T11:00:00Z' },
  { id: 'journal-7', patientId: 'pat-1', title: 'Relaxed evening', content: 'Enjoyed a quiet night in.', mood: 7, createdAt: '2024-11-07T20:00:00Z' },
  { id: 'journal-8', patientId: 'pat-2', title: 'New city, new feelings', content: 'Adjusting to a new environment.', mood: 6, createdAt: '2024-11-01T12:00:00Z' },
  { id: 'journal-9', patientId: 'pat-demo', title: 'Demo mood entry', content: 'This is a test entry for the demo patient.', mood: 7, createdAt: new Date().toISOString() },
];