import { Request, Response } from "express";
import Report from "../domain/report.model";

export const createReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = await Report.create({
      ...req.body,
      reporter: (req as any).user?.id,
    });
    res.status(201).json(report);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
