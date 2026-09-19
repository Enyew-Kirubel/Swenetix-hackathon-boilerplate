import { z } from 'zod';
import { CATEGORIES } from '../../models/report.model';

export const updateReportSchema = z
    .object({
        title: z.string().trim().min(3).max(150),
        description: z.string().trim().min(5),
        location: z.string().trim().min(2).max(255),
        type: z.enum(['LOST', 'FOUND']),
        category: z.enum(CATEGORIES),
        dateOccurred: z.coerce.date(),
        status: z.enum(['OPEN', 'RESOLVED']),
        imageUrl: z.string().url().nullable(),
    })
    .partial()
    .strict() // rejects user, _id, and any unknown field
    .refine((d) => Object.keys(d).length > 0, {
        message: 'Provide at least one field to update',
    });

export type UpdateReportInput = z.infer<typeof updateReportSchema>;