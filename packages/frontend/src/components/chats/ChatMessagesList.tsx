import { For } from "solid-js";
import MessageComponent from "../messages/MessageComponent";
import { Message } from "types";

type Props = {
  messages: Message[];
};

function ChatMessagesList(props: Props) {
  return (
    <For each={props.messages}>
      {(message) => <MessageComponent message={message} />}
    </For>
  );
}
export default ChatMessagesList;
