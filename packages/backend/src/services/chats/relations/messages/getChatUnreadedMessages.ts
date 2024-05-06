import { db } from "~/utils/db/db";

type Params = {
  chatId: string;
  userId: string;
};

export async function getChatUnreadedMessages({ chatId, userId }: Params) {
  return db.query(
    "SELECT id FROM messages WHERE chat_id=$1 AND user_id !=$2 AND status != 'READED'",
    [chatId, userId],
  );
}
