import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (password?.value !== repeatPassword?.value) {
    repeatPassword?.setErrors({ passValid: true });
  } else {
    repeatPassword?.setErrors(null);
  }

  return null;
};
@Directive({
  selector: '[appPassValid]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PassMatchDirective, multi: true },
  ],
})
export class PassMatchDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordMatchValidator(control);
  }
}
