import { User } from "../domain/user/index";
import { AppError } from "../../../shared/errors/app.error";
import { PasswordHash } from "../../../shared/utils/password.util";

import { USER_ROLES } from "../domain/user/user.constants";

import type { SignupInput, SignupResult } from "./signup.types";

export const signupService = {
  async execute(input: SignupInput): Promise<SignupResult> {
    const { name, email, password, phone, avatar } = input;

    const nameNormalized = name.trim();
    const emailNormalized = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: emailNormalized,
    });

    if (existingUser) {
      throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");
    }

    const passwordHash = await PasswordHash.hash(password);

    const user = await User.create({
      name: nameNormalized,
      email: emailNormalized,
      passwordHash,
      ...(phone !== undefined && { phone }),
      ...(avatar !== undefined && { avatar }),
      role: USER_ROLES.USER,
      isVerified: false,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  },
};
