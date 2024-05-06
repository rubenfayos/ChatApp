import { db } from "~/utils/db/db";
import { Chat } from "types";
import { QueryResult } from "pg";

type SQLResponse = { userId: string };

/**
 * Busca los chats de un usuario en la base datos
 * @param chatId id del chat
 * @param userId id del usuario a excluir
 * @returns {Promise<QueryResult<SQLResponse>>}
 */
export const getChatUsers = (
  chatId: string,
  userId: string,
): Promise<QueryResult<SQLResponse>> =>
  db.query<SQLResponse>(
    'SELECT user_id as "userId" from users_chats WHERE chat_id = $1',
    [chatId],
  );
