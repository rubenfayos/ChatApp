import { useNavigate } from "@solidjs/router";
import { Match, Switch, createSignal } from "solid-js";
import { Chat } from "types";
import DeleteChatModal from "../modals/DeleteChatModal";
import ChatUserConnectionState from "./ChatUserConnectionState";

type Props = {
  chat: Chat;
  socket: WebSocket;
};

function ChatHeader(props: Props) {
  const nav = useNavigate();

  const [showDeleteChat, setShowDeleteChat] = createSignal(false);

  const handleShowDeleteChat = () => {
    setShowDeleteChat(true);
  };

  const handleCloseShowDeleteChat = () => {
    setShowDeleteChat(false);
  };

  const handleNavigateBack = () => {
    nav("/");
  };

  return (
    <>
      <div class="bg-gray-50 flex w-full space-between items-center border-b p-4">
        <div class="flex-1">
          <span
            role="button"
            class="material-icons text-gray-500 hover:text-gray-800"
            style={{ "font-size": "24px" }}
            onClick={handleNavigateBack}
          >
            arrow_back
          </span>
        </div>
        <div class="flex items-center gap-x-4">
          <h1 class="text-2xl font-bold">{props.chat.name}</h1>
          <ChatUserConnectionState socket={props.socket} />
        </div>
        <div class="flex-1 flex justify-end">
          <span
            role="button"
            class="material-icons text-gray-500 hover:text-gray-800"
            style={{ "font-size": "24px" }}
            onClick={handleShowDeleteChat}
          >
            delete
          </span>
        </div>
      </div>
      <Switch>
        <Match when={showDeleteChat()}>
          <DeleteChatModal
            chatId={props.chat.id}
            handleClose={handleCloseShowDeleteChat}
          />
        </Match>
      </Switch>
    </>
  );
}

export default ChatHeader;
