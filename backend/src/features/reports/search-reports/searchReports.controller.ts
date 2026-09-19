import { Request, Response } from "express";
import Report from "../domain/report.model";

export const searchReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q) {
      res.json([]);
      return;
    }
    const reports = await Report.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    })
      
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
