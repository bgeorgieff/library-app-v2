export const SuccessMessages = {
  LoginSuccess: 'Login successful',
  RegisterSuccess: 'Registration successful',
  PasswordResetSuccesful: 'Password has been reset succesfully.',
  MailSent: 'Sent email successful',
  MailSentFailed: 'Send email failed',
  RentRequestSent: 'Your rent request was sent please wait approval!',
  PictureUploaded: 'Successfully uploaded',
  MessageDeleted: 'Message deleted!',
  MessageRead: 'Marked as Read',
  BookReviewSuccess: 'Your review was send successfully.',
  ProlongAdminMsg: (bookName: string) => {
    return `I would like to extend my rent for ${bookName} book`;
  },
  ProlongUserMsg: 'Your request is sent to an administrator',
} as const;
