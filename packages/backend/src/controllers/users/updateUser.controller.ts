import { Request, Response } from "express";
import { getUser } from "~/services";
import { UpdateUserInput } from "types";
import { updateUser } from "~/services/users/updateUser";
import { compare, hash } from "bcrypt";

type UserParams = {
  userId: string;
};

export async function updateUserController(
  req: Request<UserParams, unknown, UpdateUserInput>,
  res: Response,
) {
  const { userId } = req.params;

  let user = (await getUser(userId)).rows[0];

  if (!user) {
    return res
      .status(404)
      .json({ message: "No se ha encontrado este usuario" });
  }

  console.log(req.body);

  // comprueba que la contraseña es correcta
  const comparePassword = await compare(req.body.password, user.password!);

  console.log(comparePassword);

  if (!comparePassword) {
    return res.status(404).json({ message: "Contraseña incorrecta" });
  }

  const passwordHash = await hash(req.body.new_password, 10);

  user = (await updateUser(userId, { ...req.body, password: passwordHash }))
    .rows[0];

  user.password = null;

  res
    .status(200)
    .json({ message: "Usuario actualizado correctamente", user: user });
}
