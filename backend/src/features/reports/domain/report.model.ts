import { Schema, model, Document, Types } from "mongoose";

export interface IReport extends Document {
  type: "LOST" | "FOUND";
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date;
  imagePath?: string;
  color?: string;
  brand?: string;
  status: "OPEN" | "RESOLVED";
  reporter: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    type: {
      type: String,
      enum: ["LOST", "FOUND"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Documents",
        "Accessories",
        "Bags",
        "Keys",
        "Jewelry",
        "Pets",
        "Other",
      ],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imagePath: {
      type: String,
    },
    color: {
      type: String,
    },
    brand: {
      type: String,
    },
    status: {
      type: String,
      enum: ["OPEN", "RESOLVED"],
      default: "OPEN",
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

reportSchema.index({ title: "text", description: "text" });
reportSchema.index({ category: 1 });
reportSchema.index({ type: 1 });
reportSchema.index({ location: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ createdAt: -1 });
reportSchema.index({ reporter: 1 });

export default model<IReport>("Report", reportSchema);
