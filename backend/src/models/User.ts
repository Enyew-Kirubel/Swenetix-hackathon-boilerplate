import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  usernameKey: string;
  passwordHash: string;
}

const schema = new Schema<IUser>(
  {
    // What people see on cards and in the presence bar
    username: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
    // Lowercased copy so "Sam" and "sam" cannot both register
    usernameKey: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", schema);
