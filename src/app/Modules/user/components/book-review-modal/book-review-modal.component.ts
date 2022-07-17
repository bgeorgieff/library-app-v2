import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorMessages } from 'src/app/Enums/error-messages.enum';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { IBookDetailsView } from 'src/app/Interfaces/book/book-details-view.interface';
import { BookService } from 'src/app/Services/book.service';
import { ModalService } from 'src/app/Services/modal.service';
import { ToastService } from 'src/app/Services/toast.service';
@Component({
  selector: 'app-book-review-modal',
  templateUrl: './book-review-modal.component.html',
  styleUrls: ['./book-review-modal.component.scss'],
  animations: [
    trigger('enterModalTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50%) translateY(-200%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(-50%) translateY(-50%)' })),
      ])
    ]),
  ]
})
export class BookReviewModalComponent implements OnInit, OnDestroy {
  isVisible = false;
  book!: IBookDetailsView;
  subscriptions: Subscription[] = [];
  bookAuthors: string[] = [];
  isBookLoaded = false;
  bookRating = 1;
  textValue: string = '';
  @Input() userId = '';

  constructor(
    private modalService: ModalService,
    private bookService: BookService,
    private toastrService: ToastService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.modalService.isModalVisible$.subscribe({
        next: (isVisible) => {
          this.isVisible = isVisible;
        }
      })
    );

    this.subscriptions.push(
      this.modalService.getReveiwBookId().subscribe({
        next: (bookId) => {
          this.getBook(bookId);
        }
      })
    );
  }

  private getBook(bookId: string) {
    this.subscriptions.push(
      this.bookService.getBookDetails(bookId).subscribe({
        next: (bookData) => {
          this.book = bookData;
          this.bookAuthors = this.book.authors.map(author => author.authorName);
          this.isBookLoaded = true;
        }
      })
    );
  }

  isTextAreaEmpty() {
    return !this.textValue;
  }

  isReviewValid() {
    return !this.isTextAreaEmpty();
  }

  close() {
    this.modalService.displayModal(false);
    this.modalService.setReviewBookId('');
  }

  reviewBook() {
    if(this.isReviewValid()) {
      const newReview = {
        bookId: this.book.id,
        userId: this.userId,
        commentText: this.textValue,
        rating: this.bookRating
      }

      this.subscriptions.push(
        this.bookService.reviewBook(newReview).subscribe({
          next: () => {
            this.close();
            this.toastrService.showSuccess(SuccessMessages.BookReviewSuccess, '');
          },
          error: () => {
            this.toastrService.onError(ErrorMessages.WentWrong, '');
          }
        })
      );
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.modalService.displayModal(false);
    this.modalService.setReviewBookId('');
  }
}
