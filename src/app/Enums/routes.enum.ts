export const Routes = {
  Home: '/',
  Dashboard: '/home',
  AccountLogin: '/account/login',
  AccountRegister: '/account/register',
  AccountResetConfirm: '/account/resetConfirmation',
  AccountSuccessRegister: '/account/successRegistration',
  NotFound: '/error/not-found',
  BooksAll: '/books/all',
  ReturnedBooks: '/user/returned-books',
  SingleBookPage: (booksId: string) => {
    return `/books/${booksId}`;
  },
} as const;
