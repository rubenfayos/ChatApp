import { WebSocketMessage } from "types";
import { getWebSocketConnection } from "./socketRegistry";

interface SocketMessageInput {
  socketId: string;
  message: WebSocketMessage;
}
/**
 * envía un mensaje a un socket.
 * @param SocketMessageInput mensaje y socket
 */
export function sendSocketMessage(data: SocketMessageInput) {
  const socket = getWebSocketConnection(data.socketId);

  if (!socket) {
    console.error("Socket not found");
    return;
  }

  socket.send(JSON.stringify(data.message));
}
