import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Routes } from '../Enums/routes.enum';
import { PremissionGuards } from '../GlobalVariables/premisionGuards';

@Injectable({
  providedIn: 'root',
})
export class SuccessRegisterGuard implements CanActivate {
  previousUrl: string | undefined;

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!PremissionGuards.isPremissionToSuccessPage) {
      this.router.navigateByUrl(Routes.AccountLogin);
    }
    return PremissionGuards.isPremissionToSuccessPage;
  }
}
