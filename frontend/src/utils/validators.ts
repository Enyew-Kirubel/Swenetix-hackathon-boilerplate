
import type { ReportFormData } from '../types/report.types';

export function validateReportForm(data: ReportFormData) {
  const errors: Record<string, string> = {};
  if (!data.title.trim()) errors.title = 'Title is required';
  if (!data.description.trim()) errors.description = 'Description is required';
  if (!data.category) errors.category = 'Category is required';
  if (!data.location.trim()) errors.location = 'Location is required';
  if (!['LOST', 'FOUND'].includes(data.status)) errors.status = 'Status must be LOST or FOUND';
  return { valid: Object.keys(errors).length === 0, errors };
}

