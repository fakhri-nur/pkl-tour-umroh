export interface IPackage {
  id: string;
  name: string;
  type: 'umroh' | 'haji';
  price: number;
  duration: number;
  description: string;
  quota: number;
  availableSeats: number;
  departureDate: string;
  returnDate: string;
  facilities: string[];
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePackageDto {
  name: string;
  type: 'umroh' | 'haji';
  price: number;
  duration: number;
  description: string;
  quota: number;
  departureDate: string;
  returnDate: string;
  facilities: string[];
  imageUrl?: string;
}

export interface IUpdatePackageDto extends Partial<ICreatePackageDto> {
  isActive?: boolean;
}

export interface IPackageCard {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'all' | 'umrah' | 'haji' | 'halal-tour';
  status: 'Open' | 'Almost Full' | 'Closed';
  date: string;
  hotel: string;
  airline: string;
  remainingSeats: number;
  imageUrl: string;
}
