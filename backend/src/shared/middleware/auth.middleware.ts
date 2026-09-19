import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';

interface JwtPayload {
    id: string;
}

export const auth = (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return next(new ApiError(401, 'Not authenticated: token missing'));
    }

    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = { id: payload.id };
        next();
    } catch {
        next(new ApiError(401, 'Not authenticated: invalid or expired token'));
    }
};