import { db } from "~/utils/db/db";
import { Chat } from "types";
import { QueryResult } from "pg";

/**
 * Busca un chat por su id.
 * @param id Id del chat
 * @returns {Promise<QueryResult<Chat>>}
 */
export const getChat = (id: string): Promise<QueryResult<Chat>> =>
  db.query<Chat>("SELECT * FROM chats WHERE id = $1", [id]);
