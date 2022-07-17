import { Role } from '../Enums/role.enum';

export interface ITokenPayload {
  email: string;
  unique_name: string;
  role: Role;
}
