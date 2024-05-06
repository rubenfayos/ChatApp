import { createEffect, createSignal } from "solid-js";
import ChatMessagesList from "~/components/chats/ChatMessagesList";
import { Message, WebSocketMessage } from "types";
import { useGlobalStore } from "~/state/globalStore";

type Props = {
  socket: WebSocket;
  messages: Message[];
};

function ChatMessagesContainer(props: Props) {
  const { user } = useGlobalStore();

  const { id } = user()!;

  const [messages, setMessages] = createSignal<Message[]>([]);

  createEffect(() => {
    setMessages(props.messages);
  });

  const { socket } = props;

  const handleSocketMessage = (msg: any) => {
    const message = JSON.parse(msg.data);
    console.log(message);

    if (!message.action) return;

    switch (message.action) {
      // Nuevo mensaje recibido
      case "newMessage":
        const newMessage = message.data as Message;

        // Primero el último mensage luego los demás
        setMessages((prev) => [newMessage, ...prev]);

        if (newMessage.userId !== id) {
          // Marca el mensaje como leído
          const messageInput: WebSocketMessage = {
            action: "message.readed",
            data: {
              messageId: newMessage.id,
            },
          };

          socket.send(JSON.stringify(messageInput));
        }

        break;
      case "message.updated":
        const changedMessage = message.data as Message;

        const changedMessages = messages().map((message) =>
          message.id === changedMessage.id ? changedMessage : message
        );

        // Primero el último mensage luego los demás
        setMessages(changedMessages);
        break;
      default:
        break;
    }
  };

  socket.onmessage = handleSocketMessage;

  return <ChatMessagesList messages={messages()} />;
}

export default ChatMessagesContainer;
