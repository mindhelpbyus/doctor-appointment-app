export interface Review {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO 8601
}

export const reviews: Review[] = [
  // Reviews for Dr. Evelyn Reed (doc-1)
  { id: 'rev-1', doctorId: 'doc-1', patientId: 'pat-2', patientName: 'Diana Prince', rating: 5, comment: 'Dr. Reed was fantastic! Very knowledgeable and made me feel comfortable.', date: '2024-10-15T10:00:00Z' },
  { id: 'rev-2', doctorId: 'doc-1', patientId: 'pat-5', patientName: 'Leia Organa', rating: 4, comment: 'Good experience, but the wait time was a bit long.', date: '2024-09-20T14:30:00Z' },

  // Reviews for Dr. Alice Smith (doc-3)
  { id: 'rev-3', doctorId: 'doc-3', patientId: 'pat-1', patientName: 'Charlie Brown', rating: 5, comment: 'Dr. Smith is wonderful with kids. My son felt at ease right away.', date: '2024-11-01T11:00:00Z' },
  { id: 'rev-4', doctorId: 'doc-3', patientId: 'pat-demo', patientName: 'Demo Patient', rating: 5, comment: 'A very caring and attentive doctor. Highly recommend!', date: '2024-10-28T09:00:00Z' },

  // Reviews for Dr. Bob Johnson (doc-4)
  { id: 'rev-5', doctorId: 'doc-4', patientId: 'pat-1', patientName: 'Charlie Brown', rating: 4, comment: 'Dr. Johnson was thorough and explained everything clearly.', date: '2024-08-10T15:00:00Z' },

  // Reviews for Dr. Carol White (doc-5)
  { id: 'rev-6', doctorId: 'doc-5', patientId: 'pat-2', patientName: 'Diana Prince', rating: 5, comment: 'An expert in her field. Dr. White provided excellent care and follow-up.', date: '2024-10-05T13:00:00Z' },
  { id: 'rev-7', doctorId: 'doc-5', patientId: 'pat-6', patientName: 'Clark Kent', rating: 5, comment: 'Felt like I was in the best hands. Very professional and reassuring.', date: '2024-09-12T16:00:00Z' },
];