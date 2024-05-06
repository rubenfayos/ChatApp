import { Request, Response } from "express";
import { getUser } from "~/services/users/getUser";
import { Chat } from "types";
import { getUserChats } from "~/services/users/relations/chats/getUserChats";
import { getChatUnreadedMessages } from "~/services/chats";

type Params = {
  userId: string;
};

export async function findUserChatsController(
  req: Request<Params>,
  res: Response,
) {
  const { userId } = req.params;

  try {
    const user = (await getUser(userId)).rows[0];

    if (!user) {
      return res
        .status(400)
        .json({ message: "No se ha encontrado el usuario" });
    }

    const chats: Chat[] = (await getUserChats(userId)).rows;

    // asigna si tiene mensajes sin leer
    for (const chat of chats) {
      const count = (
        await getChatUnreadedMessages({
          chatId: chat.id,
          userId: userId,
        })
      ).rowCount;

      console.log(count);

      chat.unreadedMessages = count ?? undefined;
    }

    return res.status(200).json(chats);
  } catch (err) {
    console.log(err);
  }
}
