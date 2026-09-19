import { Router } from "express";

import loginRouter from "../features/users/login/login.route";
import meRouter from "../features/users/me/me.route";
import refreshRouter from "../features/users/refresh-token/refresh.route";
import signupRouter from "../features/users/signup/signup.route";
// import refreshRouter from "../features/users/refresh/refresh.route.js";

const router = Router();

router.use("/auth", loginRouter);
// router.use("/auth", refreshRouter);
router.use("/auth", signupRouter);
router.use("/user", meRouter);
router.use("/refresh", refreshRouter);
// router.use("/auth", signupRouter);
// router.use("/auth", refreshRouter);

export default router;
