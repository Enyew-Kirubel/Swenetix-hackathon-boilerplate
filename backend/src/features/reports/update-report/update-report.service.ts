import { Types } from 'mongoose';
import Report from "../domain/report.model";
import { ApiError } from '../../../utils/apiError';
import { UpdateReportInput } from './update-report.validator';

export async function updateReport(reportId: string, userId: string, data: UpdateReportInput) {
    if (!Types.ObjectId.isValid(reportId)) throw new ApiError(400, 'Invalid report id');

    const report = await Report.findById(reportId);
    if (!report) throw new ApiError(404, 'Report not found');

    if (report.reporter.toString() !== userId)
        throw new ApiError(403, "Forbidden: you don't own this report");

    report.set(data);
    await report.save();

    await report.populate('reporter', 'name phone');

    return report;
}