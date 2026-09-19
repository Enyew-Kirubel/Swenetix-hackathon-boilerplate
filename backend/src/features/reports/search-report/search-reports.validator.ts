import { z } from 'zod';

export const searchReportsQuerySchema = z.object({
    location: z.string().trim().min(1).max(255).optional(),
    sort: z.enum(['newest', 'oldest']).default('newest'),
    sortBy: z.enum(['date', 'createdAt']).default('date'),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchReportsQuery = z.infer<typeof searchReportsQuerySchema>;