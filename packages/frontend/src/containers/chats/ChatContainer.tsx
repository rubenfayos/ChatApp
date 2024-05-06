import { Show, createResource } from "solid-js";
import { Chat } from "types";
import { api } from "~/utils/api";
import ChatComponent from "~/components/chats/ChatComponent";

type Props = { chatId: string };

// Fetch chat data when the component mounts
const fetchChatData = async (chatId: string) => {
  try {
    const response = await api.get<Chat>(`/chats/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return null;
  }
};

function ChatContainer(props: Props) {
  const [chat] = createResource<Chat | null, string>(
    () => props.chatId,
    fetchChatData
  );

  return (
    <Show when={chat()} fallback={<p>Loading...</p>}>
      <ChatComponent chat={chat()!} />
    </Show>
  );
}

export default ChatContainer;
