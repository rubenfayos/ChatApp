import { Chat } from "types";
import Modal from "../Modal";
import CreateChatForm from "../chats/CreateChatForm";
import { useNavigate } from "@solidjs/router";

type Props = {
  open: boolean;
  handleClose: () => void;
};

function CreateChatModal(props: Props) {
  const nav = useNavigate();

  const submitOk = (chat: Chat) => {
    // el formulario es correcto
    // se cierra el modal y se redirige al chat creado
    console.log(`/chats/${chat.id}`);
    props.handleClose();
    nav(`/chats/${chat.id}`);
  };

  return (
    <Modal title="Nuevo chat" handleClose={props.handleClose}>
      <p class="text-gray-800 text-sm">
        Crea un nuevo chat con el correo del usuario
      </p>
      <CreateChatForm submitOk={submitOk} />
    </Modal>
  );
}

export default CreateChatModal;
