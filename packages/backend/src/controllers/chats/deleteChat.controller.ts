import { Request, Response } from "express";
import { deleteChat, getChat } from "~/services/chats";

type ChatParams = {
  chatId: string;
};

export async function deleteChatController(
  req: Request<ChatParams>,
  res: Response,
) {
  const { chatId } = req.params;

  const chat = await getChat(chatId);

  if (!chat) {
    return res.status(404).json({
      message: "No se ha encontrado el chat",
    });
  }

  await deleteChat(chatId);

  res.status(200).json({ message: "Chat eliminado correctamente" });
}
