import { MessageStatus } from "./messageStatus.enum";

export interface Message {
  id: string;
  createdAt: Date;
  content: string;
  userId: string;
  chatId: string;
  status: MessageStatus | keyof typeof MessageStatus;
}
