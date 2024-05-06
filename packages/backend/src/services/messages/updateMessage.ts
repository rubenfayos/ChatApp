import { db } from "~/utils/db/db";
import { Message, UpdateMessageInput } from "types";

/**
 * Actualiza un mensaje - utilizado para el status
 * @param messageId Id del mensaje
 * @param data Datos a actualizar
 * @returns
 */
export const updateMessage = (messageId: string, data: UpdateMessageInput) =>
  db.query<Message>(
    'UPDATE messages SET status = $1 WHERE id = $2 RETURNING id, status, content, created_at as "createdAt", user_id as "userId", chat_id as "chatId"',
    [data.status, messageId],
  );
