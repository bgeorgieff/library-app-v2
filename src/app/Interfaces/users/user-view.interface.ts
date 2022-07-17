import { IMessageView } from '../message/message-view.interface';
import { IRentView } from '../rent/rent-view.interface';
import { IUserPasswordRecovery } from './user-password-recovery.interface';

export interface IUserView {
  id: string;
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
  isApproved: boolean;
  imageUrl?: string;
  rents: IRentView[];
  passwordRecoveryTokens: IUserPasswordRecovery[];
  messagesReceived: IMessageView[];
  messagesSent: IMessageView[];
}
