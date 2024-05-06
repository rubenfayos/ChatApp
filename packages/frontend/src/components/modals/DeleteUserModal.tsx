import { useGlobalStore } from "~/state/globalStore";
import Modal from "../Modal";
import { api } from "~/utils/api";

type Props = {
  handleClose: () => void;
  userId: string;
};

const DeleteUserModal = (props: Props) => {
  const { logout } = useGlobalStore();

  // elimina el usuario y cierra la sesión
  const handleDeleteUser = async () => {
    const res = await api.delete(`/users/${props.userId}`);

    if (res.status === 200) {
      props.handleClose();
      logout();
      location.reload();
    }
  };

  return (
    <Modal
      handleClose={props.handleClose}
      title="¿Seguro que quieres eliminar este usuario?"
    >
      <div>
        <p class="text-sm"></p>
        <p class="text-sm">Esta acción es irreversible</p>
        <button class="red-button mt-6" onclick={handleDeleteUser}>
          Eliminar
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
