import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import * as signalR from '@microsoft/signalr';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { defer } from 'rxjs/internal/observable/defer';
import { throwError } from 'rxjs/internal/observable/throwError';
import { IProlongBook } from '../Interfaces/book/book-prolong.interface';
import { IMessageView } from '../Interfaces/message/message-view.interface';
import { IStatusResponse } from '../Interfaces/status-response.interface';
import { IUserView } from '../Interfaces/users/user-view.interface';
import { AccountService } from './account.service';
import { NotificationsService } from './notifications.service';

import { SignalrService } from './signalr.service';

export class MockHub {
  start() {
    return new Promise(() => {});
  }
  stop() {
    return new Promise(() => {});
  }
  invoke(methodName: string, ...args: any[]) {
    return new Promise<any>(() => {
      return {};
    });
  }
}
export class MockHubBuilder {
  withUrl(url: string, options?: any) {
    return this;
  }
  build() {
    return new MockHub();
  }
  configureLogging() {
    return this;
  }
  withHubProtocol() {
    return this;
  }
  withAutomaticReconnect() {
    return this;
  }
}

describe('SignalrService', () => {
  let http: HttpClient;
  let service: SignalrService;
  let account: AccountService;
  let notify: NotificationsService;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
      'info',
      'warning',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: ToastrService, useValue: toastrService }],
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(SignalrService);
    account = TestBed.inject(AccountService);
    notify = TestBed.inject(NotificationsService);
  });

  const bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15bWFpbEBtYWlsLmNvbSIsIm5hbWVpZCI6WyI1NmQ1ZTNjNS1hY2I2LTQ5MzYtZTJlNS0wOGRhMjlkYzlmMGEiLCJteW1haWxAbWFpbC5jb20iXSwidW5pcXVlX25hbWUiOiI1NmQ1ZTNjNS1hY2I2LTQ5MzYtZTJlNS0wOGRhMjlkYzlmMGEiLCJ0eXAiOiJUcnVlIiwicm9sZSI6IlN1YnNjcmliZXIiLCJuYmYiOjE2NTM5MjE4NTMsImV4cCI6MTY1NDUyNjY1MywiaWF0IjoxNjUzOTIxODUzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.opuiRRDG9e0zJoz4bkJ1ZhZW823_AFW2PpdK3LtsoJM';

  const mockUser: IUserView = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
    city: '',
    street: '',
    streetNumber: '',
    isApproved: false,
    rents: [],
    passwordRecoveryTokens: [],
    messagesReceived: [
      {
        id: '3',
        content: 'Nice',
        senderId: '',
        senderEmail: '',
        recipientId: '',
        recipientEmail: '',
        dateRead: new Date(),
        messageSent: new Date(),
        senderDeleted: false,
        recipientDeleted: false,
      },
      {
        id: '4',
        content: 'Nice',
        senderId: '',
        senderEmail: '',
        recipientId: '',
        recipientEmail: '',
        dateRead: null,
        messageSent: new Date(),
        senderDeleted: false,
        recipientDeleted: true,
      },
    ],
    messagesSent: [],
  };

  const unreadMessages: IMessageView[] = [
    {
      id: '1',
      content: 'Nice',
      senderId: '',
      senderEmail: '',
      recipientId: '',
      recipientEmail: '',
      dateRead: null,
      messageSent: new Date(),
      senderDeleted: false,
      recipientDeleted: false,
    },
    {
      id: '0',
      content: 'Nice',
      senderId: '',
      senderEmail: '',
      recipientId: '',
      recipientEmail: '',
      dateRead: null,
      messageSent: new Date(),
      senderDeleted: false,
      recipientDeleted: false,
    },
  ];

  const mockProlong: IProlongBook = {
    recipientEmail: 'test@mail.com',
    content: 'test',
  };

  const errorResponse = new HttpErrorResponse({
    error: {
      statusCode: 400,
      message: 'error',
    } as IStatusResponse,
  });

  const onDeleteError = 'delete error';
  const onMarkedError = 'marked error';

  describe('should', () => {
    it('be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('hubConnection should', () => {
    it('be null initially', () => {
      expect(service.hubConnection).toBeUndefined();
    });
  });

  it('generateUserNotification should return array of unread and not deleted messages', () => {
    const result = service['generateUserNotification'](
      mockUser,
      unreadMessages
    );
    expect(result.length).toEqual(3);
  });

  it('generateUserNotification should return empty array of messages', () => {
    const user = mockUser;
    user.messagesReceived = [];
    const result = service['generateUserNotification'](user, []);
    expect(result.length).toEqual(0);
  });

  it('watchForNewMessages should call methods to watch for messages', () => {
    const receivedMessages = spyOn(service, 'watchForReceivedMessages');
    const newMessages = spyOn(service, 'watchForNewMessages');
    service.watchForMessages();
    expect(receivedMessages).toHaveBeenCalled();
    expect(newMessages).toHaveBeenCalled();
  });

  it('clear should set messages to empty array', () => {
    service.hubConnection = new MockHub() as signalR.HubConnection;
    service.clear();
    expect(service.messages$.value).toEqual([]);
  });

  it('prolongBookRequest should invoke signalR', () => {
    service.hubConnection = new MockHub() as signalR.HubConnection;
    const invoking = spyOn(service.hubConnection, 'invoke');
    service.prolongBookRequest(mockProlong);
    expect(invoking).toHaveBeenCalled();
  });

  it('onMarkedError should call error notification', () => {
    service['onMarkedError'](errorResponse);
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('onDeleteError should call error notification', () => {
    service['onDeleteError'](errorResponse);
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('onDelete should call notification and delete given message with id', () => {
    service.messages$.next(unreadMessages);
    service['onDelete']('0');
    expect(toastrService.success).toHaveBeenCalled();
    expect(service.messages$.value.length).toEqual(1);
  });

  it('onMarked should call notification and delete given message with id', () => {
    service.messages$.next(unreadMessages);
    service['onMarked']('1');
    const result = service.messages$.value.filter((msg) => msg.id == '1')[0];

    expect(toastrService.success).toHaveBeenCalled();
    expect(result.dateRead).not.toBeUndefined();
  });

  it('receiveMessages should get user and concatenate unread and read but not deleted messages', fakeAsync(() => {
    spyOn(account, 'getUser').and.returnValue(fakeAsyncResponse(mockUser));
    service['receiveMessages'](unreadMessages);
    tick();
    expect(service.messages$.value.length).toEqual(notify.messagesQty$.value);
  }));

  it('setMewMessage should add new message', () => {
    service.messages$.next(unreadMessages);
    notify.messagesQty$.next(unreadMessages.length);
    const mockMessage: IMessageView = {
      id: '9',
      senderId: '',
      senderEmail: '',
      recipientId: '',
      recipientEmail: '',
      content: '',
      dateRead: null,
      messageSent: new Date(),
      senderDeleted: false,
      recipientDeleted: false,
    };

    service['setNewMessage'](mockMessage);
    expect(service.messages$.value.length).toEqual(notify.messagesQty$.value);
  });

  it('deleteMessage should send delete request', fakeAsync(() => {
    service.messages$.next(unreadMessages);
    spyOn(http, 'delete').and.returnValue(fakeAsyncResponse({}));
    service.deleteMessage('1');

    tick();
    expect(toastrService.success).toHaveBeenCalled();
  }));

  it('deleteMessage should throw error', fakeAsync(() => {
    service.messages$.next(unreadMessages);

    spyOn(http, 'delete').and.returnValue(
      throwError(() => {
        return new HttpErrorResponse({ error: [] });
      })
    );
    service.deleteMessage('32423');

    tick();
    expect(toastrService.error).toHaveBeenCalled();
  }));

  it('markMessageAsRead should send post request', fakeAsync(() => {
    const next = spyOn(service.messages$, 'next');
    service.messages$.next(unreadMessages);
    spyOn(http, 'post').and.returnValue(fakeAsyncResponse({}));
    service.markMessageAsRead('1');

    tick();
    expect(toastrService.success).toHaveBeenCalled();
  }));

  it('markMessageAsRead should throw error', fakeAsync(() => {
    service.messages$.next(unreadMessages);

    spyOn(http, 'post').and.returnValue(
      throwError(() => {
        return new HttpErrorResponse({ error: [] });
      })
    );
    service.markMessageAsRead('32423');

    tick();
    expect(toastrService.error).toHaveBeenCalled();
  }));

  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
