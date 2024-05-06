import { Chat, CreateChatInput } from "types";
import { db } from "~/utils/db/db";

export const createChat = (data: CreateChatInput) => {
  return db.query<Chat>("INSERT INTO chats (name) VALUES ($1) RETURNING *", [
    data.name,
  ]);
};
