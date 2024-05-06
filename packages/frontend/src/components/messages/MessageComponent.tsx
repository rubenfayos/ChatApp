import { Message } from "types";
import { useGlobalStore } from "~/state/globalStore";

type Props = {
  message: Message;
};

const MessageDate = (props: { date: Date }) => {
  const { date } = props;

  // modifica los números de 1 cifra para que tengan un 0 delante
  const getNumber = (number: number) => {
    return number > 9 ? number : `0${number}`;
  };

  return (
    <span class="text-xs font-light">{`${date.toDateString()} ${getNumber(
      date.getHours()
    )}:${getNumber(date.getMinutes())}:${getNumber(date.getSeconds())}`}</span>
  );
};

function MessageComponent(props: Props) {
  const { user } = useGlobalStore();

  const { id } = user()!;

  const { message } = props;

  const messageDate = new Date(message.createdAt);

  return (
    <div class={`mb-4 ${message.userId === id ? "self-end" : "self-start"}`}>
      <MessageDate date={messageDate} />
      <div
        class={`p-3 max-w-md rounded-lg ${
          message.userId === id
            ? "bg-blue-500 text-white self-end"
            : "bg-gray-200 text-black self-start"
        }`}
      >
        <p>{message.content}</p>
      </div>
      <div class="flex justify-end">
        <span class="text-xs font-light mt-1">{props.message.status}</span>
      </div>
    </div>
  );
}

export default MessageComponent;
