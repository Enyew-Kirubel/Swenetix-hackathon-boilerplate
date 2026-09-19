import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../utils/apiError';
import { updateReport } from './update-report.service';

export const updateReportController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Not authenticated');
    const report = await updateReport(req.params.id as string, req.user.id, req.body);
    res.status(200).json({ success: true, data: report });
});