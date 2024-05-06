import { createSignal } from "solid-js";
import { CreateMessageInput, WebSocketMessage } from "types";

type Props = {
  chatId: string;
  socket: WebSocket;
  userId: string;
};

function ChatInput(props: Props) {
  const [message, setMessage] = createSignal("");

  const { chatId, socket, userId } = props;

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const messageInput: CreateMessageInput = {
      chatId,
      content: message(),
      userId,
    };

    const webSocketMessage: WebSocketMessage = {
      action: "newMessage",
      data: messageInput,
    };

    socket.send(JSON.stringify(webSocketMessage));

    setMessage("");
  };

  return (
    <div class="bg-gray-50 flex flex-2 border-t p-4">
      <form onSubmit={handleSubmit} class="w-full">
        <div class="flex items-center gap-4 justify-center">
          <div class="w-3/4">
            <input
              type="text"
              value={message()}
              onInput={(e) => setMessage(e.currentTarget.value)}
              class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></input>
          </div>
          <div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              <span class="material-icons text-xl">send</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
