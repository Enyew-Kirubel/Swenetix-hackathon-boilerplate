import Report from "../domain/report.model";

export const getReportById = async (id: string) => {
  const report = await Report.findById(id);

  return report;
};