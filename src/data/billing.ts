export interface Billing {
  id: string;
  patientId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export const billing: Billing[] = [
  {
    id: 'BILL001',
    patientId: 'PAT001',
    amount: 150.0,
    date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString(),
    status: 'Paid',
  },
  {
    id: 'BILL002',
    patientId: 'PAT002',
    amount: 200.0,
    date: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
    status: 'Pending',
  },
  {
    id: 'BILL003',
    patientId: 'PAT003',
    amount: 75.0,
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: 'Paid',
  },
];
