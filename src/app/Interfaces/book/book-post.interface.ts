import { IAuthorView } from '../author/author-view.interface';
import { IGenreView } from '../genre/genre-view.interface';

export interface IBookPost {
  title: string;
  isAvaliable: boolean;
  cover: string;
  dateAdded: string;
  authors: IAuthorView[];
  genres: IGenreView[];
  description: string;
}
