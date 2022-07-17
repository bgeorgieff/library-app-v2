export class Rent {
  static Add = '/Rent/Add';
  static Approve = '/Rent/Approve';
  static AllApproved = '/Rent/All/Approve';
  static AllUnapproved = '/Rent/All/Unapproved';
  static Returned = '/Rent/Returned';
  static AddDays = '/Rent/AddDays';

  static GetById(id: string) {
    return `/Rent/ById/${id}`;
  }
  static DeleteRentById(id: string) {
    return `/Rent/Delete/${id}`;
  }
}
