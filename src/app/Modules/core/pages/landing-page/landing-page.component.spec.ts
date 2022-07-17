import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { defer } from 'rxjs';
import { IBookView } from 'src/app/Interfaces/book/book-view.interface';
import { AccountService } from 'src/app/Services/account.service';
import { BookService } from 'src/app/Services/book.service';
import { GenreService } from 'src/app/Services/genre.service';

import { LandingPageComponent } from './landing-page.component';

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let bookService: BookService;
  let genreService: GenreService;
  let accountService: AccountService;
  let mockBooks: IBookView[] = [
    {
      id: '1',
      title: 'string',
      isAvaliable: true,
      cover: 'string',
      dateAdded: '01.01.01',
      authors: [],
      genres: [],
      description: 'string',
    },
  ] as IBookView[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LandingPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    accountService = TestBed.inject(AccountService);
    genreService = TestBed.inject(GenreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load quantities and books on ngOnInit', fakeAsync(() => {
    let expectedGenreCount = component.genresCount;
    let expectedReadersCount = component.readersCount;
    let expectedNewlyAddedCount = component.newTitlescount;
    let allBooksCount = component.allBooksCount;
    spyOn(genreService, 'getGenresCount').and.returnValue(fakeAsyncResponse(3));
    spyOn(accountService, 'getReadersCount').and.returnValue(
      fakeAsyncResponse(3)
    );
    spyOn(bookService, 'getBooksCount').and.returnValue(fakeAsyncResponse(3));
    spyOn(bookService, 'getNewlyAddedBooks').and.returnValue(
      fakeAsyncResponse(mockBooks)
    );

    component.ngOnInit();
    tick();
    expectedGenreCount = component.genresCount;
    expectedReadersCount = component.readersCount;
    expectedNewlyAddedCount = component.newTitlescount;
    allBooksCount = component.allBooksCount;
    component.isLoaded();

    expect(expectedGenreCount).toEqual(3);
    expect(expectedReadersCount).toEqual(3);
    expect(expectedNewlyAddedCount).toEqual(1);
    expect(allBooksCount).toBeGreaterThan(0);
  }));
});
