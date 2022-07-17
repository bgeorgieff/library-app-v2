import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/Services/toast.service';
import { AccountService } from 'src/app/Services/account.service';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { Routes } from 'src/app/Enums/routes.enum';
import { Images } from 'src/app/Enums/images.enum';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  logo = Images.MainLogo;
  subscriptions: Subscription[] = [];

  resetPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.maxLength(256)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastrService: ToastService
  ) {}

  isInvalid(field: string) {
    return (
      this.resetPasswordForm.get(field)?.invalid &&
      (this.resetPasswordForm.get(field)?.touched ||
        this.resetPasswordForm.get(field)?.dirty)
    );
  }

  get email(): FormControl {
    return this.resetPasswordForm.get('email') as FormControl;
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const resetEmail = {
      email: this.email.value,
    };

    this.subscriptions.push(
      this.accountService.resetPassword(resetEmail).subscribe({
        next: () => {
          this.toastrService.showSuccess(SuccessMessages.MailSent, '');
          this.router.navigate([Routes.AccountResetConfirm]);
        },
        error: () => {
          this.toastrService?.onError(SuccessMessages.MailSentFailed, '');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
