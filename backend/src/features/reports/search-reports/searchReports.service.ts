import Report from "../../../models/Report";

export const searchReports = async (search: string) => {
  const reports = await Report.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  }).sort({ createdAt: -1 });

  return reports;
};