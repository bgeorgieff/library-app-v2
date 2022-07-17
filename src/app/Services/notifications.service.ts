import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationBar$ = new BehaviorSubject<boolean>(false);
  messagesQty$ = new BehaviorSubject<number>(0);

  notificationToggler(toggleCommand = false) {
    this.notificationBar$.next(toggleCommand);
  }
}
