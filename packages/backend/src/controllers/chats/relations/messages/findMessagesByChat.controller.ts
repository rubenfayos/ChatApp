import { Request, Response } from "express";
import { Chat } from "types";
import { getChat } from "~/services/chats/getChat";
import { getChatMessages } from "~/services/chats/relations/messages/getChatMessages";

type Params = {
  chatId: string;
};

export async function findChatMessagesController(
  req: Request<Params>,
  res: Response,
) {
  const { chatId } = req.params;

  // comprueba que el chat existe en la base de datos

  const chat = await getChat(chatId);

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // busca los mensajes del chat en la base de datos

  const messages: Chat[] = (await getChatMessages(chatId)).rows as Chat[];

  res.status(200).json(messages);
}
