import { Message } from "./message.model";

export interface Chat {
  id: string;
  name?: string;
  createdAt: string;
  messages: Message[];
  unreadedMessages?: number;
}
