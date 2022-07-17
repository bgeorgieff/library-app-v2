import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveRentsComponent } from './components/active-rents/active-rents.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user.routing.module';
import { NotificationArchivePageComponent } from './pages/notification-archive-page/notification-archive-page.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ReturnedBooksComponent } from './pages/returned-books/returned-books.component';
import { BookReviewModalComponent } from './components/book-review-modal/book-review-modal.component';
import { BooksModule } from '../book/books.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ActiveRentsComponent,
    NotificationArchivePageComponent,
    UserDashboardComponent,
    UserDetailsComponent,
    ReturnedBooksComponent,
    BookReviewModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    SharedModule,
    BooksModule,
    FormsModule,
  ],
  exports: [NotificationArchivePageComponent],
})
export class UserModule {}
