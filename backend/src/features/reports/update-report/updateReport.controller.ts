import { Request, Response } from "express";
import Report from "../domain/report.model";

export const updateReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    if (report.reporter.toString() !== (req as any).user?.id) {
      res.status(403).json({ error: "Not authorized" });
      return;
    }
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
