import { Request, Response } from "express";
import { LoginInput, User } from "types";
import { getUserByEmail } from "~/services";
import { compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "~/utils/jwt";

export async function handleLoginController(
  req: Request<unknown, unknown, LoginInput>,
  res: Response,
) {
  const data = req.body;

  const user: User = (await getUserByEmail(data.email)).rows[0];

  if (!user)
    return res
      .status(404)
      .json({ message: "El usuario o la contraseña son incorrectos" });

  // comprueba el hash de la contraseña encriptada de la base de datos con el hash de la contraseña ingresada por el usuario
  const checkPassword = await compare(data.password, user.password!);

  if (!checkPassword) {
    return res
      .status(404)
      .json({ message: "El usuario o la contraseña son incorrectos" });
  }

  // elimina la contraseña del usuario por seguridad
  user.password = null;

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  res.status(200).cookie("refreshToken", refreshToken).json({
    user,
    message: "Has iniciado sesión correctamente",
    token: accessToken,
  });
}
