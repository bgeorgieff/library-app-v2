import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private status$ = new BehaviorSubject<boolean>(false);

  displayLoader(value: boolean): void {
    this.status$.next(value);
  }

  isLoading$(): Observable<boolean> {
    return this.status$.asObservable();
  }
}
