export interface AgencyUser {
  id: string;
  email: string;
  agencyId: string;
  // In a real app, you'd have a hashed password here.
}

export const agencyUsers: AgencyUser[] = [
  { id: 'user-1', email: 'manager@wgc.com', agencyId: 'agency-1' },
  { id: 'user-2', email: 'admin@cgh.com', agencyId: 'agency-2' },
  { id: 'user-3', email: 'lead@ahs.com', agencyId: 'agency-3' },
  // Demo Agency Provider (for Wellness Grove Clinic)
  { id: 'user-demo', email: 'provider@demo.com', agencyId: 'agency-1' },
];