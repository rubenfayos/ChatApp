import { db } from "~/utils/db/db";

export async function deleteUser(userId: string) {
  return db.query("DELETE FROM users WHERE id = $1", [userId]);
}
