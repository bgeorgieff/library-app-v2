export class Comment {
  static Add = '/Comment/Add';
  static UnapprovedComments = '/Comment/All/Unapproved';
  static ApprovedComments = '/Comment/All/Approved';

  static ApproveById(id: string) {
    return `/Comment/Approve/${id}`;
  }
  static DeleteById(id: string) {
    return `/Comment/Delete/${id}`;
  }
}
