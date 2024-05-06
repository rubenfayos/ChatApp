import { api } from "~/utils/api";
import { Chat } from "types";
import { Match, Show, Switch, createResource } from "solid-js";
import ChatsList from "~/components/chats/ChatsList";

type Props = { userId: string };

// Obtiene los chats de la API
const fetchChats = async (userId: string) => {
  try {
    const response = await api.get<Chat[]>(`/users/${userId}/chats`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat data:", error);
    return [];
  }
};

function UserChatsContainer(props: Props) {
  const [chats] = createResource<Chat[], string>(props.userId, fetchChats);

  return (
    <Show when={chats()} fallback={<p>Cargando...</p>}>
      <Switch>
        <Match when={chats()!.length > 0}>
          <ChatsList chats={chats()!} />
        </Match>
        <Match when={chats()!.length === 0}>
          <div class="text-center mt-4">
            <p class="">No se ha encontrado ningún chat</p>
          </div>
        </Match>
      </Switch>
    </Show>
  );
}

export default UserChatsContainer;
