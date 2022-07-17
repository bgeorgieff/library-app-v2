import { IAuthorsResponseView } from '../author/authors-response-view.interface';
import { ICommentView } from '../comment/comment-view.interface';
import { IGenreResponseView } from '../genre/genre-response-view.interface';

export interface IBookDetailsView {
  id: string;
  title: string;
  isAvailable: boolean;
  cover: string;
  dateAdded: Date;
  description: string;
  rating: number;
  quantity: number;
  authors: IAuthorsResponseView[];
  genres: IGenreResponseView[];
  comments: ICommentView[];
}
