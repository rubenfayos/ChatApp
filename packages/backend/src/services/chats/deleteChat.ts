import { db } from "~/utils/db/db";

/**
 * Elimina un chat de la base de datos.
 * @param chatId Id del chat a eliminar.
 * @returns
 */
export const deleteChat = (chatId: string) =>
  db.query("DELETE FROM chats WHERE id = $1", [chatId]);
