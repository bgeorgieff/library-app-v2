import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessageView } from 'src/app/Interfaces/message/message-view.interface';
import { SignalrService } from 'src/app/Services/signalr.service';

@Component({
  selector: 'app-notification-archive-page',
  templateUrl: './notification-archive-page.component.html',
  styleUrls: ['./notification-archive-page.component.scss'],
})
export class NotificationArchivePageComponent implements OnInit, OnDestroy {
  messages: IMessageView[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private signalR: SignalrService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.signalR.messages$.subscribe({
        next: (messages) => {
          this.messages = messages;
          this.changeDetector.detectChanges();
        },
      })
    );
  }

  deleteMessage(id: string) {
    this.signalR.deleteMessage(id);
  }

  markAsRead(id: string) {
    this.signalR.markMessageAsRead(id);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
