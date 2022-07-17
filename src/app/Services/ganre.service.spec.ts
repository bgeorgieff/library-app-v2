import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer } from 'rxjs/internal/observable/defer';

import { GenreService } from './genre.service';

describe('GenreService', () => {
  let service: GenreService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GenreService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getGenresCount should return number', fakeAsync(() => {
    const mock: number = 20;
    spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(mock));

    let result!: number;
    service.getGenresCount().subscribe((response) => {
      result = response;
    });

    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mock);
  }));

  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
