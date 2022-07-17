export class Users {
  static Register = '/Users/register';
  static RegisterAdmin = '/Users/adminRegister';
  static Login = '/Users/login';
  static Count = '/Users/Count';
  static UploadPicture = '/Users/Upload/Picture';
  static GetById(id: string) {
    return `/Users/User/${id}`;
  }
}
