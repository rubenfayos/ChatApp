import { Request, Response } from "express";
import { CreateChatInput } from "types";
import { createUserChat, getUserByEmail } from "~/services";
import { createChat } from "~/services/chats";

type ChatParams = {
  chatId: string;
};

export async function createChatController(
  req: Request<unknown, unknown, CreateChatInput>,
  res: Response,
) {
  const { body } = req;

  // id del usuario que esta authenticado (token)
  const { userId } = req.token;

  // busca si el usuario existe en la base de datos
  const user = (await getUserByEmail(body.email)).rows[0];

  if (!user)
    return res
      .status(404)
      .json({ message: "El usuario con ese correo no existe" });

  const chat = (await createChat(body)).rows[0];

  if (!chat) {
    return res.status(500).json({ message: "No se pudo crear el chat" });
  }

  // Relaciona el usuario con el chat creado
  await createUserChat({ userId: user.id, chatId: chat.id });

  // Relaciona el usuario que ha creado el chat
  await createUserChat({ userId: userId, chatId: chat.id });

  res.status(201).json({ message: "Chat creado correctamente", chat: chat });
}
