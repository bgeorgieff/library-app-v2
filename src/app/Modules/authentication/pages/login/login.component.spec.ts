import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

import { IUserLoginPost } from 'src/app/Interfaces/users/user-login-post.interface';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [FormBuilder],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  it('email field validation', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors: ValidationErrors | null;
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(errors['maxLength']).toBeFalsy();

    email.setValue('alabala@abv.bg');
    fixture.detectChanges();
    expect(email.errors).toBeFalsy();
  });
  it('password field validation', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    component.loginForm.controls['password'].setValue('As1234@sarc');
    expect(password.valid).toBeTruthy();
  });
  it('submitting the form', () => {
    spyOn(component, 'login');
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['email'].setValue('jhjh@fgbh.nh');
    component.loginForm.controls['password'].setValue('As1234@sarc');
    expect(component.loginForm.valid).toBeTruthy();
    let email = component.loginForm.controls['email'].value;
    let password = component.loginForm.controls['password'].value;
    const data: IUserLoginPost = { email, password };
    component.onSubmit();
    fixture.detectChanges();
    expect(component.login).toHaveBeenCalledWith(data);
  });
});
