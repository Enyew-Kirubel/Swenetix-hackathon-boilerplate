import { Request, Response } from "express";
import { searchReports as searchReportsService } from "./searchReports.service";

export const searchReports = async (req: Request, res: Response) => {
  try {
    const search = req.query.q as string;

    if (!search || search.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const reports = await searchReportsService(search.trim());

    return res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Error searching reports:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search reports",
    });
  }
};