import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisible$ = new BehaviorSubject<boolean>(false);
  private bookId$ = new BehaviorSubject<string>('');
  isModalVisible$ = this.isVisible$.asObservable();

  displayModal(value: boolean) {
    this.isVisible$.next(value);
  }

  getReveiwBookId(): Observable<string> {
    return this.bookId$.asObservable();
  }

  setReviewBookId(id: string) {
    this.bookId$.next(id);
  }
}
