

import { useState } from 'react';
import type { ReportFormData } from '../../types/report.types';
import { CATEGORIES, STATUS_OPTIONS } from '../../utils/constants';
import { validateReportForm } from '../../utils/validators';

interface Props {
  mode: 'create' | 'edit';
  initialData?: ReportFormData;
  onSubmit: (data: ReportFormData) => void;
  isSubmitting: boolean;
}

const emptyForm: ReportFormData = {
  title: '', description: '', category: '', status: 'LOST', location: '',
};

export default function ReportForm({ initialData, onSubmit, isSubmitting }: Props) {
  const [form, setForm] = useState<ReportFormData>(initialData || emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateReportForm(form);
    if (!valid) return setErrors(errors);
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" />
      {errors.title && <span>{errors.title}</span>}

      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      {errors.description && <span>{errors.description}</span>}

      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option value="">Select category</option>
        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      {errors.category && <span>{errors.category}</span>}

      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'LOST' | 'FOUND' })}>
        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
      {errors.location && <span>{errors.location}</span>}

      <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
    </form>
  );
}