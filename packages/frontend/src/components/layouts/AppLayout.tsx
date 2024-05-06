import { JSX, createSignal } from "solid-js";
import Menu from "./Menu";
import UserChatsContainer from "~/containers/user/UserChatsContainer";
import { useGlobalStore } from "~/state/globalStore";

type Props = {
  children?: JSX.Element;
};

function AppLayout(props: Props) {
  const { user } = useGlobalStore();

  // State to track whether the menu is visible or not
  const [isMenuVisible] = createSignal(true);

  // // Function to toggle the menu visibility
  // const toggleMenu = () => {
  //   setIsMenuVisible(!isMenuVisible());
  // };

  return (
    <>
      {isMenuVisible() && (
        <>
          <div
            class="w-full h-full bg-black absolute md:hidden"
            style={{ opacity: "25%" }}
          ></div>
          <div class="flex w-2/3 md:w-1/5 md:relative h-full absolute flex-col border-r z-10">
            <Menu />
            <div class="bg-gray-50 flex-1">
              <UserChatsContainer userId={user()!.id} />
            </div>
          </div>
        </>
      )}
      <div class="w-full">{props.children}</div>
    </>
  );
}

export default AppLayout;
