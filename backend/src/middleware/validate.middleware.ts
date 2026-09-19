import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import { ApiError } from '../utils/apiError';

export const validate =
    (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const msg = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
            return next(new ApiError(400, msg));
        }
        req.body = result.data;
        next();
    };