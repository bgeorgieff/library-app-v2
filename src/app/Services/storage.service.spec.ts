import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let cookies: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieService],
    });
    service = TestBed.inject(StorageService);
    cookies = TestBed.inject(CookieService);
    cookies.deleteAll();
  });

  const bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15bWFpbEBtYWlsLmNvbSIsIm5hbWVpZCI6WyI1NmQ1ZTNjNS1hY2I2LTQ5MzYtZTJlNS0wOGRhMjlkYzlmMGEiLCJteW1haWxAbWFpbC5jb20iXSwidW5pcXVlX25hbWUiOiI1NmQ1ZTNjNS1hY2I2LTQ5MzYtZTJlNS0wOGRhMjlkYzlmMGEiLCJ0eXAiOiJUcnVlIiwicm9sZSI6IlN1YnNjcmliZXIiLCJuYmYiOjE2NTM5MjE4NTMsImV4cCI6MTY1NDUyNjY1MywiaWF0IjoxNjUzOTIxODUzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYxOTU1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.opuiRRDG9e0zJoz4bkJ1ZhZW823_AFW2PpdK3LtsoJM';

  const emptyString = '';

  describe('should', () => {
    it('be created', () => {
      expect(service).toBeTruthy();
    });

    it('have undefined payload initially', () => {
      expect(service.tokenPayload).toBeUndefined();
    });
  });

  describe('getToken should return', () => {
    it('empty string of token initially', () => {
      expect(service.getToken()).toEqual(emptyString);
    });

    it('string with token', () => {
      spyOn(cookies, 'get').and.returnValue(bearerToken);
      expect(service.getToken()).toEqual(bearerToken);
    });
  });

  describe('setToken should', () => {
    it('set given token', () => {
      service.setToken(bearerToken);
      expect(service.getToken()).toEqual(bearerToken);
    });
    it('set given tokenPayload', () => {
      service.setToken(bearerToken);
      expect(service.tokenPayload).not.toBeUndefined();
    });
  });

  describe('clear should', () => {
    it('clear all cookies', () => {
      service.clear();
      expect(service.getToken()).toEqual(emptyString);
    });
  });
});
