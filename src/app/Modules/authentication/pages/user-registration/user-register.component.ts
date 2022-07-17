import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { PremissionGuards } from 'src/app/GlobalVariables/premisionGuards';
import { ICountry } from 'src/app/Interfaces/country.interface';
import { ToastService } from 'src/app/Services/toast.service';
import { Regexes } from 'src/app/GlobalVariables/regexes';
import { passwordMatchValidator } from 'src/app/Directives/passMatch.directive';
import { CountryService } from 'src/app/Services/country.service';
import { AccountService } from 'src/app/Services/account.service';
import { IUserRegister } from 'src/app/Interfaces/users/user-register.interface';
import { IStatusResponse } from 'src/app/Interfaces/status-response.interface';
import { Routes } from 'src/app/Enums/routes.enum';
import { Images } from 'src/app/Enums/images.enum';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { ErrorMessages } from 'src/app/Enums/error-messages.enum';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  logo = Images.MainLogo;
  subscriptions: Subscription[] = [];
  countries: ICountry[] = [];
  private currentLocation = '';

  constructor(
    public fb: FormBuilder,
    private countryService: CountryService,
    private accountService: AccountService,
    private router: Router,
    private toastrService: ToastService
  ) {}

  registrationForm = this.fb.group(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(256),
        Validators.pattern(Regexes.EMAIL_PATTERN),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(Regexes.PHONE_NUMBER_PATTERN),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(Regexes.PASSWORD_PATTERN),
      ]),
      repeatPassword: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      countryCode: new FormControl('+000', [Validators.required]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
      ]),
      streetNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(65),
      ]),
      buildingNumber: new FormControl('', [Validators.maxLength(65)]),
      apartmentNumber: new FormControl('', [Validators.maxLength(65)]),
      additionalInfo: new FormControl('', [Validators.maxLength(1028)]),
    },
    { validators: passwordMatchValidator }
  );

  ngOnInit(): void {
    this.subscriptions.push(
      this.countryService.GetCountries().subscribe({
        next: (countries) => {
          this.parseCountries(countries);
        },
        error: () => {
          this.redirectTo(Routes.NotFound);
        },
      })
    );

    this.subscriptions.push(
      this.countryService.GetLocation().subscribe({
        next: (location) => {
          this.currentLocation = location;
        },
      })
    );
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  parseCountries(countries: ICountry[]) {
    this.countries = countries;
    let country: ICountry | undefined;

    if (this.currentLocation) {
      country = this.countries.find((x) => x.name == this.currentLocation);
    } else {
      country = countries[0];
    }

    this.countryCode?.setValue(country?.phoneCode);
    this.country?.setValue(country?.name);
  }

  changeCountry(e: any) {
    const name = e.target.value;
    const country = this.countries.findIndex((x) => x.name === name);
    this.countryCode?.setValue(this.countries[country].phoneCode, {
      onlySelf: true,
    });
    this.country?.setValue(name);
  }

  submitRegister(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    this.phoneNumber.setValue(
      `${this.countryCode?.value} ${this.phoneNumber.value}`
    );

    const credentials: IUserRegister = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      phoneNumber: this.phoneNumber.value,
      password: this.password.value,
      country: this.country?.value,
      city: this.city.value,
      street: this.street.value,
      streetNumber: this.streetNumber.value,
      buildingNumber: this.buildingNumber.value,
      apartmentNumber: this.apartmentNumber.value,
      additionalInfo: this.additionalInfo.value,
    };

    this.subscriptions.push(
      this.accountService.register(credentials).subscribe({
        next: () => {
          PremissionGuards.isPremissionToSuccessPage = true;
          this.toastrService.showSuccess(SuccessMessages.RegisterSuccess, '');
          this.router.navigate([Routes.AccountSuccessRegister]);
        },
        error: (error) => {
          if (error.error.statusCode === 400) {
            this.toastrService.onError(ErrorMessages.EmailTaken, '');
            return;
          }

          this.toastrService?.onError(ErrorMessages.RegisterFailed, '');
        },
      })
    );

    this.registrationForm.reset();
  }

  isInvalid(field: string) {
    return (
      this.registrationForm.get(field)?.invalid &&
      (this.registrationForm.get(field)?.touched ||
        this.registrationForm.get(field)?.dirty)
    );
  }

  get firstName(): FormControl {
    return this.registrationForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.registrationForm.get('lastName') as FormControl;
  }

  get email(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }

  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  get repeatPassword(): FormControl {
    return this.registrationForm.get('repeatPassword') as FormControl;
  }

  get country() {
    return this.registrationForm.get('country');
  }

  get countryCode() {
    return this.registrationForm.get('countryCode');
  }

  get city(): FormControl {
    return this.registrationForm.get('city') as FormControl;
  }

  get street(): FormControl {
    return this.registrationForm.get('street') as FormControl;
  }

  get streetNumber(): FormControl {
    return this.registrationForm.get('streetNumber') as FormControl;
  }

  get buildingNumber(): FormControl {
    return this.registrationForm.get('buildingNumber') as FormControl;
  }

  get apartmentNumber(): FormControl {
    return this.registrationForm.get('apartmentNumber') as FormControl;
  }

  get additionalInfo(): FormControl {
    return this.registrationForm.get('additionalInfo') as FormControl;
  }

  ngOnDestroy() {
    PremissionGuards.isPremissionToSuccessPage = false;
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
