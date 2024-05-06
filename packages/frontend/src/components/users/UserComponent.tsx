import { Match, Switch, createSignal } from "solid-js";
import { UpdateUserInput, User } from "types";
import DeleteUserModal from "../modals/DeleteUserModal";
import { api } from "~/utils/api";
import { useGlobalStore } from "~/state/globalStore";

type Props = {
  user: User;
};

function UserComponent({ user }: Props) {
  const { setUser } = useGlobalStore();

  const [formActive, serFormActive] = createSignal(false);

  const [showDeleteModal, setShowDeleteModal] = createSignal(false);

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleActiveForm = () => {
    serFormActive(true);
  };

  const handleInactiveForm = () => {
    setFormData({
      name: user.name,
      password: "",
      new_password: "",
    });
    serFormActive(false);
  };

  const [formData, setFormData] = createSignal<UpdateUserInput>({
    name: user.name,
    password: "",
    new_password: "",
  });

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    console.log(formData());

    // Actualiza el usuario en la API
    const res = await api.patch<{ message: string; user: User }>(
      `/users/${user.id}`,
      formData()
    );

    if (res.status === 200) {
      console.log(res.data);
      handleInactiveForm();
      setUser(res.data.user);
      return;
    }
  };

  // Cambia el estado del input
  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setFormData({ ...formData(), [target.id]: target.value });
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label for="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData().name}
            class={formActive() ? "" : "pointer-events-none"}
            onChange={handleChange}
          />
        </div>
        <Switch>
          <Match when={formActive()}>
            <>
              <div>
                <label for="password">Contraseña anterior</label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  value={formData().password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label for="new_password">Nueva contraseña</label>
                <input
                  required
                  type="password"
                  name="new_password"
                  id="new_password"
                  value={formData().new_password}
                  onChange={handleChange}
                />
              </div>
            </>
          </Match>
          <Match when={!formActive()}>
            <div>
              <label for="name">Correo electrónico</label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                class={formActive() ? "" : "pointer-events-none"}
              />
            </div>
            <div>
              <label for="createdAt">Fecha de creación</label>
              <input
                type="createdAt"
                name="createdAt"
                id="createdAt"
                value={new Date(user.createdAt).toLocaleDateString()}
                class={formActive() ? "" : "pointer-events-none"}
              />
            </div>
          </Match>
        </Switch>
        <div class="flex ml-auto gap-2">
          <Switch>
            <Match when={formActive()}>
              <>
                <button
                  type="button"
                  class="red-button"
                  onclick={handleInactiveForm}
                >
                  Cancelar
                </button>
                <button type="submit" class="primary-button">
                  Guardar
                </button>
              </>
            </Match>
            <Match when={!formActive()}>
              <button
                type="button"
                class="red-button"
                onclick={handleShowDeleteModal}
              >
                Eliminar
              </button>
              <button
                type="button"
                onClick={handleActiveForm}
                class="primary-button"
              >
                Actualizar
              </button>
            </Match>
          </Switch>
        </div>
      </form>
      <Switch>
        <Match when={showDeleteModal()}>
          <DeleteUserModal
            userId={user.id}
            handleClose={handleHideDeleteModal}
          />
        </Match>
      </Switch>
    </>
  );
}

export default UserComponent;
