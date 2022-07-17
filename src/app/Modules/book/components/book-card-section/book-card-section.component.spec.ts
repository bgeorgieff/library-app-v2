import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCardSectionComponent } from './book-card-section.component';

describe('BookCardSectionComponent', () => {
  let component: BookCardSectionComponent;
  let fixture: ComponentFixture<BookCardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
