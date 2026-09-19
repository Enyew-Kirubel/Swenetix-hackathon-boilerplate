import { Router } from "express";
import { createReport } from "./create-report/createReport.controller";
import { getReports } from "./get-reports/getReports.controller";
import { getReport } from "./get-report/getReport.controller";
import { updateReport } from "./update-report/updateReport.controller";
import { deleteReport } from "./delete-report/deleteReport.controller";
import { searchReports } from "./search-reports/searchReports.controller";
import { matchReports } from "./match-reports/matchReports.controller";
import tempAuth from "../../shared/middleware/tempAuth";

const router = Router();

router.get("/search", searchReports);
router.get("/:id/matches", matchReports);

router.post("/", tempAuth, createReport);
router.get("/", getReports);
router.get("/:id", getReport);
router.put("/:id", tempAuth, updateReport);
router.delete("/:id", tempAuth, deleteReport);

export default router;