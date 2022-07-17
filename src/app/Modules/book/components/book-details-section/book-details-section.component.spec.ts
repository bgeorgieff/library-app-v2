import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { defer, throwError } from 'rxjs';
import { IBookDetailsView } from 'src/app/Interfaces/book/book-details-view.interface';
import { IStatusResponse } from 'src/app/Interfaces/status-response.interface';
import { BookService } from 'src/app/Services/book.service';
import { BookDetailsSectionComponent } from './book-details-section.component';

export class StatusResponse {
  rentBook() {
    return fakeAsyncResponse({} as IStatusResponse);
  }
}
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('BookDetailsSectionComponent', () => {
  let component: BookDetailsSectionComponent;
  let fixture: ComponentFixture<BookDetailsSectionComponent>;
  let bookService: BookService;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let mockBook: IBookDetailsView = {
    id: 'string',
    title: 'string',
    isAvailable: true,
    cover: 'string',
    dateAdded: new Date(),
    description: 'string',
    rating: 5,
    quantity: 1,
    authors: [{ authorId: '1', authorName: 'Terry Pratchet' }],
    genres: [
      {
        genreId: '1',
        genreName: 'Fiction',
      },
      {
        genreId: '2',
        genreName: 'Biography',
      },
    ],
    comments: [
      {
        id: 'string',
        commentText: 'string',
        rating: 5,
        user: 'string',
        isApproved: true,
      },
      {
        id: 'string',
        commentText: 'string',
        rating: 3,
        user: 'string',
        isApproved: true,
      },
    ],
  };

  const mockStatusResponse: IStatusResponse = {
    statusCode: 204,
    message: 'Success',
  };

  const mockStatusResponseNoMessage: IStatusResponse = {
    statusCode: 204,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
        BrowserDynamicTestingModule,
      ],
      providers: [
        HttpClient,
        { provide: BookService, useClass: StatusResponse },
        { provide: ToastrService, useValue: toastrService },
      ],
      declarations: [BookDetailsSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsSectionComponent);
    bookService = TestBed.inject(BookService);
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', [
      'error',
      'success',
      'info',
      'warning',
    ]);
    component = fixture.componentInstance;
    component.book = mockBook;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse book details onInit', () => {
    let mockAuthor: string;
    let mockGenre: string;
    let mockRating: number;

    component.ngOnInit();
    mockAuthor = component.bookAuthors;
    mockGenre = component.bookGenres;
    mockRating = component.bookRating;

    expect(mockAuthor).toBe('Terry Pratchet');
    expect(mockGenre).toBe('Fiction, Biography');
    expect(mockRating).toEqual(4);
  });

  it('getItems should return empty string if array = []', () => {
    const result = component.getItems([], 'authorName');

    expect(result).toEqual('');
  });

  it('calculateRating should return 0 when no comments', () => {
    component.ngOnInit();
    let result = component.calculateRating([]);

    expect(result).toEqual(0);
  });

  it('should call rentBook method and return with message', fakeAsync(() => {
    let id = '1';
    let result = spyOn(bookService, 'rentBook').and.returnValue(
      fakeAsyncResponse(mockStatusResponse)
    );
    spyOn(component['router'], 'navigate');

    component.ngOnInit();
    component.rentBook(id);
    tick();

    expect(result).toHaveBeenCalled();
  }));

  it('should call rentBook method and return without message', fakeAsync(() => {
    let id = '1';
    let result = spyOn(bookService, 'rentBook').and.returnValue(
      fakeAsyncResponse(mockStatusResponseNoMessage)
    );
    spyOn(component['router'], 'navigate');

    component.ngOnInit();
    component.rentBook(id);
    tick();

    expect(result).toHaveBeenCalled();
  }));

  it('should call rentBook method and return error on failed HTTP request', fakeAsync(() => {
    let id = '1';
    let failedResponse: IStatusResponse = {
      statusCode: 400,
      message: 'failed',
    };
    let result = spyOn(bookService, 'rentBook').and.returnValue(
      throwError(() => new HttpErrorResponse({ error: failedResponse }))
    );
    spyOn(component['router'], 'navigate');

    component.ngOnInit();
    component.rentBook(id);
    tick();

    expect(result).toHaveBeenCalled();
  }));
});
