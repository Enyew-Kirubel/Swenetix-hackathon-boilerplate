import { Router } from "express";
import { validate } from "../../../shared/middleware/validate.middleware";
import { signupSchema, signupController } from "./index";

const router = Router();

router.post("/signup", validate(signupSchema), signupController);

export default router;
