export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  identityNumber: string;
  passportNumber?: string;
  dateOfBirth: string;
  gender: 'L' | 'P';
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  address: string;
  identityNumber: string;
  passportNumber?: string;
  dateOfBirth: string;
  gender: 'L' | 'P';
}

export interface IUpdateCustomerDto extends Partial<ICreateCustomerDto> {}
