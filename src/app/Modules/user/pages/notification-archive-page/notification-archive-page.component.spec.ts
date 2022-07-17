import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { IMessageView } from 'src/app/Interfaces/message/message-view.interface';
import { SignalrService } from 'src/app/Services/signalr.service';
import { NotificationArchivePageComponent } from './notification-archive-page.component';

describe('NotificationArchivePageComponent', () => {
  let component: NotificationArchivePageComponent;
  let fixture: ComponentFixture<NotificationArchivePageComponent>;
  let signalrServices;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [HttpClient],
      declarations: [NotificationArchivePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationArchivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    signalrServices = TestBed.inject(SignalrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show messages in html', () => {
    let mockMessages: IMessageView[] = [
      {
        id: '4d3ad84e-3ffd-4449-c111-08da42302ba5',
        senderId: 'c1533de0-12d3-452c-249b-08da2b85da43',
        senderEmail: 'admin@abv.bg',
        recipientId: '12545856585',
        recipientEmail: 'alabala@abv.bg',
        content:
          'We are writing to you to let you know that we approved your rent request for "The color of magic"',
        dateRead: new Date(),
        messageSent: new Date(),
        senderDeleted: false,
        recipientDeleted: true,
      } as IMessageView,
    ];
    component.messages = mockMessages;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.data-row'));
    expect(elements.length).toEqual(1);
  });

  it('should show/hide MessagesView or NoMessagesView', () => {
    let mockMessages: IMessageView[] = [];
    component.messages = mockMessages;
    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('.data-row'));
    expect(elements.length).toEqual(0);
    const noMessagesView = fixture.debugElement.queryAll(
      By.css('no-messages-view')
    );
    const messagesView = fixture.debugElement.query(By.css('.wrapper'));
    expect(noMessagesView).toBeTruthy();
    expect(messagesView).toBeFalsy();
  });
});
