import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTitleComponent } from 'src/app/Modules/shared/components/app-title/app-title.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { NewTitlesHeadComponent } from './components/new-titles-head/new-titles-head.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedRoutingModule } from './shared.routing.module';

@NgModule({
  declarations: [
    AppTitleComponent,
    LoadingSpinnerComponent,
    BookCardComponent,
    NewTitlesHeadComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, SharedRoutingModule],
  exports: [
    AppTitleComponent,
    LoadingSpinnerComponent,
    BookCardComponent,
    NewTitlesHeadComponent,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
