export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string; // ISO 8601 string
}

export const reviews: Review[] = [
  // Reviews for Dr. Evelyn Reed (doc-1)
  { id: 'rev-1', doctorId: 'doc-1', patientName: 'Charlie Brown', rating: 5, comment: 'Dr. Reed was fantastic! Very knowledgeable and made me feel comfortable throughout the entire process. Her advice has already made a huge difference. Highly recommended!', date: '2024-10-15T10:00:00Z' },
  { id: 'rev-2', doctorId: 'doc-1', patientName: 'Diana Prince', rating: 4, comment: 'A very good experience overall. The clinic was clean and the staff were friendly. The wait time was a bit longer than I expected, but Dr. Reed was very thorough.', date: '2024-09-20T14:30:00Z' },

  // Reviews for Dr. Alice Smith (doc-3)
  { id: 'rev-3', doctorId: 'doc-3', patientName: 'Bruce Wayne', rating: 5, comment: 'Dr. Smith is wonderful with kids. My son, who is usually afraid of doctors, felt at ease immediately. She is patient, kind, and very professional.', date: '2024-11-01T11:00:00Z' },
  { id: 'rev-4', doctorId: 'doc-3', patientName: 'Peter Parker', rating: 5, comment: 'Very professional and caring. Dr. Smith took the time to answer all of our questions and provided a clear treatment plan. Highly recommend for any parent.', date: '2024-10-28T09:00:00Z' },

  // Reviews for Dr. Carol White (doc-5)
  { id: 'rev-5', doctorId: 'doc-5', patientName: 'Leia Organa', rating: 5, comment: 'Dr. White is an exceptional cardiologist. She explained everything clearly and took her time with me, ensuring I understood my condition and treatment options.', date: '2024-11-05T15:00:00Z' },
  { id: 'rev-6', doctorId: 'doc-5', patientName: 'Clark Kent', rating: 4, comment: 'A very thorough and competent doctor. The follow-up care has been excellent.', date: '2024-10-10T13:00:00Z' },
  { id: 'rev-7', doctorId: 'doc-5', patientName: 'Lois Lane', rating: 5, comment: 'I feel like I am in the best hands with Dr. White. She is truly a top-tier professional who genuinely cares for her patients.', date: '2024-09-15T16:00:00Z' },

  // Reviews for Dr. Bob Johnson (doc-4)
  { id: 'rev-8', doctorId: 'doc-4', patientName: 'Demo Patient', rating: 4, comment: 'Dr. Johnson is a great GP. He is attentive and provides practical advice. The clinic is well-organized.', date: '2024-11-02T12:00:00Z' },
];