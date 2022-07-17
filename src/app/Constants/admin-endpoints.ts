export class Admin {
  static UnapprovedUsers = '/Admin/Users/Unapproved';
  static ApproveUser = '/Admin/ApproveUser';
  static UserById(id: string) {
    return `/Admin/User/${id}`;
  }
  static DeleteUserById(id: string) {
    return `/Admin/DeleteUser/${id}`;
  }
}
