import Report from "../../../models/Report";

export const getReportById = async (id: string) => {
  const report = await Report.findById(id);

  return report;
};