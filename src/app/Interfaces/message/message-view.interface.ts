export interface IMessageView {
  id: string;
  senderId: string;
  senderEmail: string;
  recipientId: string;
  recipientEmail: string;
  content: string;
  dateRead: Date | null;
  messageSent: Date;
  senderDeleted: boolean;
  recipientDeleted: boolean;
}
