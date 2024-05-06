import { z } from "zod";

export const createChatSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createChatQuerySchema = z.object({
  userId: z.string(),
});

export type CreateChatInput = z.infer<typeof createChatSchema>;
