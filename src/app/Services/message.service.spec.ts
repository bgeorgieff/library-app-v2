import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IMessageView } from '../Interfaces/message/message-view.interface';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let httpClient: HttpClient;

  let mockMessage: IMessageView[] = [
    {
      id: '1',
      senderId: '1',
      senderEmail: '',
      recipientId: 'string',
      recipientEmail: 'string',
      content: 'string',
      dateRead: new Date(),
      messageSent: new Date(),
      senderDeleted: false,
      recipientDeleted: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(MessageService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete user message', fakeAsync(() => {
    spyOn(httpClient, 'delete');

    service.deleteMessage(mockMessage[0].id);
    tick();

    expect(httpClient.delete).toHaveBeenCalled();
  }));
});
