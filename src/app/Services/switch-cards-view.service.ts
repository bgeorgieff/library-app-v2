import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwitchCardsViewService {
  isBlockView = new Subject<boolean>();

  changeBlockView(bool: boolean) {
    this.isBlockView.next(bool);
  }

  getIsBlockViewDefault() {
    return !localStorage.getItem('isBlockView')
      ? true
      : localStorage.getItem('isBlockView') === 'true';
  }
}
