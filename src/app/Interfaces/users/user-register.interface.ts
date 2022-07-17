export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  buildingNumber?: string;
  apartmentNumber?: string;
  additionalInfo?: string;
}
