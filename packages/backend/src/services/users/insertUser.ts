import { db } from "~/utils/db/db";
import { User, RegisterInput } from "types";

/**
 * Inserta un usuario en la base de datos.
 * @param data datos del usuario
 * @returns {Promise<QueryResult<User>>}
 */
export const insertUser = (data: RegisterInput) =>
  db.query<User>(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.email, data.password],
  );
