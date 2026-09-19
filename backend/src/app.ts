import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportRoutes from "./features/reports/report.routes";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/reports", reportRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "MERN backend is running",
  });
});

export default app;