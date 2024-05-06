import WebSocket from "ws";

const socketRegistry = new Map<string, WebSocket>(); // Use a Map to associate user IDs with WebSocket connections

// setInterval(() => {
// }, 50000);

/**
 * Genera un id basado en el id del usuario y del chat
 * @param userId Id del usuario
 * @param chatId Id del chat
 * @param socket La conexion del socket
 */
export function registerWebSocketConnection(
  userId: string,
  chatId: string,
  socket: WebSocket,
) {
  /**
   *
   */
  const connectionId = `${userId}-${chatId}`;

  socketRegistry.set(connectionId, socket);
}

/**
 *
 * @param connectionId connectionId del usuario que se va a desconectar
 */
export function unregisterWebSocketConnection(userId: string, chatId: string) {
  const connectionId = `${userId}-${chatId}`;

  const connectionInfo = socketRegistry.get(connectionId);

  if (connectionInfo) {
    // Additional cleanup logic, such as notifying others about the user leaving

    socketRegistry.delete(connectionId);
  }
}

/**
 *
 * @param connectionId connectionId del usuario que se va a desconectar
 * @returns {WebSocket | undefined}
 */
export function getWebSocketConnection(connectionId: string) {
  return socketRegistry.get(connectionId);
}
