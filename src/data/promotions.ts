export interface Promotion {
  id: string;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  discountType: 'percent' | 'flat';
  discountValue: number;
  targetAgencyId?: string;
  targetDoctorId?: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const promotions: Promotion[] = [
  { id: 'promo-1', title: 'New Patient Discount', description: '20% off your first visit at Wellness Grove!', validFrom: '2024-01-01', validTo: '2024-12-31', discountType: 'percent', discountValue: 20, targetAgencyId: 'agency-1', status: 'approved' },
  { id: 'promo-2', title: 'Annual Heart Check-up', description: '$50 off cardiology consultations this month.', validFrom: '2024-11-01', validTo: '2024-11-30', discountType: 'flat', discountValue: 50, targetAgencyId: 'agency-2', status: 'approved' },
  { id: 'promo-3', title: 'Video Consult Special', description: '10% off any video consultation with Dr. Reed.', validFrom: '2024-11-01', validTo: '2024-11-30', discountType: 'percent', discountValue: 10, targetDoctorId: 'doc-1', status: 'pending' },
  { id: 'promo-4', title: 'Apex Neurology Offer', description: '15% off first-time neurology appointments.', validFrom: '2024-10-01', validTo: '2024-12-31', discountType: 'percent', discountValue: 15, targetAgencyId: 'agency-3', status: 'pending' },
];