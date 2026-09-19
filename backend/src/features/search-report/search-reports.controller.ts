import { Request, Response } from 'express';
import { asyncHandler } from '../../middleware/asyncHandler';
import { ApiError } from '../../utils/apiError';
import { searchReportsQuerySchema } from './search-reports.validator';
import { searchReports } from './search-reports.service';

export const searchReportsController = asyncHandler(async (req: Request, res: Response) => {
    const parsed = searchReportsQuerySchema.safeParse(req.query);
    if (!parsed.success) {
        const msg = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
        throw new ApiError(400, msg);
    }
    const result = await searchReports(parsed.data);
    res.status(200).json({ success: true, ...result });
});