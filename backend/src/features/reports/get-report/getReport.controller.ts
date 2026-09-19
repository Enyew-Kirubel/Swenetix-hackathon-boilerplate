import { Request, Response } from "Express";
import Report from "../create-report/report.model";

export const getReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

      return res.status(200).json({
        success: true,
        report,
      });
    } catch (error) {

    console.error("Error fetching report:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Report",
    });
  }
};
