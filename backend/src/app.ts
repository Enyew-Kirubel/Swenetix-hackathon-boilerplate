import express, { Express, Request, Response } from "express";
import getReportsRoute from "./features/reports/get-reports/getReports.route";
import getReportRoute from "./features/reports/get-report/getReport.routes";
import searchReportsRoute from "./features/reports/search-reports/searchReports.route";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "MERN backend is running" });
});


app.use("/api/reports", getReportsRoute);
app.use("/api/reports", getReportRoute);
app.use("/api/reports/search", searchReportsRoute);

export default app;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
