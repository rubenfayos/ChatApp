import { Request, Response } from "express";
import { hash } from "bcrypt";
import { RegisterInput } from "types";
import { insertUser } from "~/services/users/insertUser";

export async function handleRegisterController(
  req: Request<unknown, unknown, RegisterInput>,
  res: Response,
) {
  const data = req.body;

  console.log(data);

  // crea un hash de la contraseña para guardarla en la base de datos de forma segura
  const hashedPassword = await hash(data.password, 10);

  data.password = hashedPassword;

  // guarda el usuario en la base de datos
  const user = await insertUser(data);

  res.status(201).json({ message: "Usuario creado correctamente" });
}
