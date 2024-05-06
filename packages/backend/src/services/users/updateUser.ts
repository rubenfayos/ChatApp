import { UpdateUserInput, User } from "types";
import { db } from "~/utils/db/db";

/**
 * Actualiza el usuario en la base de datos.
 * @param {string} userId Id del usuario
 * @param {UpdateUserInput} data Nuevos datos del usuario
 * @returns {Promise<QueryResult<User>>}
 */
export async function updateUser(userId: string, data: UpdateUserInput) {
  return db.query<User>(
    'UPDATE users SET name=$2, password=$3 WHERE id=$1 RETURNING id, name, email, created_at as "createdAt"',
    [userId, data.name, data.password],
  );
}
