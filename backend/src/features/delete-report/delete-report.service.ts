import { Types } from 'mongoose';
import { Report } from '../../models/report.model';
import { ApiError } from '../../utils/apiError';

export async function deleteReport(reportId: string, userId: string): Promise<void> {
    if (!Types.ObjectId.isValid(reportId)) throw new ApiError(400, 'Invalid report id');

    const report = await Report.findById(reportId);
    if (!report) throw new ApiError(404, 'Report not found');
    if (report.user.toString() !== userId)
        throw new ApiError(403, "Forbidden: you don't own this report");

    await report.deleteOne();
}