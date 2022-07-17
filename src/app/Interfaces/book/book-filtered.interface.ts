import { IBookView } from './book-view.interface';

export interface IBooksFiltered {
  data: IBookView[];
  pages: number;
}
