export class Genre {
  static All = '/Genres/All';
  static Count = '/Genres/Count';
  static Add = '/Genres';
  static Update = this.Add;

  static GetById(id: string) {
    return `/Genres/${id}`;
  }
}
