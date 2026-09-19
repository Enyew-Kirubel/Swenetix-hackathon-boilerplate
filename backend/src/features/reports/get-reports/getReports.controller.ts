import { Request, Response } from "express";
import { getAllReports } from "./getReports.service";

export const getReports = async (req: Request, res: Response) => {
  try {
    const { category, type, location, status, sort } = req.query;

    const reports = await getAllReports({
      category: category as string,
      type: type as string,
      location: location as string,
      status: status as string,
      sort: sort as string,
    });

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