import { WebSocketMessage } from "types";
import { getChatUsers } from "./getChatUsers";
import { sendSocketMessage } from "~/utils/sockets/sendSocketMessage";

type Params = {
  chatId: string;
  userId: string;
};

export async function handleChatUserConnected({ userId, chatId }: Params) {
  const socketMessage: WebSocketMessage = {
    action: "chat.user.connected",
    data: {
      userId,
    },
  };

  const chatUsers = (await getChatUsers(chatId, userId)).rows;

  chatUsers.forEach((chatUser) => {
    sendSocketMessage({
      socketId: `${chatUser.userId}-${chatId}`,
      message: socketMessage,
    });
  });
}
