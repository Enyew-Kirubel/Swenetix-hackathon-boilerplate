import { Request, Response } from "express";
import { getAllReports } from "./getReports.service";

export const getReports = async (_req: Request, res: Response) => {
  try {
    const reports = await getAllReports();

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