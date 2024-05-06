import { NextFunction, Request, Response } from "express";
import { decodeJWT } from "~/utils/jwt";

/**
 * Comprueba el token de acceso de la petición
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // obtiene el token de los headers de la petición
  const token = req.headers.authorization?.split(" ")[1];
  if (typeof token !== "undefined") {
    try {
      const decodedToken = decodeJWT(token);

      // añade el id del usuario a la petición para poder usarlo
      req.token = decodedToken as {
        iat: number;
        exp: number;
        userId: string;
      };

      // req.user = decodedToken.user as User;

      next();
    } catch (err: any) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};
