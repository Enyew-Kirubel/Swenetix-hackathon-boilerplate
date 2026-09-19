import { Request, Response } from "express";
import Report from "../domain/report.model";

export const getReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    res.json(report);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
