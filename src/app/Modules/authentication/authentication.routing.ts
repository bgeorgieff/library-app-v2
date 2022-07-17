import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { SuccessRegisterGuard } from 'src/app/Guards/success-register.guard';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ResetConfirmationComponent } from './pages/reset-confirmation/reset-confirmation.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SuccessRegistrationComponent } from './pages/success-registration/success-registration.component';
import { UserRegisterComponent } from './pages/user-registration/user-register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'resetConfirmation',
    component: ResetConfirmationComponent,
  },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'newPassword',
    component: NewPasswordComponent,
  },
  {
    path: 'successRegistration',
    component: SuccessRegistrationComponent,
    canActivate: [SuccessRegisterGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
