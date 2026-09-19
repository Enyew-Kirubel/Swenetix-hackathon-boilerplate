import { Schema, model, Document, Types } from "mongoose";

export interface ICopy extends Document {
  bookId: Types.ObjectId;
  copyNumber: string;
  status: "AVAILABLE" | "BORROWED";
  createdAt: Date;
  updatedAt: Date;
}

const copySchema = new Schema<ICopy>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    copyNumber: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["AVAILABLE", "BORROWED"],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  }
);

copySchema.index(
  { bookId: 1, copyNumber: 1 },
  { unique: true }
);

export default model<ICopy>("Copy", copySchema);