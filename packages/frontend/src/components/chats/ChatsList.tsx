import { A } from "@solidjs/router";
import { For } from "solid-js";
import { Chat } from "types";

type Props = {
  chats: Chat[];
};

function ChatsList(props: Props) {
  return (
    <For each={props.chats}>
      {(chat) => (
        <A
          class="p-4 border-b flex border-gray-300 hover:bg-gray-100 block"
          role="button"
          href={`/chats/${chat.id}`}
          id={chat.id}
        >
          <span>{chat.name}</span>
          {chat.unreadedMessages && (
            <span class="ml-auto bg-blue-500 py-1 px-2 text-xs text-white rounded-full">
              {chat.unreadedMessages}
            </span>
          )}
        </A>
      )}
    </For>
  );
}

export default ChatsList;
