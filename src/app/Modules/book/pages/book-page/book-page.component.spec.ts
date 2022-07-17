import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { defer, of } from 'rxjs';
import { IBookDetailsView } from 'src/app/Interfaces/book/book-details-view.interface';
import { BookService } from 'src/app/Services/book.service';
import { BookPageComponent } from './book-page.component';

export class mockBookService {
  getBookDetails(id: string) {
    return fakeAsyncResponse({} as IBookDetailsView);
  }
}
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
describe('BookDetailsPageComponent', () => {
  let component: BookPageComponent;
  let fixture: ComponentFixture<BookPageComponent>;
  let bookService: mockBookService;
  let route: ActivatedRoute;
  let mockData = {
    id: 'c9fedc5d-5501-4021-bb0e-4f0929b3b77b',
    title: 'Harry Potter and the Deathly Hallows- part 1 ',
    description:
      'Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling and the seventh and final novel of the main Harry Potter ...',
    isAvailable: true,
    rating: 0,
    cover:
      'https://sdn2022staraplanina.blob.core.windows.net/book-covers/c9fedc5d-5501-4021-bb0e-4f0929b3b77b.png',
    quantity: 3545453,
    dateAdded: new Date(),
    genres: [
      {
        genreId: 'ba49c6b5-cd86-4a94-3d7a-08da27855198',
        genreName: 'Fantasy',
      },
    ],
    authors: [
      {
        authorId: '842838f1-ea3c-4aa8-2dec-08da427f2167',
        authorName: 'J.K Rowling',
      },
    ],
    comments: [
      {
        id: '5f5a4891-a3ff-4f1d-4588-08da4de1fc54',
        commentText: 'Great book!',
        rating: 5,
        user: 'jhjh@fgbh.nh',
        isApproved: true,
      },
      {
        id: '4b6196b4-a844-4631-458a-08da4de1fc54',
        commentText: 'Wooooww!',
        rating: 5,
        user: 'dsfdsf@gfbh.bg',
        isApproved: true,
      },
      {
        id: '0c3a8ff6-f1d1-4244-9f35-08da4de97ee4',
        commentText: 'sadsadsasdadsads',
        rating: 5,
        user: 'login@gmail.com',
        isApproved: true,
      },
      {
        id: '2933ecdd-be06-4922-9f42-08da4de97ee4',
        commentText: 'saad',
        rating: 5,
        user: 'login@gmail.com',
        isApproved: false,
      },
    ],
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'c9fedc5d-5501-4021-bb0e-4f0929b3b77b' }),
          },
        },
        {
          provide: BookService,
          useClass: mockBookService,
        },
      ],
      declarations: [BookPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPageComponent);
    component = fixture.componentInstance;
    route = fixture.debugElement.injector.get(ActivatedRoute);
    bookService = TestBed.inject(BookService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getBook should be called on init', () => {
    spyOn(component, 'getBook');
    component.ngOnInit();
    expect(component.getBook).toHaveBeenCalled();
  });
  it('should get book data', fakeAsync(() => {
    spyOn(bookService, 'getBookDetails').and.returnValue(
      fakeAsyncResponse(mockData as IBookDetailsView)
    );
    component.ngOnInit();
    tick();
    expect(component.bookData).toEqual(mockData);
  }));
});
