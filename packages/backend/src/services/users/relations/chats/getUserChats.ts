import { db } from "~/utils/db/db";
import { Chat } from "types";
import { QueryResult } from "pg";

/**
 * Busca los chats de un usuario en la base datos
 * @param userId id del usuario
 * @returns {Promise<QueryResult<Chat>>}
 */
export const getUserChats = (userId: string): Promise<QueryResult<Chat>> =>
  db.query<Chat>(
    "SELECT c.* FROM chats c LEFT JOIN users_chats uc on c.id = uc.chat_id WHERE uc.user_id = $1",
    [userId],
  );
