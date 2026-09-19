import { Router } from "express";
import { getReports } from "./getReports.controller";

const router = Router();

router.get("/", getReports);

export default router;