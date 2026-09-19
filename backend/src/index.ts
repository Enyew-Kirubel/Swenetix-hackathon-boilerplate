import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { requestLogger } from "./shared/middleware/requestLogger";
import { notFoundHandler } from "./shared/middleware/notFoundHandler";
import { errorHandler } from "./shared/middleware/errorHandler";
import routes from "./routes/index";
const app: Express = express();
const allowedOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  }),
);
app.use(express.json());
app.use(requestLogger);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "MERN backend is running" });
});
app.use("/api/v1", routes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
