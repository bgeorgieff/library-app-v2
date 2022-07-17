import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBookView } from 'src/app/Interfaces/book/book-view.interface';
import { AccountService } from 'src/app/Services/account.service';
import { BookService } from 'src/app/Services/book.service';
import { GenreService } from 'src/app/Services/genre.service';
import { LoaderService } from 'src/app/Services/loader.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  title = 'Newly titles';
  readersCount = 0;
  newTitlescount = 0;
  genresCount = 0;
  allBooksCount = 0;
  subscriptions: Subscription[] = [];
  books: IBookView[] = [];

  constructor(
    private bookServices: BookService,
    private loader: LoaderService,
    private genreService: GenreService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loader.displayLoader(true);
    this.subscriptions.push(
      this.bookServices.getNewlyAddedBooks().subscribe({
        next: (books) => {
          this.books = books;
          this.newTitlescount = books.length;
        },
      })
    );
    this.subscriptions.push(
      this.genreService.getGenresCount().subscribe({
        next: (genreCount) => {
          this.genresCount = genreCount;
        },
      })
    );
    this.subscriptions.push(
      this.accountService.getReadersCount().subscribe({
        next: (readersCount) => {
          this.readersCount = readersCount;
        },
      })
    );
    this.subscriptions.push(
      this.bookServices.getBooksCount().subscribe({
        next: (booksCount) => {
          this.allBooksCount = booksCount;
        },
      })
    );
  }

  isLoaded() {
    let loadingStatus =
      this.readersCount &&
      this.allBooksCount &&
      this.genresCount &&
      this.books.length > 0;

    if (loadingStatus) {
      this.loader.displayLoader(false);
    }
    return loadingStatus;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
