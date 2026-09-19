import { Router } from "Express";
import { getReports } from "./getReports.controller";

const router = Router();

router.get("/", getReports);

export default router;