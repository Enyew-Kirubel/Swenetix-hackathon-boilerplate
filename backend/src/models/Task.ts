import { Schema, model, Document, Types } from "mongoose";

export const TASK_STATUSES = ["todo", "in_progress", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  // Fractional ordering inside a column. Moving a card only rewrites this one number.
  position: number;
  // Bumped on every content edit (title/description). Used for optimistic concurrency.
  version: number;
  createdBy: Types.ObjectId;
  createdByName: string;
  updatedByName: string;
  // Set by the client when a task is created offline, so a replayed create is never duplicated
  clientId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: "", maxlength: 2000 },
    status: { type: String, enum: TASK_STATUSES, default: "todo", index: true },
    position: { type: Number, required: true },
    version: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdByName: { type: String, required: true },
    updatedByName: { type: String, required: true },
    clientId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default model<ITask>("Task", schema);

export const serializeTask = (t: ITask) => ({
  id: String(t._id),
  title: t.title,
  description: t.description,
  status: t.status,
  position: t.position,
  version: t.version,
  createdBy: t.createdByName,
  updatedBy: t.updatedByName,
  createdAt: t.createdAt.toISOString(),
  updatedAt: t.updatedAt.toISOString(),
});
