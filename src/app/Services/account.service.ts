import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { API } from '../Constants/api-info';
import { Users } from '../Constants/users-endpoints';
import { IUserLoginResponse } from '../Interfaces/users/user-login-response.interface';
import { Account } from '../Constants/account-endpoints';
import { IUserPasswordRecovery } from '../Interfaces/users/user-reset-password.interface';
import { IForgotPassword } from '../Interfaces/users/user-forgot-password.interface';
import { IPasswordResetResponse } from '../Interfaces/users/user-password-reset-response.interface';
import { IUserView } from '../Interfaces/users/user-view.interface';
import { IUserPicture } from '../Interfaces/users/user-picture.interface';
import { IStatusResponse } from '../Interfaces/status-response.interface';
import { IUserLoginPost } from '../Interfaces/users/user-login-post.interface';
import { IUserRegister } from '../Interfaces/users/user-register.interface';
import { StorageService } from './storage.service';
import { Role } from '../Enums/role.enum';
@Injectable({ providedIn: 'root' })
export class AccountService {
  private userResetEmail = '';
  currentUser = new BehaviorSubject<IUserView | null>(null);

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  getUser(): Observable<IUserView> {
    return this.httpClient.get<IUserView>(
      API.Endpoint(Users.GetById(this.storageService.tokenPayload.unique_name))
    );
  }

  getReadersCount(): Observable<number> {
    return this.httpClient.get<number>(API.Endpoint(Users.Count));
  }

  getUserRole(): string {
    return this.storageService.tokenPayload?.role ?? Role.None;
  }

  resetEmail(): string {
    return this.userResetEmail;
  }

  isUserLoggedIn(): boolean {
    return !!this.storageService.getToken();
  }

  uploadPicture(formData: FormData): Observable<IUserPicture> {
    return this.httpClient.post<IUserPicture>(
      API.Endpoint(Users.UploadPicture),
      formData
    );
  }

  register(registerForm: IUserRegister): Observable<IStatusResponse> {
    return this.httpClient.post<IStatusResponse>(
      API.Endpoint(Users.Register),
      registerForm
    );
  }

  setNewPassword(
    newPasswordData: IUserPasswordRecovery
  ): Observable<IPasswordResetResponse> {
    return this.httpClient.post<IPasswordResetResponse>(
      API.Endpoint(Account.ResetPassword),
      newPasswordData
    );
  }

  login(loginForm: IUserLoginPost): Observable<IUserLoginResponse> {
    return this.httpClient.post<IUserLoginResponse>(
      API.Endpoint(Users.Login),
      loginForm
    );
  }

  logout(): void {
    this.storageService.clear();
    this.currentUser.next(null);
  }

  resetPassword(resetEmail: IForgotPassword): Observable<IStatusResponse> {
    this.userResetEmail = resetEmail.email;
    return this.httpClient.post<IStatusResponse>(
      API.Endpoint(Account.ForgetPassword),
      resetEmail
    );
  }
}
