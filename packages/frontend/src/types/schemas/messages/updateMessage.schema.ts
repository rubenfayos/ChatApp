import { z } from "zod";

const updateMessageSchema = z.object({
  content: z.string().optional(),
  status: z.string(),
});

export type UpdateMessageInput = z.infer<typeof updateMessageSchema>;
