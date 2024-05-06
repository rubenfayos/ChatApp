import { Router } from "express";
import { deleteUserController, findUserChatsController } from "~/controllers";
import { updateUserController } from "~/controllers/users/updateUser.controller";

const usersRouter = Router();

usersRouter
  .route("/:userId")
  .patch(updateUserController)
  .delete(deleteUserController);

usersRouter.route("/:userId/chats").get(findUserChatsController);

export { usersRouter };
