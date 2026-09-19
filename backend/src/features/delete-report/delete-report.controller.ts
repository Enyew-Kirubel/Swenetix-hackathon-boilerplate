import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiError } from '../../utils/apiError';
import { deleteReport } from './delete-report.service';

export const deleteReportController = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, 'Not authenticated');
    await deleteReport(req.params.id as string, req.user.id);
    res.status(200).json({ success: true, message: 'Report deleted' });
});