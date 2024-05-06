import { Request, Response } from "express";
import { getChatMessages } from "~/services/chats";
import { getChat } from "~/services/chats/getChat";
import { getUserChat } from "~/services/chats";

type RequestParams = { chatId: string };

export async function findChatController(
  req: Request<RequestParams>,
  res: Response,
) {
  try {
    // obtiene el id del usuario
    const { userId } = req.token;

    const { chatId } = req.params;

    const chat = (await getChat(chatId)).rows[0];

    if (!chat) {
      return res.status(404).json({ message: "No se ha encontrado el chat" });
    }

    const check = await getUserChat(chatId, userId);

    if (!Boolean(check.rowCount)) {
      return res.sendStatus(404).redirect("/chats");
    }

    // Obtiene los mensajes del chat y los asigna al chat
    const chatMessages = await getChatMessages(chatId);

    chat.messages = chatMessages.rows;

    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
    return;
  }
}
