import Report from "../../../models/Report";

export const getAllReports = async () => {
  const reports = await Report.find().sort({ createdAt: -1 });

  return reports;
};