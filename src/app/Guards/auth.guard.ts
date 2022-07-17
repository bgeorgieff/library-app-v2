import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Routes } from '../Enums/routes.enum';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.accountService.isUserLoggedIn()) {
      this.router.navigate([Routes.AccountLogin]);
    }
    return this.accountService.isUserLoggedIn();
  }
}
