import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserRegisterComponent } from './pages/user-registration/user-register.component';
import { ResetConfirmationComponent } from './pages/reset-confirmation/reset-confirmation.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { SuccessRegistrationComponent } from './pages/success-registration/success-registration.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthenticationRoutingModule } from './authentication.routing';

@NgModule({
  declarations: [
    LoginComponent,
    ResetConfirmationComponent,
    ResetPasswordComponent,
    UserRegisterComponent,
    NewPasswordComponent,
    SuccessRegistrationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
  ],
  exports: [
    LoginComponent,
    ResetConfirmationComponent,
    ResetConfirmationComponent,
    UserRegisterComponent,
    NewPasswordComponent,
    SuccessRegistrationComponent,
  ],
})
export class AuthenticationModule {}
