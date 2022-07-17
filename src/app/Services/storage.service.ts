import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ITokenPayload } from '../Interfaces/token-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  tokenPayload!: ITokenPayload;
  private rootPath = '/';
  private tokenName = 'token';

  constructor(private cookies: CookieService) {
    // setting tokenPayload on page refresh
    // it is needed for SignalR
    if (this.getToken()) {
      this.parseToken(this.getToken());
    }
  }

  private parseToken(token: string): void {
    const parsedToken = JSON.parse(atob(token.split('.')[1]));

    let payload: ITokenPayload = {
      email: parsedToken.email,
      unique_name: parsedToken.unique_name,
      role: parsedToken.role,
    };
    this.tokenPayload = payload;
  }

  setToken(token: string): void {
    this.cookies.set(this.tokenName, token, {
      path: this.rootPath,
    });
    this.parseToken(token);
  }

  getToken(): string {
    return this.cookies.get(this.tokenName);
  }

  clear(): void {
    this.cookies.delete(this.tokenName, this.rootPath);
    this.cookies.deleteAll(this.rootPath);
  }
}
