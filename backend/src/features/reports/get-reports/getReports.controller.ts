import { Request, Response } from "Express";
import Report from "../create-report/report.model";

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};