import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IBookDetailsView } from 'src/app/Interfaces/book/book-details-view.interface';
import { BookService } from 'src/app/Services/book.service';
import { LoaderService } from 'src/app/Services/loader.service';
@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit, OnDestroy {
  bookData!: IBookDetailsView;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe({
        next: (params) => this.getBook(params),
      })
    );
  }

  getBook(params: Params) {
    this.loaderService.displayLoader(true);
    const bookId = params['id'];
    this.subscriptions.push(
      this.bookService.getBookDetails(bookId).subscribe((book) => {
        this.bookData = book;
        this.loaderService.displayLoader(false);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
