import { CreateMessageInput, WebSocketMessage } from "types";
import { insertMessage } from "./insertMessage";
import { sendSocketMessage } from "../../utils/sockets/sendSocketMessage";
import { getChatUsers } from "../chats/relations/users/getChatUsers";

/**
 * Crea un nuevo mensaje y lo envía a los usuarios del chat.
 * @param messageData Datos para la creación mensaje
 */
export async function handleNewMessage(messageData: CreateMessageInput) {
  const message = (await insertMessage(messageData)).rows[0];

  const socketMessage: WebSocketMessage = {
    action: "newMessage",
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
