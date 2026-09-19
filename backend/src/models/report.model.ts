// src/models/report.model.ts
import { Schema, model, InferSchemaType } from 'mongoose';

export const CATEGORIES = [
    'Electronics', 'Documents', 'Keys', 'Wallet',
    'Pets', 'Clothing', 'Bags', 'Other',
] as const;

const reportSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        type: { type: String, enum: ['LOST', 'FOUND'], required: true, index: true },
        title: { type: String, required: true, trim: true, maxlength: 150 },
        description: { type: String, required: true, trim: true },
        category: { type: String, enum: CATEGORIES, required: true, index: true },
        location: { type: String, required: true, trim: true, maxlength: 255 },
        dateOccurred: { type: Date, required: true },
        status: { type: String, enum: ['OPEN', 'RESOLVED'], default: 'OPEN' },
        imageUrl: { type: String, default: null },
    },
    { timestamps: true }
);

reportSchema.index({ title: 'text', description: 'text' });

export type ReportDoc = InferSchemaType<typeof reportSchema>;
export const Report = model('Report', reportSchema);