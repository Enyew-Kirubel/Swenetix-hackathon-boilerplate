import { Request, Response } from "express";
import Report from "../domain/report.model";

export const matchReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ error: "Report not found" });
      return;
    }

    const oppositeType = report.type === "LOST" ? "FOUND" : "LOST";

    const matches = await Report.find({
      _id: { $ne: report._id },
      type: oppositeType,
      status: "OPEN",
      category: report.category,
      $or: [
        { title: { $regex: report.title, $options: "i" } },
        { description: { $regex: report.description, $options: "i" } },
        { color: report.color },
        { brand: report.brand },
      ],
    })
      
      .limit(5);

    res.json(matches);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
