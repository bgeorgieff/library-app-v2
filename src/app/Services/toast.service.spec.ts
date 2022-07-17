import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastService } from './toast.service';

describe('NotificationService', () => {
  let service: ToastService;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
      'info',
      'warning',
    ]);
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [{ provide: ToastrService, useValue: toastrService }],
    });
    service = TestBed.inject(ToastService);
  });

  const mockMessage = 'message';
  const mockTitle = 'title';

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('showSuccess should sent message and title', () => {
    service.showSuccess(mockMessage, mockTitle);
    expect(toastrService.success).toHaveBeenCalled();
  });

  it('onError should sent message and title', () => {
    service.onError(mockMessage, mockTitle);
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('onWarning should sent message and title', () => {
    service.onWarning(mockMessage, mockTitle);
    expect(toastrService.warning).toHaveBeenCalled();
  });

  it('onInfo should sent message and title', () => {
    service.onInfo(mockMessage, mockTitle);
    expect(toastrService.info).toHaveBeenCalled();
  });
});
