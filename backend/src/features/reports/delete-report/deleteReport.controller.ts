import { Request, Response } from "express";
import Report from "../domain/report.model";

export const deleteReport = async (req: Request, res: Response): Promise<void> => {
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
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
