import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuccessRegisterGuard } from './success-register.guard';

describe('SuccessRegisterGuard', () => {
  let guard: SuccessRegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(SuccessRegisterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
