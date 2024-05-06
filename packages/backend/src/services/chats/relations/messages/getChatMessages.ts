import { db } from "~/utils/db/db";

export function getChatMessages(chatId: string) {
  return db.query(
    'SELECT id, status, content, created_at as "createdAt", user_id as "userId", chat_id as "chatId" FROM messages WHERE chat_id=$1 ORDER BY created_at DESC',
    [chatId],
  );
}
