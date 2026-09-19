import { Report } from '../../models/report.model';
import { SearchReportsQuery } from './search-reports.validator';

// Escape regex special characters so "a.b*" is treated as plain text
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function buildFilter(q: SearchReportsQuery) {
    const filter: Record<string, unknown> = {};
    if (q.location) {
        filter.location = { $regex: escapeRegex(q.location), $options: 'i' };
    }
    // teammates add: category, type, text search here
    return filter;
}

export async function searchReports(q: SearchReportsQuery) {
    const filter = buildFilter(q);
    const direction = q.sort === 'newest' ? -1 : 1;

    // _id is a tiebreaker so pagination order stays stable
    const sort: Record<string, 1 | -1> = { [q.sortBy]: direction, _id: direction };

    const [items, total] = await Promise.all([
        Report.find(filter)
            .sort(sort)
            .skip((q.page - 1) * q.limit)
            .limit(q.limit)
            .populate('reporter', 'name phone')
            .lean(),
        Report.countDocuments(filter),
    ]);

    return {
        items,
        pagination: {
            page: q.page,
            limit: q.limit,
            total,
            totalPages: Math.ceil(total / q.limit),
        },
    };
}