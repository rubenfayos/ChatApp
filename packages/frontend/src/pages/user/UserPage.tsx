import { Navigate } from "@solidjs/router";
import UserComponent from "~/components/users/UserComponent";
import { useGlobalStore } from "~/state/globalStore";

function UserPage() {
  const { user, logout } = useGlobalStore();

  // Si no hay usuario cerramos la sesión
  if (!user()) {
    logout();
    return <Navigate href={"/"} />;
  }

  return (
    <div class="flex h-full">
      <div class="m-auto border p-6 rounded">
        <h2 class="text-3xl font-bold mb-6">Información del usuario</h2>
        <UserComponent user={user()!} />
      </div>
    </div>
  );
}

export default UserPage;
