export interface Admin {
  id: string;
  email: string;
  role: 'superadmin' | 'manager';
}

export const admins: Admin[] = [
  { id: 'admin-1', email: 'admin@healthconnect.com', role: 'superadmin' },
];