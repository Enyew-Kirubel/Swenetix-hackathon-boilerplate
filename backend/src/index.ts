import http from "http";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db";
import { assertAuthConfig } from "./middleware/auth";
import { errorHandler, notFound } from "./middleware/miscellaneous";
import { initRealtime } from "./realtime";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "MERN backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async (): Promise<void> => {
  assertAuthConfig();
  await connectDB();

  // Socket.IO needs the raw HTTP server, not just the Express app
  const server = http.createServer(app);
  initRealtime(server);

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
