import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBookView } from 'src/app/Interfaces/book/book-view.interface';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() book!: IBookView;
  @Input() index!: number;
  @Input() isBlockView!: boolean;
  genres = '';
  authors = '';

  constructor(private accountService: AccountService, private router: Router) {}
  ngOnInit(): void {
    this.getGenres();
    this.getAuthors();
  }

  isUserLogged() {
    return this.accountService.isUserLoggedIn();
  }

  onBookClick() {
    this.router.navigate([`/books/${this.book.id}`]);
  }

  getGenres() {
    let genreNames = '';
    this.book?.genres.map((genre) => {
      genreNames += `${genre.genreName} `;
    });
    this.genres = genreNames;
  }

  getAuthors() {
    let authors = '';
    this.book?.authors.map((author) => {
      authors += `${author.authorName} `;
    });
    this.authors = authors;
  }
}
