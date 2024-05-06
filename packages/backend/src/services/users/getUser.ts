import { db } from "~/utils/db/db";
import { User } from "types";

/**
 * Busca un usuario en la base datos
 * @param id id del usuario
 * @returns Promise<QueryResult<User>>
 */
export const getUser = (id: string) =>
  db.query<User>("SELECT * FROM users WHERE id = $1", [id]);
