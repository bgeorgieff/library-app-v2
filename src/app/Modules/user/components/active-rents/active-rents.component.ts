import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDetails } from 'src/app/Enums/admin-details.enum';
import { Routes } from 'src/app/Enums/routes.enum';
import { SuccessMessages } from 'src/app/Enums/success-messages.enum';
import { IProlongBook } from 'src/app/Interfaces/book/book-prolong.interface';
import { IRentView } from 'src/app/Interfaces/rent/rent-view.interface';
import { ModalService } from 'src/app/Services/modal.service';
import { SignalrService } from 'src/app/Services/signalr.service';
import { ToastService } from 'src/app/Services/toast.service';
@Component({
  selector: 'app-active-rents',
  templateUrl: './active-rents.component.html',
  styleUrls: ['./active-rents.component.scss'],
})
export class ActiveRentsComponent {
  @Input() activeRents!: IRentView[];

  constructor(
    private router: Router,
    private signalR: SignalrService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

  goToBookDetails(bookId: string) {
    this.router.navigate([Routes.SingleBookPage(bookId)]);
  }

  goToNewBooks() {
    this.router.navigate([Routes.BooksAll]);
  }

  goToReturnedBooks() {
    this.router.navigate([Routes.ReturnedBooks]);
  }

  onProlong(name: string) {
    const message: IProlongBook = {
      recipientEmail: AdminDetails.adminEmail,
      content: SuccessMessages.ProlongAdminMsg(name),
    };
    this.signalR
      .prolongBookRequest(message)
      .then(() => {
        this.toastService.showSuccess('', SuccessMessages.ProlongUserMsg);
      })
      .catch((error) => {
        this.toastService.onError('', error);
      });
  }

  onReview(bookId: string) {
    this.modalService.displayModal(true);
    this.modalService.setReviewBookId(bookId);
  }
}
