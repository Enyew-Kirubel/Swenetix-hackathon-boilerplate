import { Document } from "mongoose";
import type { UserRole } from "./user.constants.js";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}
