import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./features/reports/report.routes";
import searchReportsRoute from "./features/reports/search-reports/searchReports.route";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Report routes
app.use("/api/reports", reportRoutes);

// Search reports
app.use("/api/reports/search", searchReportsRoute);

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "MERN backend is running",
  });
});

export default app;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});