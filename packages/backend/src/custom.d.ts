declare namespace Express {
  export interface Request {
    token: { iat: number; exp: number; userId: string };
  }
}
