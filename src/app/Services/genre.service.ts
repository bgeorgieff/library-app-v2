import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../Constants/api-info';
import { Genre } from '../Constants/genres-endpoints';
@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getGenresCount(): Observable<number> {
    return this.http.get<number>(API.Endpoint(Genre.Count));
  }
}
