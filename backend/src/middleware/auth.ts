import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: string;
  username: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

export const assertAuthConfig = (): void => {
  getSecret();
};

export const signToken = (user: AuthUser): string =>
  jwt.sign({ id: user.id, username: user.username }, getSecret(), { expiresIn: "7d" });

export const verifyToken = (token: string): AuthUser => {
  const payload = jwt.verify(token, getSecret()) as jwt.JwtPayload;
  return { id: String(payload.id), username: String(payload.username) };
};

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ success: false, message: "Not authenticated" });
    return;
  }
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
