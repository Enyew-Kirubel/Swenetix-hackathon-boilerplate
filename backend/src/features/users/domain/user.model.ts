import mongoose, { Model } from "mongoose";
import { userSchema } from "./user.schema.js";
import type { IUserDocument } from "./user.types.js";

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema,
);
