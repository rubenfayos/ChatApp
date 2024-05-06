import { Router } from "express";
import {
  createChatController,
  deleteChatController,
  findChatController,
  findChatMessagesController,
} from "~/controllers";

const chatsRouter = Router();

chatsRouter.route("/").post(createChatController);

chatsRouter
  .route("/:chatId")
  .get(findChatController)
  .delete(deleteChatController);

chatsRouter.route("/:chatId/messages").get(findChatMessagesController);

export { chatsRouter };
