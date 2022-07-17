export class Author {
  static Create = '/Author';
  static Update = this.Create;
  static All = `${this.Create}/All`;

  static GetById(id: string) {
    return `${this.Create}/${id}`;
  }
  static DeleteById(id: string) {
    return this.GetById(id);
  }
}
