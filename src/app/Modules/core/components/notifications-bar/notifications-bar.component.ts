import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { Images } from 'src/app/Enums/images.enum';
import { IMessageView } from 'src/app/Interfaces/message/message-view.interface';
import { NotificationsService } from 'src/app/Services/notifications.service';
import { SignalrService } from 'src/app/Services/signalr.service';

@Component({
  selector: 'app-notifications-bar',
  templateUrl: './notifications-bar.component.html',
  styleUrls: ['./notifications-bar.component.scss'],
})
export class NotificationsBarComponent implements OnInit, OnDestroy {
  notificationBell = Images.Bell;
  closeBtn = Images.Close;
  show!: boolean;
  subscriptions: Subscription[] = [];
  userMessages: IMessageView[] = [];
  msgQuantity!: number;

  constructor(
    private notificationService: NotificationsService,
    private signalR: SignalrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.signalR.messages$.subscribe({
        next: (messages) => {
          this.userMessages = messages;
        },
      })
    );

    this.subscriptions.push(
      this.notificationService.messagesQty$.subscribe({
        next: (quantity) => {
          this.msgQuantity = quantity;
        },
      })
    );

    this.subscriptions.push(
      this.notificationService.notificationBar$.subscribe({
        next: (isVisible) => {
          this.show = isVisible;
        },
      })
    );

    this.subscriptions.push(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.closeNotificationBar();
        }
      })
    );
  }

  closeNotificationBar() {
    this.notificationService.notificationToggler();
  }

  onDelete(messageId: string) {
    this.signalR.deleteMessage(messageId);
  }

  markAsRead(id: string) {
    this.signalR.markMessageAsRead(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
