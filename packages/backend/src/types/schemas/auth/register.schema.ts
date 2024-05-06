import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirm_password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
