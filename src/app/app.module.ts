import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptors } from './Interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PassMatchDirective } from './Directives/passMatch.directive';
import { CoreModule } from './Modules/core/core.module';
import { CountryService } from './Services/country.service';
import { AccountService } from './Services/account.service';
import { BookService } from './Services/book.service';
import { GenreService } from './Services/genre.service';
import { LoaderService } from './Services/loader.service';
import { SwitchCardsViewService } from './Services/switch-cards-view.service';
import { ToastService } from './Services/toast.service';
import { SharedModule } from './Modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsService } from './Services/notifications.service';
import { SignalrService } from './Services/signalr.service';
@NgModule({
  declarations: [AppComponent, PassMatchDirective],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true },
    CountryService,
    AccountService,
    BookService,
    GenreService,
    LoaderService,
    SwitchCardsViewService,
    ToastService,
    NotificationsService,
    AccountService,
    SignalrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
