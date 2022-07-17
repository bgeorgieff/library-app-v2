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
import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [BookCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    component.book = {
      id: 'c9fedc5d-5501-4021-bb0e-4f0929b3b77b',
      title: 'Harry Potter and the Deathly Hallows- part 1 ',
      isAvaliable: true,
      cover:
        'https://sdn2022staraplanina.blob.core.windows.net/book-covers/c9fedc5d-5501-4021-bb0e-4f0929b3b77b.png',
      dateAdded: '2022-05-31T22:08:11.8114478',
      authors: [
        {
          authorId: '842838f1-ea3c-4aa8-2dec-08da427f2167',
          authorName: 'J.K Rowling',
        },
      ],
      genres: [
        {
          genreId: 'ba49c6b5-cd86-4a94-3d7a-08da27855198',
          genreName: 'Fantasy',
        },
      ],
      description:
        'Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling and the seventh and final novel of the main Harry Potter ...',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get genres of the book', () => {
    component.getGenres();
    fixture.detectChanges();
    expect(component.genres).toEqual('Fantasy ');
  });
  it('should get authors of the book', () => {
    component.getAuthors();
    fixture.detectChanges();
    expect(component.authors).toEqual('J.K Rowling ');
  });
  it('should navigate to single-book page', fakeAsync(() => {
    const component = fixture.componentInstance;
    const spy = spyOn(router, 'navigate');
    component.onBookClick();
    tick();
    expect(spy).toHaveBeenCalledWith(['/books/' + component.book?.id]);
  }));
});
