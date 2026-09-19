import { Request, Response } from "express";
import { getReportById } from "./getReport.service";

export const getReport = async (req: Request, res: Response) => {
  try {
    const report = await getReportById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Error fetching report:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch report",
    });
  }
};