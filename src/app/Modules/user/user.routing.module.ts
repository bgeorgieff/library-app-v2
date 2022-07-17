import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationArchivePageComponent } from './pages/notification-archive-page/notification-archive-page.component';
import { ReturnedBooksComponent } from './pages/returned-books/returned-books.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: 'notification-archive',
    component: NotificationArchivePageComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'returned-books',
    component: ReturnedBooksComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
