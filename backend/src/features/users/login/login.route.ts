import { Router } from "express";
import { validate } from "../../../shared/middleware/validate.middleware";
import { loginSchema, loginController } from "./index";

const router = Router();

router.post("/login", validate(loginSchema), loginController);

export default router;
