export interface IBooking {
  id: string;
  customerId: string;
  packageId: string;
  bookingDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paidAmount: number;
  remainingAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateBookingDto {
  customerId: string;
  packageId: string;
  totalPrice: number;
  notes?: string;
}

export interface IUpdateBookingDto {
  status?: 'pending' | 'confirmed' | 'paid' | 'cancelled';
  paymentStatus?: 'unpaid' | 'partial' | 'paid';
  paidAmount?: number;
  notes?: string;
}
