import { Router } from "express";
import { handleLoginController, handleRegisterController } from "~/controllers";
import { handleRefreshController } from "~/controllers/auth/handleRefresh.controller";

const authRouter = Router();

authRouter.route("/login").post(handleLoginController);

authRouter.route("/register").post(handleRegisterController);

authRouter.route("/refresh").get(handleRefreshController);

export { authRouter };
