import { Request, Response } from "express";
import Report from "../domain/report.model";

export const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, type, location, status, sort } = req.query;
    const filter: Record<string, any> = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (status) filter.status = status;

    const sortOption: Record<string, 1 | -1> =
      sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const reports = await Report.find(filter)
      
      .sort(sortOption);

    res.json(reports);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
