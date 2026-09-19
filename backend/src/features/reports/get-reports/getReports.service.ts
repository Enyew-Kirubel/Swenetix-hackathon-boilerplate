import Report from "../domain/report.model";

interface ReportFilters {
  category?: string;
  type?: string;
  location?: string;
  status?: string;
  sort?: string;
}

export const getAllReports = async (filters: ReportFilters = {}) => {
  const { category, type, location, status, sort } = filters;

  const filter: Record<string, any> = {};

  if (category) {
    filter.category = category;
  }

  if (type) {
    filter.type = type;
  }

  if (location) {
    filter.location = {
      $regex: location,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  const sortOption =
    sort === "oldest"
      ? { createdAt: 1 as const }
      : { createdAt: -1 as const };

  const reports = await Report.find(filter).sort(sortOption);

  return reports;
};