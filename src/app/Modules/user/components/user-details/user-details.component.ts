import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorMessages } from 'src/app/Enums/error-messages.enum';
import { Images } from 'src/app/Enums/images.enum';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { Regexes } from 'src/app/GlobalVariables/regexes';
import { IUserView } from 'src/app/Interfaces/users/user-view.interface';
import { AccountService } from 'src/app/Services/account.service';
import { ToastService } from 'src/app/Services/toast.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  @Input() userData!: IUserView;
  formData = new FormData();
  file!: File;
  userNoImage = Images.UserIcon;
  emailIcon = Images.EmailIcon;
  locationIcon = Images.LocationIcon;
  phoneIcon = Images.PhoneIcon;
  subscriptions: Subscription[] = [];

  constructor(
    private accountService: AccountService,
    private toastrService: ToastService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.subscriptions.push(
      this.accountService.currentUser.subscribe({
        next: (user) => {
          if (user) {
            this.userData = user;
            this.userData.imageUrl = this.userData.imageUrl ?? this.userNoImage;
            this.changeDetector.detectChanges();
          }
        },
      })
    );
  }

  receiveFile($event: any): void {
    this.file = $event?.target?.files[0];
    this.formData.append('file', this.file, this.file.name);
    console.log(this.file);
    console.log(this.formData);
    this.changePicture();
  }

  changePicture() {
    if (!Regexes.PNG_PATTERN.test(this.file.type)) {
      this.toastrService.onError(ErrorMessages.OnlyPNG, 'Error');
      return;
    }

    this.subscriptions.push(
      this.accountService.uploadPicture(this.formData).subscribe({
        next: () => {
          const reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = (_event) => {
            this.userData.imageUrl = reader.result as string;
            this.toastrService.showSuccess(SuccessMessages.PictureUploaded, '');
          };
        },
        error: () => {
          this.toastrService.onError(ErrorMessages.WentWrong, 'Error');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
