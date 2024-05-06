import { useParams } from "@solidjs/router";
import ChatContainer from "~/containers/chats/ChatContainer";
import {} from "solid-js";

function ChatPage() {
  const params = useParams<{ chatId: string }>();

  return <ChatContainer chatId={params.chatId} />;
}

export default ChatPage;
