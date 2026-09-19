import { Router } from "express";
import { getReport } from "./getReport.controller";

const router = Router();

router.get("/:id", getReport);

export default router;