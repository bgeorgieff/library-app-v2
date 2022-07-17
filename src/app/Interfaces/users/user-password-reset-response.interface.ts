export interface IPasswordResetResponse {
  message: string;
  isSuccess: boolean;
  errors: string[];
  expireDate: Date;
}
