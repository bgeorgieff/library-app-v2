import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IUserPasswordRecovery } from 'src/app/Interfaces/users/user-reset-password.interface';
import { ToastService } from 'src/app/Services/toast.service';
import { Regexes } from 'src/app/GlobalVariables/regexes';
import { passwordMatchValidator } from 'src/app/Directives/passMatch.directive';
import { AccountService } from 'src/app/Services/account.service';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { Routes } from 'src/app/Enums/routes.enum';
import { ErrorMessages } from 'src/app/Enums/error-messages.enum';
import { Images } from 'src/app/Enums/images.enum';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  logo = Images.MainLogo;
  email = '';
  subscriptions: Subscription[] = [];

  newPasswordForm = this.formBuilder.group(
    {
      password: [
        '',
        [Validators.required, Validators.pattern(Regexes.PASSWORD_PATTERN)],
      ],
      repeatPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.subscribe({
        next: (params) => {
          this.email = params['email'];
        },
      })
    );
  }

  isInvalid(field: string) {
    return (
      this.newPasswordForm.get(field)?.invalid &&
      (this.newPasswordForm.get(field)?.touched ||
        this.newPasswordForm.get(field)?.dirty)
    );
  }

  get password(): FormControl {
    return this.newPasswordForm.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.newPasswordForm.get('repeatPassword') as FormControl;
  }

  onSubmit(): void {
    if (this.newPasswordForm.invalid) {
      return;
    }

    const newPassword: IUserPasswordRecovery = {
      password: this.password.value,
      confirmPassword: this.repeatPassword.value,
      email: this.email,
    };

    this.subscriptions.push(
      this.accountService.setNewPassword(newPassword).subscribe({
        next: (response) => {
          // response.isSuccess is always false
          // even when the password is changed successfully
          if (response.message === SuccessMessages.PasswordResetSuccesful) {
            this.toastrService.showSuccess(response.message, '');
            this.router.navigate([Routes.AccountLogin]);
          } else {
            this.toastrService.onError(ErrorMessages.SetNewPasswordFailed, '');
          }
        },
        error: () => {
          this.toastrService.onError(ErrorMessages.WentWrong, '');
        },
      })
    );

    this.newPasswordForm.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
