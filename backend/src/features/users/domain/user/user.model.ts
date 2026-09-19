import mongoose, { Model } from "mongoose";
import { userSchema } from "./user.schema";
import type { IUserDocument } from "./user.types";

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema,
);
