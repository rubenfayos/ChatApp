import { useNavigate } from "@solidjs/router";
import Modal from "../Modal";
import { api } from "~/utils/api";

type Props = {
  handleClose: () => void;
  chatId: string;
};

function DeleteChatModal(props: Props) {
  const nav = useNavigate();

  // elimina el chat y vuelve a la lista de chats.
  const handleDeleteChat = async () => {
    const res = await api.delete(`/chats/${props.chatId}`);

    if (res.status === 200) {
      props.handleClose();
      nav("/");
    }
  };

  return (
    <Modal handleClose={props.handleClose} title="Eliminar chat">
      <div>
        <p>¿Seguro que quieres eliminar el chat?</p>
        <div class="flex mt-6">
          <button
            type="button"
            class="red-button ml-auto"
            onclick={handleDeleteChat}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteChatModal;
