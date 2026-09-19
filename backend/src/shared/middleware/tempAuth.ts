import { Response, NextFunction } from "express";

export default (req: any, _res: Response, next: NextFunction) => {
  req.user = { id: "000000000000000000000000" };
  next();
};