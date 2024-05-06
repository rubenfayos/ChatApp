import { createSignal } from "solid-js";

type Props = {
  socket: WebSocket;
};

function ChatUserConnectionState(props: Props) {
  const [isConnected, setIsConnected] = createSignal(false);

  const handleSocketMessage = (msg: MessageEvent<any>) => {
    console.log("ME");

    const message = JSON.parse(msg.data);

    switch (message.action) {
      case "chat.user.connected":
        console.log("USERCONECTED");
        setIsConnected(true);
        break;
    }
  };

  props.socket.onmessage = handleSocketMessage;

  return (
    isConnected() && (
      <>
        <span>-</span>
        <p>Conectado</p>
      </>
    )
  );
}

export default ChatUserConnectionState;
