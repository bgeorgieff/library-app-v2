import { IAuthorsResponseView } from '../author/authors-response-view.interface';
import { IGenreResponseView } from '../genre/genre-response-view.interface';

export interface IBookView {
  id: string;
  title: string;
  isAvaliable: boolean;
  cover: string;
  dateAdded: string;
  authors: IAuthorsResponseView[];
  genres: IGenreResponseView[];
  description: string;
}
