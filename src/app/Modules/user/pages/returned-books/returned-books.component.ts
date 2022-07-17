import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IRentView } from 'src/app/Interfaces/rent/rent-view.interface';
import { AccountService } from 'src/app/Services/account.service';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-returned-books',
  templateUrl: './returned-books.component.html',
  styleUrls: ['./returned-books.component.scss'],
})
export class ReturnedBooksComponent implements OnInit {
  returnedBooks: IRentView[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private accountService: AccountService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.loader.displayLoader(true);
    this.subscriptions.push(
      this.accountService.getUser().subscribe({
        next: (user) => {
          this.returnedBooks = user.rents.filter((rent) => rent.isReturned);
          this.loader.displayLoader(false);
        },
      })
    );
  }

  onBookClick(bookId: string) {
    this.router.navigate([`/books/${bookId}`]);
  }
}
