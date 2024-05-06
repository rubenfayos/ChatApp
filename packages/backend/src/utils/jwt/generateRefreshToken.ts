import jwt from "jsonwebtoken";
/**
 * Genera un token de acceso para un usuario
 * @param {string} userId Id del usuario
 * @returns {string} Token de acceso
 */
export const generateRefreshToken = (userId: string): string => {
  // Create a new access token
  const accessToken = jwt.sign(
    { userId: userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "30d" },
  );

  return accessToken;
};
