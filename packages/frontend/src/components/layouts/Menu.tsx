import { Match, Switch, createSignal } from "solid-js";
import LogoutModal from "../modals/LogoutModal";
import CreateChatModal from "../modals/CreateChatModal";
import { A } from "@solidjs/router";

function Menu() {
  const [isOpen, setIsOpen] = createSignal(false);

  const [showLogoutModal, setShowLogoutModal] = createSignal(false);

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleHideLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const [showCreateChatModal, setShowCreateChatModal] = createSignal(false);

  const handleShowCreateChatModal = () => {
    setShowCreateChatModal(true);
  };

  const handleHideCreateChatModal = () => {
    setShowCreateChatModal(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen());
  };

  return (
    <>
      <div class="bg-blue-500 text-white flex items-center justify-between">
        <div class="p-2 ">
          <button
            class="material-icons hover:text-gray-200 rounded-xl p-2"
            onClick={toggleMenu}
          >
            settings
          </button>

          {isOpen() && (
            <div class="absolute bg-white mt-1 rounded-md shadow-md">
              <ul>
                <li
                  onClick={handleShowLogoutModal}
                  role="button"
                  class="py-3 px-2 hover:bg-gray-100 hover:rounded-md"
                >
                  <span class="text-black rounded">Cerrar sesión</span>
                </li>
                <li
                  role="button"
                  class="py-3 px-2 hover:bg-gray-100 hover:rounded-md"
                >
                  <a class="text-black rounded" href="/user">
                    Usuario
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <A href="/">
            <h3 class="text-xl font-bold">ChatApp</h3>
          </A>
        </div>
        <div class="p-2">
          <button
            class="material-icons hover:text-gray-200 rounded-xl p-2"
            onClick={handleShowCreateChatModal}
          >
            add
          </button>
        </div>
      </div>
      <Switch>
        <Match when={showLogoutModal()}>
          <LogoutModal open handleClose={handleHideLogoutModal} />
        </Match>
        <Match when={showCreateChatModal()}>
          <CreateChatModal open handleClose={handleHideCreateChatModal} />
        </Match>
      </Switch>
    </>
  );
}

export default Menu;
