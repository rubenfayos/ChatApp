import { sendSocketMessage } from "~/utils/sockets/sendSocketMessage";
import { getChatUsers } from "../chats";
import { getMessage } from "./getMessage";
import { updateMessage } from "./updateMessage";
import { WebSocketMessage } from "types";

export async function handleMessageReaded(data: { messageId: string }) {
  let message = (await getMessage(data.messageId)).rows[0];

  if (!message) {
    throw new Error("No se ha encontrado el mensaje");
  }

  message = (await updateMessage(data.messageId, { status: "READED" })).rows[0];

  if (!message) {
    throw new Error("No se ha encontrado el mensaje");
  }

  const socketMessage: WebSocketMessage = {
    action: "message.updated",
    data: message,
  };

  const chatUsers = (await getChatUsers(message.chatId, message.userId)).rows;

  chatUsers.forEach((chatUser) => {
    sendSocketMessage({
      socketId: `${chatUser.userId}-${message.chatId}`,
      message: socketMessage,
    });
  });
}
