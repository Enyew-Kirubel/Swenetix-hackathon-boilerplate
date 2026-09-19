import { Router } from "express";

import loginRouter from "../features/users/login/login.route";
import meRouter from "../features/users/me/me.route";
import refreshRouter from "../features/users/refresh-token/refresh.route";
import signupRouter from "../features/users/signup/signup.route";
import updateReportRoute from "../features/reports/update-report/update-report.route";
import deleteReportRoute from "../features/reports/delete-report/delete-report.route";

const router = Router();

router.use("/auth", loginRouter);
router.use("/auth", signupRouter);
router.use("/user", meRouter);
router.use("/refresh", refreshRouter);

router.use("/items", updateReportRoute);
router.use("/items", deleteReportRoute);

export default router;
