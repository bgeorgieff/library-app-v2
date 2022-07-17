import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICountry } from '../Interfaces/country.interface';

export interface ICountryResponse {
  name: {
    common: string;
  };
  idd?: IPhoneCode;
}

export interface IPhoneCode {
  root?: string;
  suffixes?: string[];
}

export interface ILocationResponse {
  country: string;
  city: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private endpoint = 'https://restcountries.com/v3.1/';
  private locationEndpoint = 'http://ip-api.com/json';

  constructor(private http: HttpClient) {}

  GetCountries() {
    return this.http
      .get<ICountryResponse[]>(`${this.endpoint}/all`)
      .pipe(map(this.ParseCountries.bind(this)));
  }

  GetLocation() {
    return this.http
      .get<ILocationResponse>(this.locationEndpoint)
      .pipe(map(this.ParseLocation));
  }

  private ParseLocation(location: ILocationResponse): string {
    return location.country;
  }

  private ParseCountries(countries: ICountryResponse[]): ICountry[] {
    let result: ICountry[] = [];

    for (const c of countries) {
      const name = c.name.common;
      const phoneCode = this.ParsePhoneCode(c.idd);
      if (phoneCode) {
        result.push({
          name: name,
          phoneCode: phoneCode,
        });
      }
    }
    result = this.sortCountries(result);
    return result;
  }

  private sortCountries(countries: ICountry[]): ICountry[] {
    return countries.sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  private ParsePhoneCode(code: IPhoneCode | undefined) {
    let result = '';
    let codeRoot = '';
    let codeSuffix = '';

    if (code?.root) {
      codeRoot = code.root;
      if (code?.suffixes) {
        codeSuffix = code.suffixes?.shift() || '';
      }
      result = codeRoot + codeSuffix;
    }

    return result.length > 4 ? codeRoot : result;
  }
}
