import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { API } from '../Constants/api-info';
import { Message } from '../Constants/message-endpoints';
import { ErrorMessages } from '../Enums/error-messages.enum';
import { SuccessMessages } from '../Enums/success-messages.enum';
import { IProlongBook } from '../Interfaces/book/book-prolong.interface';
import { IMessageView } from '../Interfaces/message/message-view.interface';
import { IUserView } from '../Interfaces/users/user-view.interface';
import { AccountService } from './account.service';
import { NotificationsService } from './notifications.service';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

export interface ISocket {
  type: number;
  target: string;
  arguments: [];
}

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  messages$ = new BehaviorSubject<IMessageView[]>([]);
  hubConnection!: signalR.HubConnection;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private notificationService: NotificationsService,
    private accountService: AccountService,
    private toastService: ToastService
  ) {}

  private generateUserNotification(
    user: IUserView,
    unreadMenssages: IMessageView[]
  ) {
    let notifications: IMessageView[] = [];

    const readAndNotDeletedMessages = user.messagesReceived
      .filter((msg) => msg.dateRead !== null && msg.recipientDeleted === false)
      .reverse();

    notifications.push(...unreadMenssages, ...readAndNotDeletedMessages);
    return notifications;
  }

  private onDelete(id: string) {
    this.toastService.showSuccess('', SuccessMessages.MessageDeleted);
    const messages = this.messages$.value.filter(
      (message) => message.id !== id
    );
    this.messages$.next(messages);
  }

  private onDeleteError(error: HttpErrorResponse) {
    this.toastService.onError(ErrorMessages.MessageNotDeleted, error.message);
  }

  private onMarked(id: string) {
    this.toastService.showSuccess('', SuccessMessages.MessageRead);

    const messages = this.messages$.value;

    const message = messages.find((msg) => msg.id === id);
    if (message) {
      const indexOfMessage = messages.indexOf(message);
      messages[indexOfMessage].dateRead = new Date(Date.now());
      const msgQty = this.notificationService.messagesQty$.value - 1;
      this.notificationService.messagesQty$.next(msgQty);
      this.messages$.next(messages);
    }
  }

  private onMarkedError(error: HttpErrorResponse) {
    this.toastService.onError(ErrorMessages.MessageNotMarked, error.message);
  }

  startConnection() {
    const url = `/hubs/message?access_token=${this.storageService.getToken()}`;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        headers: { Authorization: `Bearer ${this.storageService.getToken()}` },
      })
      .build();

    this.hubConnection.start().then();
  }

  watchForMessages() {
    this.watchForReceivedMessages();
    this.watchForNewMessages();
  }

  private receiveMessages(messages: IMessageView[]) {
    this.accountService.getUser().subscribe({
      next: (user) => {
        const notifications = this.generateUserNotification(user, messages);
        this.notificationService.messagesQty$.next(messages.length);
        this.messages$.next(notifications);

        // setting user when page is refreshed
        if (this.accountService.currentUser) {
          this.accountService.currentUser.next(user);
        }
      },
    });
  }

  private setNewMessage(message: IMessageView) {
    const msgs = this.messages$.value;
    msgs.unshift(message);
    this.notificationService.messagesQty$.next(
      this.notificationService.messagesQty$.value + 1
    );
    this.messages$.next(msgs);
  }

  watchForReceivedMessages() {
    this.hubConnection.on('ReceiveMessageThread', (messages: IMessageView[]) =>
      this.receiveMessages(messages)
    );
  }

  watchForNewMessages() {
    this.hubConnection.on('NewMessage', (message) =>
      this.setNewMessage(message)
    );
  }

  clear() {
    this.messages$.next([]);
    this.hubConnection.stop();
  }

  deleteMessage(id: string) {
    this.http.delete<boolean>(API.Endpoint(Message.DeleteById(id))).subscribe({
      next: () => this.onDelete(id),
      error: (error) => this.onDeleteError(error),
    });
  }

  markMessageAsRead(id: string) {
    this.http
      .post<boolean>(API.Endpoint(Message.ReadMessageById(id)), id)
      .subscribe({
        next: () => this.onMarked(id),
        error: (error) => this.onMarkedError(error),
      });
  }

  prolongBookRequest(message: IProlongBook) {
    return this.hubConnection.invoke('SendAdminsMessageAsync', message);
  }
}
