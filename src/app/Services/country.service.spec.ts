import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer } from 'rxjs/internal/observable/defer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  CountryService,
  ICountryResponse,
  ILocationResponse,
} from './country.service';
import { HttpClient } from '@angular/common/http';
import { ICountry } from '../Interfaces/country.interface';

describe('CountryService', () => {
  let service: CountryService;
  let httpClient: HttpClient;
  const enpoint = 'https://restcountries.com/v3.1/';
  const locationEnpoint = 'http://ip-api.com/json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CountryService);
    httpClient = TestBed.inject(HttpClient);
  });

  const mockValidCountries: ICountryResponse[] = [
    {
      name: { common: 'Test1' },
      idd: { root: '+1', suffixes: ['1'] },
    },
    {
      name: { common: 'Test2' },
      idd: { root: '+2', suffixes: ['2'] },
    },
  ];

  const mockInvalidCountries: ICountryResponse[] = [
    { name: { common: 'Test1' } },
    { name: { common: 'Test2' } },
  ];

  const mockRandomCountries: ICountryResponse[] = [
    {
      name: { common: 'Test1' },
    },
    {
      name: { common: 'Test2' },
      idd: { root: '+2' },
    },
    {
      name: { common: 'Test3' },
      idd: { root: '+3', suffixes: ['213'] },
    },
  ];

  const expectedRandomCountries: ICountry[] = [
    { name: 'Test2', phoneCode: '+2' },
    { name: 'Test3', phoneCode: '+3' },
  ];

  const expectedValidCountries: ICountry[] = [
    { name: 'Test1', phoneCode: '+11' },
    { name: 'Test2', phoneCode: '+22' },
  ];

  describe('Should', () => {
    it('be created', () => {
      expect(service).toBeTruthy();
    });

    it('have valid api endpoint', () => {
      expect(service['endpoint']).toEqual(enpoint);
    });

    it('have valid location endpoint', () => {
      expect(service['locationEndpoint']).toEqual(locationEnpoint);
    });
  });

  describe('GetCountries should return:', () => {
    it('valid countries with random mock data.', fakeAsync(() => {
      spyOn(httpClient, 'get').and.returnValue(
        fakeAsyncResponse(mockRandomCountries)
      );

      let result: ICountry[] = [];
      service.GetCountries().subscribe((response) => {
        result = response;
      });

      expect(httpClient.get).toHaveBeenCalled();
      tick();
      expect(result).toEqual(expectedRandomCountries);
    }));
    it('valid countries with valid mock data.', fakeAsync(() => {
      spyOn(httpClient, 'get').and.returnValue(
        fakeAsyncResponse(mockValidCountries)
      );

      let result: ICountry[] = [];
      service.GetCountries().subscribe((response) => {
        result = response;
      });

      expect(httpClient.get).toHaveBeenCalled();
      tick();
      expect(result).toEqual(expectedValidCountries);
    }));
    it('empty array of countries with invalid mock data.', fakeAsync(() => {
      spyOn(httpClient, 'get').and.returnValue(
        fakeAsyncResponse(mockInvalidCountries)
      );

      let result: ICountry[] = [];
      service.GetCountries().subscribe((response) => {
        result = response;
      });

      expect(httpClient.get).toHaveBeenCalled();
      tick();
      expect(result).toEqual([]);
    }));
  });

  describe('GetLocation should return:', () => {
    it('current location', fakeAsync(() => {
      const mockCountry: ILocationResponse = {
        country: 'Bulgaria',
        status: 'test',
        city: 'test',
      };

      spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(mockCountry));

      let result: any = '';
      service.GetLocation().subscribe((reponse) => {
        result = reponse;
      });

      expect(httpClient.get).toHaveBeenCalled();
      tick();
      expect(result).toEqual(mockCountry.country);
    }));
  });
});

function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
