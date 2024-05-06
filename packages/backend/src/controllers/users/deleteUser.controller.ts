import { Request, Response } from "express";
import { deleteUser, getUser } from "~/services";

type UserParams = {
  userId: string;
};

export async function deleteUserController(
  req: Request<UserParams>,
  res: Response,
) {
  const { userId } = req.params;

  const user = (await getUser(userId)).rows[0];

  if (!user) {
    return res
      .status(404)
      .json({ message: "No se ha encontrado este usuario" });
  }

  await deleteUser(userId);

  res.status(200).json({ message: "Usuario eliminado correctamente" });
}
