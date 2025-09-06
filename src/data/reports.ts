export interface MonthlyRevenue {
  month: string; // e.g., "Jan", "Feb"
  revenue: number;
}

export interface AgencyPerformanceReport {
  totalRevenue: number;
  totalAppointments: number;
  averageAppointmentValue: number;
  monthlyRevenue: MonthlyRevenue[];
}

export interface DoctorPerformanceReport {
  doctorId: string;
  doctorName: string;
  averageRating: number;
  totalAppointments: number;
  patientSatisfactionScore: number; // e.g., out of 5
  revenueGenerated: number;
}

export interface PromotionReport {
  promotionId: string;
  promotionTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  redemptions: number;
  revenueGenerated: number;
}

// Mock Data for Agency Performance
export const agencyPerformanceReport: AgencyPerformanceReport = {
  totalRevenue: 123450,
  totalAppointments: 560,
  averageAppointmentValue: 220.45,
  monthlyRevenue: [
    { month: 'Jan', revenue: 8000 },
    { month: 'Feb', revenue: 9500 },
    { month: 'Mar', revenue: 11000 },
    { month: 'Apr', revenue: 10500 },
    { month: 'May', revenue: 12000 },
    { month: 'Jun', revenue: 13500 },
    { month: 'Jul', revenue: 14000 },
    { month: 'Aug', revenue: 15000 },
    { month: 'Sep', revenue: 10000 },
    { month: 'Oct', revenue: 10500 },
    { month: 'Nov', revenue: 9000 },
    { month: 'Dec', revenue: 10000 },
  ],
};

// Mock Data for Doctor Performance (filtered by agency in localApi)
export const doctorPerformanceReports: DoctorPerformanceReport[] = [
  {
    doctorId: 'doc-1', // Dr. Evelyn Reed (Individual)
    doctorName: 'Dr. Evelyn Reed',
    averageRating: 4.9,
    totalAppointments: 60,
    patientSatisfactionScore: 4.8,
    revenueGenerated: 12000,
  },
  {
    doctorId: 'doc-2', // Dr. Frank Miller (Individual)
    doctorName: 'Dr. Frank Miller',
    averageRating: 4.8,
    totalAppointments: 75,
    patientSatisfactionScore: 4.7,
    revenueGenerated: 15000,
  },
  {
    doctorId: 'doc-3', // Dr. Alice Smith (Agency-1)
    doctorName: 'Dr. Alice Smith',
    averageRating: 4.8,
    totalAppointments: 85,
    patientSatisfactionScore: 4.7,
    revenueGenerated: 18700,
  },
  {
    doctorId: 'doc-4', // Dr. Bob Johnson (Agency-1)
    doctorName: 'Dr. Bob Johnson',
    averageRating: 4.7,
    totalAppointments: 70,
    patientSatisfactionScore: 4.6,
    revenueGenerated: 15400,
  },
  {
    doctorId: 'doc-5', // Dr. Carol White (Agency-2)
    doctorName: 'Dr. Carol White',
    averageRating: 4.9,
    totalAppointments: 120,
    patientSatisfactionScore: 4.9,
    revenueGenerated: 26400,
  },
  {
    doctorId: 'doc-6', // Dr. David Green (Agency-2)
    doctorName: 'Dr. David Green',
    averageRating: 4.8,
    totalAppointments: 90,
    patientSatisfactionScore: 4.8,
    revenueGenerated: 19800,
  },
  {
    doctorId: 'doc-7', // Dr. Grace Hall (Agency-2)
    doctorName: 'Dr. Grace Hall',
    averageRating: 4.9,
    totalAppointments: 100,
    patientSatisfactionScore: 4.8,
    revenueGenerated: 22000,
  },
  {
    doctorId: 'doc-8', // Dr. Henry Taylor (Agency-3)
    doctorName: 'Dr. Henry Taylor',
    averageRating: 4.7,
    totalAppointments: 65,
    patientSatisfactionScore: 4.6,
    revenueGenerated: 14300,
  },
  {
    doctorId: 'doc-9', // Dr. Irene King (Agency-3)
    doctorName: 'Dr. Irene King',
    averageRating: 4.9,
    totalAppointments: 80,
    patientSatisfactionScore: 4.9,
    revenueGenerated: 17600,
  },
  {
    doctorId: 'doc-10', // Dr. Jack Lewis (Agency-3)
    doctorName: 'Dr. Jack Lewis',
    averageRating: 4.8,
    totalAppointments: 95,
    patientSatisfactionScore: 4.7,
    revenueGenerated: 20900,
  },
  // New doctors for reports
  {
    doctorId: 'doc-11', // Dr. Olivia Wilson (Individual)
    doctorName: 'Dr. Olivia Wilson',
    averageRating: 4.6,
    totalAppointments: 50,
    patientSatisfactionScore: 4.5,
    revenueGenerated: 10000,
  },
  {
    doctorId: 'doc-12', // Dr. Liam Davis (Agency-1)
    doctorName: 'Dr. Liam Davis',
    averageRating: 4.9,
    totalAppointments: 70,
    patientSatisfactionScore: 4.8,
    revenueGenerated: 14000,
  },
];

// Mock Data for Promotion Reports (filtered by agency in localApi)
export const promotionReports: PromotionReport[] = [
  {
    promotionId: 'promo-1', // Wellness Grove Clinic
    promotionTitle: 'New Patient Discount',
    status: 'approved',
    redemptions: 45,
    revenueGenerated: 900,
  },
  {
    promotionId: 'promo-2', // City General Hospital
    promotionTitle: 'Annual Heart Check-up',
    status: 'approved',
    redemptions: 20,
    revenueGenerated: 1000,
  },
  {
    promotionId: 'promo-3', // Dr. Reed (Individual)
    promotionTitle: 'Video Consult Special',
    status: 'pending',
    redemptions: 0,
    revenueGenerated: 0,
  },
  {
    promotionId: 'promo-4', // Apex Health System
    promotionTitle: 'Apex Neurology Offer',
    status: 'pending',
    redemptions: 0,
    revenueGenerated: 0,
  },
  // New promotion for agency-4
  {
    promotionId: 'promo-5', // Bright Future Pediatrics
    promotionTitle: 'First Visit Free Consult',
    status: 'approved',
    redemptions: 15,
    revenueGenerated: 0, // Free consult
  },
];