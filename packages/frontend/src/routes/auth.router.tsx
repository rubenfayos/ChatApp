import { Router, Route, Navigate } from "@solidjs/router";
import AuthLayout from "~/components/layouts/AuthLayout";
import LoginPage from "~/pages/auth/LoginPage";
import RegisterPage from "~/pages/auth/RegisterPage";

const DefaultRoute = () => <Navigate href={"/login"} />;

function AuthRouter() {
  return (
    <Router root={AuthLayout}>
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/register"} component={RegisterPage} />
      <Route path={"*"} component={DefaultRoute} />
    </Router>
  );
}

export default AuthRouter;
