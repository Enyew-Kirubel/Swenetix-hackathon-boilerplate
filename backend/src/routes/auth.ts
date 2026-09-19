import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { asyncHandler } from "../middleware/miscellaneous";
import { requireAuth, signToken } from "../middleware/auth";

const router = Router();

const publicUser = (id: string, username: string) => ({ id, username });

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    if (username.length < 2 || username.length > 30) {
      res.status(400).json({ success: false, message: "Username must be 2 to 30 characters" });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
      return;
    }

    const usernameKey = username.toLowerCase();
    if (await User.exists({ usernameKey })) {
      res.status(409).json({ success: false, message: "That username is taken" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, usernameKey, passwordHash });
      const id = String(user._id);
      res.status(201).json({
        success: true,
        token: signToken({ id, username }),
        user: publicUser(id, username),
      });
    } catch (err) {
      // Two people registering the same name at the same moment
      if ((err as { code?: number }).code === 11000) {
        res.status(409).json({ success: false, message: "That username is taken" });
        return;
      }
      throw err;
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";

    const user = await User.findOne({ usernameKey: username.toLowerCase() });
    const ok = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!user || !ok) {
      res.status(401).json({ success: false, message: "Wrong username or password" });
      return;
    }

    const id = String(user._id);
    res.json({
      success: true,
      token: signToken({ id, username: user.username }),
      user: publicUser(id, user.username),
    });
  })
);

router.get("/me", requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
