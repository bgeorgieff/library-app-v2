export class Regexes {
  static EMAIL_PATTERN =
    /^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
  static PASSWORD_PATTERN =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
  static PHONE_NUMBER_PATTERN = /^\d{3,15}\b/;
  static PNG_PATTERN = /.+.(png|PNG)$/;
}
