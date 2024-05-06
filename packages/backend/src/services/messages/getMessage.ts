import { db } from "~/utils/db/db";
import { Message } from "types";

/**
 * Busca un mensaje por su id
 * @param messageId
 * @returns
 */
export const getMessage = (messageId: string) =>
  db.query<Message>(
    'SELECT id, status, content, created_at as "createdAt", user_id as "userId", chat_id as "chatId" FROM messages WHERE id = $1',
    [messageId],
  );
