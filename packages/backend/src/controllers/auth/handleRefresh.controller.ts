import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "~/utils/jwt";

/**
 * Si la authenticación con access token falla o ha caducado intentará generar un nuevo token utilizando el RefreshToken
 *
 * @param req
 * @param res
 * @returns
 */
export const handleRefreshController = async (
  req: Request<unknown, unknown, unknown, { userId: string }>,
  res: Response,
) => {
  const { userId } = req.query;

  // Take the refresh Token from the cookies
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    // Forbidden
    res.status(403).json({ message: "No se ha podido verificar la solicitud" });
  }

  try {
    const verification = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    );

    const accessToken = generateAccessToken(userId);

    return res.status(200).send(accessToken);
  } catch (e: any) {
    // Forbidden
    res.status(403).json({ message: "No se ha podido verificar la solicitud" });
  }
};
