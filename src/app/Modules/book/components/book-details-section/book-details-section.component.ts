import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBookDetailsView } from 'src/app/Interfaces/book/book-details-view.interface';
import { BookService } from 'src/app/Services/book.service';
import { ToastService } from 'src/app/Services/toast.service';
import { IBookRent } from 'src/app/Interfaces/book/book-rent.interface';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { Routes } from 'src/app/Enums/routes.enum';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICommentView } from 'src/app/Interfaces/comment/comment-view.interface';

@Component({
  selector: 'app-book-details-section',
  templateUrl: './book-details-section.component.html',
  styleUrls: ['./book-details-section.component.scss'],
})
export class BookDetailsSectionComponent implements OnInit, OnDestroy {
  @Input() book!: IBookDetailsView;
  maxRating = 5;
  bookAuthors = '';
  bookGenres = '';
  bookRating = 0;
  subscriptions: Subscription[] = [];
  comments: ICommentView[] = [];

  constructor(
    private bookService: BookService,
    private toastrService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getApprovedComments();
    this.bookAuthors = this.getItems(this.book.authors, 'authorName');
    this.bookGenres = this.getItems(this.book.genres, 'genreName');
    this.bookRating = this.calculateRating(this.book.comments);
  }

  getApprovedComments() {
    this.comments = this.book.comments.filter((comment) => comment.isApproved);
  }

  getItems(array: any[], property: string) {
    if (array.length) {
      return array.map((x) => x[property]).reduce((a, b) => `${a}, ${b}`);
    }
    return '';
  }

  calculateRating(comments: ICommentView[]): number {
    if (comments.length > 0) {
      const approvedComments = comments.filter(
        (book) => book.isApproved === true
      );

      let rating = approvedComments
        .map((book) => book.rating)
        .reduce((firstNumber, secondNumber) => firstNumber + secondNumber);

      rating = Math.round(rating / approvedComments.length);
      return rating;
    }
    return 0;
  }

  rentBook(bookId: string) {
    const payload: IBookRent = {
      id: bookId,
    };
    this.subscriptions.push(
      this.bookService.rentBook(payload).subscribe({
        next: (response) => {
          const msg = response.message ?? SuccessMessages.RentRequestSent;
          this.toastrService.onInfo(msg, '');
          this.router.navigate([Routes.BooksAll]);
        },
        error: (response) => {
          this.toastrService.onError(response.error.message, '');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
