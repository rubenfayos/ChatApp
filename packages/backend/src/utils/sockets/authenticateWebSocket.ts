// import { getUserById } from "~/services";
import { decodeJWT } from "../jwt";

/**
 * Authenticate a websocket request
 * @param {string} token access token of the websocket request
 * @returns {string} userId of the authenticated user
 */
export function authenticateWebSocket(token: string): string {
  try {
    const decodedToken = decodeJWT(token);

    const data = decodedToken as {
      iat: number;
      exp: number;
      userId: string;
    };

    return data.userId; // userId from token

    // req.user = decodedToken.user as User;
  } catch (err: any) {
    throw new Error(err.message); // El token es invalido o ha expirado
  }
}
