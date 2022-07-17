import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTitleComponent } from './app-title.component';

describe('SwitchTitleComponent', () => {
  let component: AppTitleComponent;
  let fixture: ComponentFixture<AppTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
