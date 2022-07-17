import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorMessages } from 'src/app/Enums/error-messages.enum';
import { IBookView } from 'src/app/Interfaces/book/book-view.interface';
import { BookService } from 'src/app/Services/book.service';
import { LoaderService } from 'src/app/Services/loader.service';
import { ToastService } from 'src/app/Services/toast.service';
@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
})
export class BooksPageComponent implements OnInit, OnDestroy {
  books: IBookView[] = [];
  subscriptions: Subscription[] = [];
  isBlockView = true;
  totalPages!: number;
  private currentPage = 1;
  searchTxt = '';
  foundResults = true;

  constructor(
    private bookService: BookService,
    private toastrService: ToastService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.displayLoader(true);
    this.getFilteredBooks();
  }

  onScroll() {
    if (this.currentPage >= this.totalPages) return;
    this.loader.displayLoader(true);
    this.currentPage++;
    this.getFilteredBooks(this.searchTxt);
  }

  private getFilteredBooks(txt?: string) {
    this.subscriptions.push(
      this.bookService.getFilteredBooks(this.currentPage, txt).subscribe({
        next: (books) => {
          this.totalPages = books.pages;
          if (this.totalPages === 0) {
            this.foundResults = false;
            this.loader.displayLoader(false);
            return;
          }
          this.foundResults = true;
          books.data.forEach((nextBook: IBookView) => {
            this.books.push(nextBook);
          });
          this.loader.displayLoader(false);
        },
        error: () => {
          this.toastrService.onError(ErrorMessages.WentWrong, '');
        },
      })
    );
  }

  onSearch(searchTxt: string) {
    this.books = [];
    this.currentPage = 1;
    this.loader.displayLoader(true);
    if (searchTxt) {
      this.searchTxt = searchTxt;
      this.getFilteredBooks(searchTxt);
      return;
    }
    this.searchTxt = '';
    this.getFilteredBooks();
  }

  setTitle() {
    if (this.totalPages >= 0) {
      return this.totalPages + ' pages found';
    }
    return 'Loading pages...';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
