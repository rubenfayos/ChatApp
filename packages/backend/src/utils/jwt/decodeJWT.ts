import jwt from "jsonwebtoken";

/**
 * Comprueba si el token es válido
 * @param {string} token Token a comprobar
 * @returns
 */
export const decodeJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

  return decoded;
};
