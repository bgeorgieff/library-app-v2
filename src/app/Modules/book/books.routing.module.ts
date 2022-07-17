import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';

const routes: Routes = [
  {
    path: 'all',
    component: BooksPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: BookPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
