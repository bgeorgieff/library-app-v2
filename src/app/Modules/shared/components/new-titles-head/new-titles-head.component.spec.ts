import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SwitchCardsViewService } from 'src/app/Services/switch-cards-view.service';

import { NewTitlesHeadComponent } from './new-titles-head.component';

describe('NewTitlesHeadComponent', () => {
  let component: NewTitlesHeadComponent;
  let fixture: ComponentFixture<NewTitlesHeadComponent>;
  let switchCardViewService: SwitchCardsViewService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [NewTitlesHeadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTitlesHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    switchCardViewService = TestBed.inject(SwitchCardsViewService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setView method', () => {
    let switchView = spyOn(switchCardViewService, 'changeBlockView');

    component.setView(true);

    expect(switchView).toHaveBeenCalledWith(true);
  });
});
