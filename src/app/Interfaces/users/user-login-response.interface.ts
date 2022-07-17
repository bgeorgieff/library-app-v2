import { IUserLoginToken } from './user-login-token.interface';

export interface IUserLoginResponse {
  id: string;
  approved: boolean;
  token: IUserLoginToken;
}
