import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ErrorMessages } from '../Enums/error-messages.enum';
import { Role } from '../Enums/role.enum';
import { Routes } from '../Enums/routes.enum';
import { StorageService } from '../Services/storage.service';
import { ToastService } from '../Services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  userRole!: string;
  constructor(
    private storageService: StorageService,
    private toastrService: ToastService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.userRole = this.storageService.tokenPayload.role;
    if (this.userRole !== Role.Admin) {
      this.router.navigate([Routes.AccountLogin]);
      this.toastrService.onError(ErrorMessages.Unauthorized, '');
    }
    return true;
  }
}
