import { Request, Response, NextFunction, RequestHandler } from "express";

export const notFound = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong on the server" });
};

// Express 4 does not catch rejected promises, so async handlers go through this.
export const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<void>): RequestHandler =>
  (req, res, next) => {
    fn(req, res).catch(next);
  };
