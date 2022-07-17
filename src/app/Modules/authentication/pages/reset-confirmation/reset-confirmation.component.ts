import { Component, OnDestroy } from '@angular/core';
import { ToastService } from 'src/app/Services/toast.service';
import { AccountService } from 'src/app/Services/account.service';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { Images } from 'src/app/Enums/images.enum';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reset-confirmation',
  templateUrl: './reset-confirmation.component.html',
  styleUrls: ['./reset-confirmation.component.scss'],
})
export class ResetConfirmationComponent implements OnDestroy {
  logo = Images.MainLogo;
  subscriptions: Subscription[] = [];

  constructor(
    private accountService: AccountService,
    private toastrService: ToastService
  ) {}

  resendEmail() {
    const resetEmail = {
      email: this.accountService.resetEmail(),
    };
    this.subscriptions.push(
      this.accountService.resetPassword(resetEmail).subscribe({
        next: () => {
          this.toastrService.showSuccess(SuccessMessages.MailSent, '');
        },
        error: () => {
          this.toastrService?.onError(SuccessMessages.MailSentFailed, '');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
