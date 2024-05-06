import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirm_password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .refine((values) => values.confirm_password === values.password, {
    path: ["confirm_password"],
    message: "Las contraseñas no coinciden",
  });

export const loginSchema = z.object({
  email: z.string().email({
    message: "El correo electrónico no es válido",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 carácteres",
  }),
});
