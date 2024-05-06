import { WebSocketServer } from "ws";
import {
  registerWebSocketConnection,
  unregisterWebSocketConnection,
} from "./socketRegistry";
import { authenticateWebSocket } from "./authenticateWebSocket";
import { handleNewMessage } from "~/services/messages/handleNewMessage";
import { CreateMessageInput, WebSocketMessage } from "types";
import { handleMessageReaded } from "~/services/messages/handleMessageReaded";
import { handleChatUserConnected } from "~/services/chats";

export function setupSocket(server: any) {
  // puerto de escucha del websocket
  const port = process.env.WEBSOCKET_PORT
    ? parseInt(process.env.WEBSOCKET_PORT)
    : 4000;

  const wss = new WebSocketServer({
    port,
    path: "/socket",
    perMessageDeflate: {
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024, // Size (in bytes) below which messages
      // should not be compressed if context takeover is disabled.
    },
  });

  // el servidor recibe una connexion de un cliente
  wss.on("connection", async (ws, req) => {
    console.log("Nueva petición websocket");
    const queryParams = new URLSearchParams(req.url!.split("?")[1]);
    const token = queryParams.get("token");
    const chatId = queryParams.get("chatId");

    // Verifica que el access token sea correcto
    const userId = authenticateWebSocket(token!);

    if (!userId || !chatId) {
      ws.close();
      throw new Error("Invalid token or chatId");
    }

    // Guarda el websocket en un diccionario
    registerWebSocketConnection(userId, chatId, ws);

    console.log("Nueva conexión websocket");

    // El socket recibe un mensaje del cliente
    ws.on("message", async (message) => {
      console.log("websocket message received");

      try {
        const parsedMessage = JSON.parse(message.toString());
        const { action, data } = parsedMessage;

        console.log(parsedMessage);

        switch (action) {
          case "newMessage":
            handleNewMessage(data as CreateMessageInput);
            break;
          case "message.readed":
            await handleMessageReaded(data);
            break;
          case "chat.user.disconnected":
            await handleChatUserConnected({
              chatId: chatId,
              userId: data.userId,
            });
            break;
          case "chat.user.connected":
            await handleChatUserConnected({
              chatId: chatId,
              userId: data.userId,
            });
            break;
        }
      } catch (error) {
        console.error("El mensaje no es válido:", message);
      }
    });

    // Elimina el websocket del diccionario cuando se cierra la conexion del cliente
    ws.on("close", (ws) => {
      unregisterWebSocketConnection(userId, chatId);
      console.log("Conexión websocket cerrada");
    });
  });
}
