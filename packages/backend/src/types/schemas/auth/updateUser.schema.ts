import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string(),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
  new_password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres",
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
