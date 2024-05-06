import { z } from "zod";

const createMessageSchema = z.object({
  content: z.string().min(1),
  userId: z.string({
    required_error: "userId is required",
  }),
  chatId: z.string({
    required_error: "chatId is required",
  }),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>;
