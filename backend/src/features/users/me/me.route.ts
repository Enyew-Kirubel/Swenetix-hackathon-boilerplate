import { Router } from "express";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { meController } from "./me.controller";

const router = Router();

router.get("/me", authMiddleware, meController);

export default router;
