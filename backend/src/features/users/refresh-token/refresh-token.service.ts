import crypto from "crypto";

import { RefreshToken } from "../domain/refresh-token/refresh-token.model";
import { AppError } from "../../../shared/errors/app.error";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../shared/utils/jwt.util";
import { User } from "../domain/user/index";

import type { RefreshResult } from "./refresh.types";

export const refreshService = {
  async execute(rawRefreshToken: string): Promise<RefreshResult> {
    const payload = verifyRefreshToken(rawRefreshToken);
    console.log("here is the payload", payload);
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawRefreshToken)
      .digest("hex");
    const storedToken = await RefreshToken.findOne({
      tokenHash,
    });

    if (!storedToken) {
      throw new AppError("Invalid refresh token", 401, "INVALID_REFRESH_TOKEN");
    }
    if (storedToken.revokedAt !== null) {
      await RefreshToken.updateMany(
        {
          family: storedToken.family,
          revokedAt: null,
        },
        {
          $set: {
            revokedAt: new Date(),
          },
        },
      );

      throw new AppError(
        "Refresh token reuse detected",
        401,
        "REFRESH_TOKEN_REUSE",
      );
    }
    if (storedToken.expiresAt <= new Date()) {
      storedToken.revokedAt = new Date();
      await storedToken.save();

      throw new AppError("Refresh token expired", 401, "REFRESH_TOKEN_EXPIRED");
    }
    if (storedToken.userId.toString() !== payload.userId) {
      throw new AppError("Invalid refresh token", 401, "INVALID_REFRESH_TOKEN");
    }
    const user = await User.findById(storedToken.userId);

    if (!user) {
      throw new AppError(
        "User account no longer exists",
        401,
        "USER_NOT_FOUND",
      );
    }
    storedToken.revokedAt = new Date();
    await storedToken.save();
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const {
      rawToken: refreshToken,
      tokenHash: newTokenHash,
      family,
    } = generateRefreshToken(
      {
        userId: user.id,
        role: user.role,
      },
      storedToken.family,
    );
    await RefreshToken.create({
      userId: user._id,
      tokenHash: newTokenHash,
      family,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
    };
  },
};
