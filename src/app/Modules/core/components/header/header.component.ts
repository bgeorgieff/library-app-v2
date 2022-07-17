import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Images } from 'src/app/Enums/images.enum';
import { Routes } from 'src/app/Enums/routes.enum';
import { AccountService } from 'src/app/Services/account.service';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { SignalrService } from 'src/app/Services/signalr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo = Images.MainLogo;
  notification = Images.Bell;
  newMessages = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationsService,
    private signalR: SignalrService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.notificationService.messagesQty$.subscribe({
        next: (quantity) => {
          this.newMessages = quantity;
          this.changeDetector.detectChanges();
        },
      })
    );
  }

  isLoggedIn() {
    return this.accountService.isUserLoggedIn();
  }

  getAuthLinks(): boolean {
    const currentLocation = this.router.url;
    return currentLocation === Routes.AccountLogin ?? Routes.AccountRegister;
  }

  openNotificationBar() {
    this.notificationService.notificationToggler(true);
  }

  logOut(): void {
    this.accountService.logout();
    this.signalR.clear();
    this.notificationService.messagesQty$.next(0);
    this.router.navigate([Routes.Home]);
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
