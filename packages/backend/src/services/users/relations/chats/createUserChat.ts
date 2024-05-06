import { db } from "~/utils/db/db";

type Params = {
  userId: string;
  chatId: string;
};

export const createUserChat = (data: Params) =>
  db.query("INSERT INTO users_chats (user_id, chat_id) VALUES ($1, $2)", [
    data.userId,
    data.chatId,
  ]);
