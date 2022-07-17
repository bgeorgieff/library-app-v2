import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer } from 'rxjs/internal/observable/defer';
import { IBookDetailsView } from '../Interfaces/book/book-details-view.interface';
import { IBooksFiltered } from '../Interfaces/book/book-filtered.interface';
import { IBookRent } from '../Interfaces/book/book-rent.interface';
import { IBookView } from '../Interfaces/book/book-view.interface';
import { IStatusResponse } from '../Interfaces/status-response.interface';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpClient = TestBed.inject(HttpClient);
  });

  const mockBooks: IBookView[] = [
    {
      id: '0',
      title: 'The C Programming Language',
      isAvaliable: false,
      cover: 'cover',
      dateAdded: 'date',
      authors: [],
      genres: [],
      description: 'Old book from 1971.',
    },
    {
      id: '1',
      title: 'The Python Programming Language',
      isAvaliable: false,
      cover: 'cover',
      dateAdded: 'date',
      authors: [],
      genres: [],
      description: 'Book for python programming.',
    },
  ];

  const mockBook: IBookDetailsView = {
    id: '0',
    title: 'title',
    isAvailable: false,
    cover: 'cover',
    dateAdded: new Date(),
    description: 'description',
    rating: 0,
    quantity: 0,
    authors: [],
    genres: [],
    comments: [],
  };

  const mockFilteredBooks: IBooksFiltered = {
    data: mockBooks,
    pages: 1,
  };

  const successResponse: IStatusResponse = {
    statusCode: 200,
    message: 'Success',
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getNewlyAddedBooks should return array of IBookView', fakeAsync(() => {
    spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(mockBooks));

    let result: IBookView[] = [];
    service.getNewlyAddedBooks().subscribe((response) => {
      result = response;
    });

    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockBooks);
  }));

  it('getBooksCount should return numbers', fakeAsync(() => {
    const books: number = 5;
    spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(books));

    let result!: number;
    service.getBooksCount().subscribe((response) => {
      result = response;
    });

    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(books);
  }));

  it('getBookDetails should return book with given id', fakeAsync(() => {
    const id: string = '1';
    spyOn(httpClient, 'get').and.returnValue(fakeAsyncResponse(mockBook));

    let result!: IBookDetailsView;
    service.getBookDetails(id).subscribe((response) => {
      result = response;
    });

    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockBook);
  }));

  it('getFilteredBooks should return all books with empty search text', fakeAsync(() => {
    spyOn(httpClient, 'get').and.returnValue(
      fakeAsyncResponse(mockFilteredBooks)
    );

    const pageNumber: number = 1;

    let result!: IBooksFiltered;
    service.getFilteredBooks(pageNumber).subscribe((response) => {
      result = response;
    });

    expect(httpClient.get).toHaveBeenCalled();
    tick();
    expect(result).toEqual(mockFilteredBooks);
  }));

  it('rentBook should return valid status response', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(
      fakeAsyncResponse(successResponse)
    );

    const bookId: IBookRent = { id: '1' };

    let result!: IStatusResponse;
    service.rentBook(bookId).subscribe((response) => {
      result = response;
    });

    expect(httpClient.post).toHaveBeenCalled();
    tick();
    expect(result).toEqual(successResponse);
  }));

  function fakeAsyncResponse<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});
