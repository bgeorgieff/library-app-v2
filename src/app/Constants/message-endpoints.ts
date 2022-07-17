export class Message {
  static Get = '/Message';
  static DeleteById(id: string) {
    return `${this.Get}/${id}`;
  }
  static ReadMessageById(id: string) {
    return `${this.Get}/ReadMessage/${id}`;
  }
}
