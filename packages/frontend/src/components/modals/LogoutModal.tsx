import { useGlobalStore } from "~/state/globalStore";
import Modal from "../Modal";

type Props = {
  open: boolean;
  handleClose: () => void;
};

function LogoutModal(props: Props) {
  const { logout } = useGlobalStore();

  function handleLogout() {
    logout();
    location.reload();
  }

  console.log(props.open);

  return (
    <Modal title="Cerrar sesión" handleClose={props.handleClose}>
      <p class="my-4">¿Seguro que quieres cerrar sesión?</p>
      <button
        onClick={handleLogout}
        type="button"
        class="bg-blue-500 text-white p-2 rounded-md mt-2"
      >
        Cerrar sesión
      </button>
    </Modal>
  );
}

export default LogoutModal;
