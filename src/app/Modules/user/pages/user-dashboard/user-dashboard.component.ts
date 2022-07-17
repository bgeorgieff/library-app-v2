import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRentView } from 'src/app/Interfaces/rent/rent-view.interface';
import { IUserView } from 'src/app/Interfaces/users/user-view.interface';
import { AccountService } from 'src/app/Services/account.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { ModalService } from 'src/app/Services/modal.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  userNoImage = '../../../../../assets/images/no-image.png';
  userData!: IUserView;
  activeRents: IRentView[] = [];
  subscriptions: Subscription[] = [];
  isModalVisible = false;

  constructor(
    private accountService: AccountService,
    private loaderService: LoaderService,
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.subscriptions.push(
      this.modalService.isModalVisible$.subscribe({
        next: (isModalVisible) => {
          this.isModalVisible = isModalVisible;
        }
      })
    );
  }

  getUser() {
    this.loaderService.displayLoader(true);
    this.subscriptions.push(
      this.accountService.getUser().subscribe({
        next: (user) => {
          if (user) {
            this.userData = user;
            this.activeRents = this.getActiveRents(user.rents);
            if (this.userData.imageUrl === null) {
              this.userData.imageUrl = this.userNoImage;
            } else {
              this.userData.imageUrl = this.userData.imageUrl;
            }
            this.loaderService.displayLoader(false);
            this.changeDetector.detectChanges();
          }
        },
      })
    );
  }

  private getActiveRents(rents: IRentView[]): IRentView[] {
    return rents.filter(rent => {
      return rent.isApproved && !rent.isReturned;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
