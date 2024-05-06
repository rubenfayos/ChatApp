import { createSignal, onCleanup } from "solid-js";
import { User } from "types";

const globalStore = () => {
  const [user, setUser] = createSignal<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );
  const [token, setToken] = createSignal<string | null>(
    localStorage.getItem("token")
  );

  onCleanup(() => {});

  return {
    user,
    token,
    login: (userData: User, jwtToken: string) => {
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));
    },
    logout: () => {
      console.log("Cerrando sesión...");
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser: (userData: User) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    },
  };
};

// Create an instance of the global store
export const useGlobalStore = globalStore;
