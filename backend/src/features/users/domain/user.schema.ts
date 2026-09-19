import { Schema } from "mongoose";
import { USER_ROLES } from "./user.constants.js";
import type { IUserDocument } from "./user.types.js";

export const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    avatar: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });
