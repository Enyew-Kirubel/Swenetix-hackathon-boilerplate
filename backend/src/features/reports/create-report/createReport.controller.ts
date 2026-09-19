import { Request, Response } from "express";
import Report from "../domain/report.model";

export const createReport = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const report = await Report.create({
      ...req.body,
      reporter: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("Error creating report:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create report",
    });
  }
};