import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();

// Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "MERN backend is running" });
});
export default app;
