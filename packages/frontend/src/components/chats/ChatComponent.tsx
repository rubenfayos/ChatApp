import { Chat, WebSocketMessage } from "types";
import ChatHeader from "./ChatHeader";
import ChatMessagesContainer from "~/containers/chats/ChatMessagesContainer";
import ChatInput from "./ChatInput";
import { openSocket } from "~/utils/websocket/socket";
import { useGlobalStore } from "~/state/globalStore";
import { createEffect, createSignal, onCleanup } from "solid-js";

type Props = {
  chat: Chat;
};

function ChatComponent(props: Props) {
  const [chat, setChat] = createSignal<Chat>(props.chat);

  createEffect(() => {
    setChat(props.chat);
    console.log(chat());
  });

  const { token, user } = useGlobalStore();

  // Crea una conexión de socket
  const socket = openSocket({ token: token()!, chatId: props.chat.id });

  socket.onopen = async () => {
    chat().messages.forEach((message) => {
      if (message.status !== "READED" && message.userId !== user()!.id) {
        const messageInput: WebSocketMessage = {
          action: "message.readed",
          data: {
            messageId: message.id,
          },
        };

        socket.send(JSON.stringify(messageInput));
      }
    });

    const messageInput: WebSocketMessage = {
      action: "chat.user.connected",
      data: {
        userId: user()!.id,
      },
    };

    socket.send(JSON.stringify(messageInput));
  };

  onCleanup(() => {
    // Cierra la conexión cuando se desmonta el componente

    socket.close();
  });

  return (
    <div class="max-h-screen flex flex-col h-full">
      <ChatHeader chat={chat()} socket={socket} />
      <div class="p-4 flex-1 flex flex-col-reverse overflow-y-auto">
        <ChatMessagesContainer socket={socket} messages={chat().messages} />
      </div>
      <ChatInput chatId={props.chat.id} userId={user()!.id} socket={socket} />
    </div>
  );
}

export default ChatComponent;
