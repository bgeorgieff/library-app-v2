export class Books {
  private static pageSize = 9;

  static Add = '/Books/Add';
  static Count = '/Books/Count';
  static NewlyAdded = '/Books/NewlyAddedBooks';
  static All = '/Books/All';
  static Update = '/Books';

  static GetFiltered(pageNumber: number, searchTxt?: string) {
    return `/Books/GetFiltered?PageNumber=${pageNumber}&PageSize=${
      this.pageSize
    }&SearchText=${searchTxt || ''}`;
  }

  static GetById(id: string) {
    return `/Books/${id}`;
  }
  static DeleteById(id: string) {
    return `/Books/${id}`;
  }

  static ByGenreId(id: string) {
    return `/Books/ByGenderId/${id}`;
  }
  static ByAuthorId(id: string) {
    return `/Books/ByAuthorId/${id}`;
  }
}
