import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { defer } from 'rxjs';
import { IBookView } from 'src/app/Interfaces/book/book-view.interface';
import { BookService } from 'src/app/Services/book.service';

import { NewTitlesSectionComponent } from './new-titles-section.component';
export class BooksStubService {
  getNewlyAddedBooks() {
    return fakeAsyncResponse([] as IBookView[]);
  }
}
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
describe('NewTitlesSectionComponent', () => {
  let component: NewTitlesSectionComponent;
  let bookService: BooksStubService;
  let fixture: ComponentFixture<NewTitlesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTitlesSectionComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [{ provide: BookService, useClass: BooksStubService }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NewTitlesSectionComponent);
        component = fixture.componentInstance;
        bookService = TestBed.inject(BookService);
        fixture.detectChanges();
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTitlesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onInit should return array of Books', fakeAsync(() => {
    let mockBooks: IBookView[] = [
      {
        id: '12334',
        title: 'new book',
        isAvaliable: true,
        cover: 'http...',
        dateAdded: '12.12.2021',
        authors: [],
        genres: [],
        description: 'kfkf',
      },
    ] as IBookView[];
    spyOn(bookService, 'getNewlyAddedBooks').and.returnValue(
      fakeAsyncResponse(mockBooks)
    );
    component.ngOnInit();
    tick();
  }));
});
