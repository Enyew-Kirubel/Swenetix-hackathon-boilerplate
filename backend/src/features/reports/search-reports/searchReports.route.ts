import { Router } from "express";
import { searchReports } from "./searchReports.controller";

const router = Router();

router.get("/", searchReports);

export default router;