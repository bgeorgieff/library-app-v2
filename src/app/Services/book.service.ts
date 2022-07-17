import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBookView } from '../Interfaces/book/book-view.interface';
import { API } from '../Constants/api-info';
import { Books } from '../Constants/books-endpoints';
import { Observable } from 'rxjs';
import { IBookDetailsView } from '../Interfaces/book/book-details-view.interface';
import { IBooksFiltered } from '../Interfaces/book/book-filtered.interface';
import { Rent } from '../Constants/rent-endpoints';
import { IBookRent } from '../Interfaces/book/book-rent.interface';
import { IStatusResponse } from '../Interfaces/status-response.interface';
import { ICommentAdd } from '../Interfaces/comment/comment-add.interface';
import { Comment } from '../Constants/comment-endpoints';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getNewlyAddedBooks() {
    return this.http.get<IBookView[]>(API.Endpoint(Books.NewlyAdded));
  }

  getFilteredBooks(
    pageNumber: number,
    filteredTxt?: string
  ): Observable<IBooksFiltered> {
    return this.http.get<IBooksFiltered>(
      API.Endpoint(Books.GetFiltered(pageNumber, filteredTxt))
    );
  }

  getBooksCount(): Observable<number> {
    return this.http.get<number>(API.Endpoint(Books.Count));
  }

  getBookDetails(bookId: string): Observable<IBookDetailsView> {
    return this.http.get<IBookDetailsView>(API.Endpoint(Books.GetById(bookId)));
  }

  rentBook(book: IBookRent): Observable<IStatusResponse> {
    const url = API.Endpoint(Rent.Add);
    let headers = new HttpHeaders({
      bookId: book.id,
    });
    return this.http.post<IStatusResponse>(url, book.id, { headers: headers });
  }

  reviewBook(review: ICommentAdd) {
    const url = API.Endpoint(Comment.Add);
    return this.http.post<IStatusResponse>(url, review);
  }
}
