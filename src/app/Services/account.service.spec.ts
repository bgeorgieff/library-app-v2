import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { defer } from 'rxjs/internal/observable/defer';
import { Role } from '../Enums/role.enum';
import { IStatusResponse } from '../Interfaces/status-response.interface';
import { ITokenPayload } from '../Interfaces/token-payload.interface';
import { IForgotPassword } from '../Interfaces/users/user-forgot-password.interface';
import { IUserLoginPost } from '../Interfaces/users/user-login-post.interface';
import { IUserLoginResponse } from '../Interfaces/users/user-login-response.interface';
import { IUserLoginToken } from '../Interfaces/users/user-login-token.interface';
import { IPasswordResetResponse } from '../Interfaces/users/user-password-reset-response.interface';
import { IUserPicture } from '../Interfaces/users/user-picture.interface';
import { IUserRegister } from '../Interfaces/users/user-register.interface';
import { IUserPasswordRecovery } from '../Interfaces/users/user-reset-password.interface';
import { IUserView } from '../Interfaces/users/user-view.interface';

import { AccountService } from './account.service';
import { StorageService } from './storage.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpClient: HttpClient;
  let storageService: StorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [StorageService],
    });
    service = TestBed.inject(AccountService);
    httpClient = TestBed.inject(HttpClient);
    storageService = TestBed.inject(StorageService);
  });

  const mockRegister: IUserRegister = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
  };

  const mockUserView: IUserView = {
    id: 'myname',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    isApproved: true,
    rents: [],
    passwordRecoveryTokens: [],
    messagesReceived: [],
    messagesSent: [],
  };

  const mockLogin: IUserLoginPost = {
    email: '',
    password: '',
  };

  const bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15bWFpbEBtYWlsLmNvbSIsIm5hbWVpZCI6WyI1NmQ1ZTNjNS1hY2I2LTQ5MzYtZTJlNS0wOGRhMjlkYzlmMGEiLCJteW1haWxAbWFpbC5jb20iXSwidW5pcXVlX25hbWUiOiI1NmQ1ZTNjNS1hY2I2LTQ5MzYtZTJlNS0wOGRhMjlkYzlmMGEiLCJ0eXAiOiJUcnVlIiwicm9sZSI6IlN1YnNjcmliZXIiLCJuYmYiOjE2NTM5MjE4NTMsImV4cCI6MTY1NDUyNjY1MywiaWF0IjoxNjUzOTIxODUzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.opuiRRDG9e0zJoz4bkJ1ZhZW823_AFW2PpdK3LtsoJM';

  const mockToken: IUserLoginToken = {
    result: bearerToken,
    id: 0,
    exception: null,
    status: 0,
    isCanceled: false,
    isCompleted: true,
    isCompletedSuccessfully: true,
    creationOptions: 0,
    asyncState: null,
    isFaulted: false,
  };

  const mockLoginResponse: IUserLoginResponse = {
    id: '1',
    approved: true,
    token: mockToken,
  };

  const mockStatusResponse: IStatusResponse = {
    statusCode: 204,
  };

  const payloadWithAdminRole: ITokenPayload = {
    email: 'test@mail.com',
    unique_name: 'myname',
    role: Role.Admin,
  };

  const mockPasswordReset: IPasswordResetResponse = {
    message: '',
    isSuccess: false,
    errors: [],
    expireDate: new Date(),
  };

  const mockPasswordRecovery: IUserPasswordRecovery = {
    password: '',
    confirmPassword: '',
    email: 'test@mail.com',
  };

  const mockForgotPassword: IForgotPassword = {
    email: 'test@mail.com',
  };

  const mockUserPicture: IUserPicture = {
    file: 'test',
  };

  describe('Should', () => {
    it('be created', () => {
      expect(service).toBeTruthy();
    });

    it('have empty reset email', () => {
      expect(service.resetEmail()).toEqual('');
    });
  });

  describe('isUserLoggedIn should return', () => {
    it('false when there is no user', () => {
      expect(service.isUserLoggedIn()).toBeFalsy();
    });
    it('true when there is a user', () => {
      spyOn(storageService, 'getToken').and.returnValue(bearerToken);
      expect(service.isUserLoggedIn()).toBeTruthy();
    });
  });

  describe('getUserRole should return', () => {
    it('Role None initially', () => {
      expect(service.getUserRole()).toEqual(Role.None);
    });

    it('Admin role with admin payload', () => {
      storageService.tokenPayload = payloadWithAdminRole;
      expect(service.getUserRole()).toEqual(Role.Admin);
    });
  });

  it('getReadersCount should return number of users', fakeAsync(() => {
    const userCount = 20;
    spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(userCount));

    let result!: number;
    service.getReadersCount().subscribe((response) => {
      result = response;
    });

    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(userCount);
  }));

  it('getUser should return user with given unique name', fakeAsync(() => {
    storageService.tokenPayload = payloadWithAdminRole;
    spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(mockUserView));

    let result!: IUserView;
    service.getUser().subscribe((user) => {
      result = user;
    });
    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockUserView);
  }));

  it('register should return valid status response', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(
      fakeAsyncResponse(mockStatusResponse)
    );

    let result!: IStatusResponse;
    service.register(mockRegister).subscribe((response) => {
      result = response;
    });

    expect(httpClient.post).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockStatusResponse);
  }));

  it('login should return valid user login response', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(
      fakeAsyncResponse(mockLoginResponse)
    );

    let result!: IUserLoginResponse;
    service.login(mockLogin).subscribe((response) => {
      result = response;
    });

    expect(httpClient.post).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockLoginResponse);
  }));

  it('logout should return set current user to null', fakeAsync(() => {
    const clearMethod = spyOn(storageService, 'clear');

    service.logout();

    expect(clearMethod).toHaveBeenCalled();
    tick();
    expect(service.currentUser.value).toBeNull();
  }));

  it('uploadPicture should upload picture', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(
      fakeAsyncResponse(mockUserPicture)
    );
    const formData = new FormData();
    formData.append('file', '');

    let result!: IUserPicture;
    service.uploadPicture(formData).subscribe((response) => {
      result = response;
    });

    expect(httpClient.post).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockUserPicture);
  }));

  it('resetPassword should return valid status response', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(
      fakeAsyncResponse(mockStatusResponse)
    );

    let result!: IStatusResponse;
    service.resetPassword(mockForgotPassword).subscribe((response) => {
      result = response;
    });

    expect(httpClient.post).toHaveBeenCalled();
    tick();
    expect(service.resetEmail()).toEqual(mockForgotPassword.email);
    expect(result).toEqual(mockStatusResponse);
  }));

  it('setNewPassword should return valid password reset response', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(
      fakeAsyncResponse(mockPasswordReset)
    );

    let result!: IPasswordResetResponse;
    service.setNewPassword(mockPasswordRecovery).subscribe((response) => {
      result = response;
    });

    expect(httpClient.post).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockPasswordReset);
  }));

  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
