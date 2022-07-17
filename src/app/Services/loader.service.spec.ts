import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('displayLoader should change loader status', fakeAsync(() => {
    let expected: boolean = true;
    service.displayLoader(expected);

    let result!: boolean;

    service.isLoading$().subscribe((x) => {
      result = x;
    });

    tick();
    expect(result).toEqual(expected);
  }));
});
