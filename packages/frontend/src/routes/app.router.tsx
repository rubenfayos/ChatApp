import { Router, Route } from "@solidjs/router";
import AppLayout from "~/components/layouts/AppLayout";
import DefaultPage from "~/pages/DefaultPage";
import ChatPage from "~/pages/chats/ChatPage";
import SettingsPage from "~/pages/settings/SettingsPage";
import UserPage from "~/pages/user/UserPage";

function AppRouter() {
  return (
    <div class="flex h-screen">
      <Router root={AppLayout}>
        <Route path={"/chats/:chatId"} component={ChatPage} />
        <Route path={"/settings"} component={SettingsPage} />
        <Route path={"/user"} component={UserPage} />
        <Route path={"*"} component={DefaultPage} />
      </Router>
    </div>
  );
}

export default AppRouter;
