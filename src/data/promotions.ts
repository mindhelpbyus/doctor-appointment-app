export interface Promotion {
  id: string;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  discountPercent: number;
  targetAgencyId?: string;
  targetDoctorId?: string;
}

export const promotions: Promotion[] = [
  { id: 'promo-1', title: 'New Patient Discount', description: '20% off your first visit at Wellness Grove!', validFrom: '2024-01-01', validTo: '2024-12-31', discountPercent: 20, targetAgencyId: 'agency-1' },
  { id: 'promo-2', title: 'Annual Heart Check-up', description: '15% off cardiology consultations this month.', validFrom: '2024-11-01', validTo: '2024-11-30', discountPercent: 15, targetAgencyId: 'agency-2' },
  { id: 'promo-3', title: 'Video Consult Special', description: '10% off any video consultation with Dr. Reed.', validFrom: '2024-11-01', validTo: '2024-11-30', discountPercent: 10, targetDoctorId: 'doc-1' },
];