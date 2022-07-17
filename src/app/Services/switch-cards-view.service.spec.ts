import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SwitchCardsViewService } from './switch-cards-view.service';

describe('SwitchCardsViewService', () => {
  let service: SwitchCardsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchCardsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('changeBlockView should change view boolean', fakeAsync(() => {
    let before = service.isBlockView;

    service.changeBlockView(true);
    let after = service.isBlockView;

    tick();
    expect(after !== before);
  }));

  it('getIsBlockViewDefault should return true when isBlockView item is missing', () => {
    localStorage.clear();
    const result = service.getIsBlockViewDefault();
    expect(result).toBeTruthy();
  });

  it('getIsBlockViewDefault should return false when isBlockView item is there', () => {
    localStorage.setItem('isBlockView', 'false');
    const result = service.getIsBlockViewDefault();
    expect(result).toBeFalsy();
  });

  it('getIsBlockViewDefault should return true when isBlockView item is there', () => {
    localStorage.setItem('isBlockView', 'true');
    const result = service.getIsBlockViewDefault();
    expect(result).toBeTruthy();
  });
});
