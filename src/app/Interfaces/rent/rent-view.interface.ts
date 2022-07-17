export interface IRentView {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  userId: string;
  userEmail: string;
  dateRented: Date;
  dateForReturn: Date;
  isApproved: boolean;
  isReturned: boolean;
}
