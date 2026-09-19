import { User } from "../domain/user/index";
import { RefreshToken } from "../domain/refresh-token/index";
import { AppError } from "../../../shared/errors/app.error";
import { PasswordHash } from "../../../shared/utils/password.util";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../shared/utils/jwt.util";

import type { LoginInput, LoginResult } from "./login.types";

export const loginService = {
  async execute(input: LoginInput): Promise<LoginResult> {
    const { email, password } = input;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+passwordHash");

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    const passwordMatches = await PasswordHash.compare(
      password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new AppError(
        "Invalid email or password",
        401,
        "INVALID_CREDENTIALS",
      );
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const {
      rawToken: refreshToken,
      tokenHash,
      family,
    } = generateRefreshToken({
      userId: user.id,
      role: user.role,
    });

    await RefreshToken.create({
      userId: user._id,
      tokenHash,
      family,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  },
};
