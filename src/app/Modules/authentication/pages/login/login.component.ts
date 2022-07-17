import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import { ToastService } from 'src/app/Services/toast.service';
import { IUserLoginPost } from 'src/app/Interfaces/users/user-login-post.interface';
import { Routes } from 'src/app/Enums/routes.enum';
import { ErrorMessages } from 'src/app/Enums/error-messages.enum';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { Images } from 'src/app/Enums/images.enum';
import { SignalrService } from 'src/app/Services/signalr.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/Services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  logo = Images.MainLogo;
  subscriptions: Subscription[] = [];

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.maxLength(256)]],
    password: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastrService: ToastService,
    private signalR: SignalrService,
    private storageService: StorageService
  ) {}

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  isInvalid(field: string) {
    return (
      this.loginForm.get(field)?.invalid &&
      (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty)
    );
  }

  login(credential: IUserLoginPost) {
    this.subscriptions.push(
      this.accountService.login(credential).subscribe({
        next: (response) => {
          this.storageService.setToken(response.token.result);
          this.toastrService.showSuccess(SuccessMessages.LoginSuccess, '');

          this.signalR.startConnection();
          this.signalR.watchForMessages();
          this.router.navigate([Routes.Home]);
        },
        error: (error) => {
          if (error.error.statusCode == 401) {
            this.toastrService.onError(ErrorMessages.AccountNotApproved, '');
            return;
          }
          if (error.error.statusCode == 400) {
            this.toastrService.onError(ErrorMessages.UserNotFound, '');
            return;
          }

          this.toastrService.onError(error.error.message ?? '', '');
        },
      })
    );
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: IUserLoginPost = {
      email: this.email.value,
      password: this.password.value,
    };
    this.login(credentials);
    this.loginForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
