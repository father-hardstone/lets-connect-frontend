export interface Appointment {
  id: number;
  name: string;
  meetLink?: string;
  location?: string;
  time: string;
  category?: string;
  paymentStatus?: 'paid' | 'unpaid' | 'unconfirmed';
} 