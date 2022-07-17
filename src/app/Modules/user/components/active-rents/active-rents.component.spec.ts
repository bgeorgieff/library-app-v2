import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { IRentView } from 'src/app/Interfaces/rent/rent-view.interface';

import { ActiveRentsComponent } from './active-rents.component';

describe('ActiveRentsComponent', () => {
  let component: ActiveRentsComponent;
  let fixture: ComponentFixture<ActiveRentsComponent>;
  let router: Router;
  let mockActiveRents: IRentView[] = [
    {
      id: '09529b14-978f-41ca-ab3f-08da43c9819a',
      bookId: 'ad018b62-4e63-4018-b2d9-7f923797ef8f',
      bookTitle: 'Hogfather',
      bookCover:
        'https://sdn2022staraplanina.blob.core.windows.net/book-covers/ad018b62-4e63-4018-b2d9-7f923797ef8f.jpg',
      userId: 'b29613ab-7309-4435-249a-08da2b85da43',
      userEmail: 'alabala@abv.bg',
      dateRented: new Date(),
      dateForReturn: new Date(),
      isApproved: true,
      isReturned: false,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [HttpClient],
      declarations: [ActiveRentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRentsComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.activeRents = mockActiveRents;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.activeRents.length).toEqual(1);
    expect(component).toBeTruthy();
  });
  it('should navigate to details', fakeAsync(() => {
    const bookId = 'c9fedc5d-5501-4021-bb0e-4f0929b3b77b';
    const spy = spyOn(router, 'navigate');
    component.goToBookDetails(bookId);
    tick();
    expect(spy).toHaveBeenCalledWith(['/books/' + bookId]);
  }));
  it('should navigate to newBooks', fakeAsync(() => {
    const spy = spyOn(router, 'navigate');
    component.goToNewBooks();
    tick();
    expect(spy).toHaveBeenCalledWith(['/books/all']);
  }));
  it('should navigate to returned books', fakeAsync(() => {
    const spy = spyOn(router, 'navigate');
    component.goToReturnedBooks();
    tick();
    expect(spy).toHaveBeenCalledWith(['/user/returned-books']);
  }));
});
