import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './books.routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BookCardSectionComponent } from './components/book-card-section/book-card-section.component';
import { BookDetailsSectionComponent } from './components/book-details-section/book-details-section.component';
import { BookRatingComponent } from './components/book-rating/book-rating.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { NoResultsFoundComponent } from './components/no-results-found/no-results-found.component';

@NgModule({
  declarations: [
    BookPageComponent,
    BooksPageComponent,
    BookDetailsSectionComponent,
    BookRatingComponent,
    BookCardSectionComponent,
    SearchSectionComponent,
    NoResultsFoundComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    BookPageComponent,
    BooksPageComponent,
    BookDetailsSectionComponent,
    BookRatingComponent,
    BookCardSectionComponent,
    SearchSectionComponent,
  ],
})
export class BooksModule {}
