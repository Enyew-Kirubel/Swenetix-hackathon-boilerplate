import { Router } from "express";
import { createReport } from "../create-report/createReport.controller";
import { getReports } from "../get-reports/getReports.controller";
import { getReport } from "../get-report/getReport.controller";
import { updateReportController } from "../update-report/update-report.controller";
import { deleteReportController } from "../delete-report/delete-report.controller";
import { searchReportsController } from "./search-reports.service";
import { matchReports } from "../match-reports/matchReports.controller";
import tempAuth from "../../shared/middleware/tempAuth";


const router = Router();

router.get("/search", searchReportsController);
router.get("/:id/matches", matchReports);

router.post("/", tempAuth, createReport);
router.get("/", getReports);
router.get("/:id", getReport);
router.patch("/:id", updateReportController);
router.delete("/:id", deleteReportController);

export default router;