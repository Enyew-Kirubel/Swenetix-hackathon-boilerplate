import { Router } from "express";

import { refreshController } from "./refresh-token.controller";

const router = Router();

router.post("/refresh", refreshController);

export default router;
