import { db } from "~/utils/db/db";
import { Message, CreateMessageInput } from "types";

export const insertMessage = (data: CreateMessageInput) =>
  db.query<Message>(
    'INSERT INTO messages (content, user_id, chat_id, status) VALUES ($1, $2, $3, \'SENT\') RETURNING id, status, content, created_at as "createdAt", user_id as "userId", chat_id as "chatId"',
    [data.content, data.userId, data.chatId],
  );
