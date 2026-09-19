import React, { useState, useEffect } from 'react';
import { ReportFormData, LostItemCategory } from '../../types/report.types';
import { validateReportForm } from '../../utils/validators';

interface Props {
  mode: 'create' | 'edit';
  initialData?: ReportFormData;
  onSubmit: (data: ReportFormData) => void;
  isSubmitting: boolean;
}

const emptyForm: ReportFormData = {
  type: 'LOST',
  title: '',
  description: '',
  category: LostItemCategory.Other,
  location: '',
  date: new Date().toISOString().split('T')[0],
  color: '',
  brand: '',
  status: 'OPEN',
};

export default function ReportForm({ mode, initialData, onSubmit, isSubmitting }: Props) {
  const [form, setForm] = useState<ReportFormData>(initialData || emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ReportFormData, string>>>({});

  // Sync initialData when fetched asynchronously in Edit mode
  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateReportForm(form);
    if (!valid) {
      setErrors(errors);
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Type: LOST or FOUND */}
      <label htmlFor="type">Report Type</label>
      <select
        id="type"
        name="type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value as 'LOST' | 'FOUND' })}
      >
        <option value="LOST">LOST</option>
        <option value="FOUND">FOUND</option>
      </select>
      {errors.type && <span>{errors.type}</span>}

      {/* Title */}
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. MacBook Pro 14 inch"
      />
      {errors.title && <span>{errors.title}</span>}

      {/* Category Dropdown */}
      <label htmlFor="category">Category</label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value as LostItemCategory })}
      >
        {Object.values(LostItemCategory).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {errors.category && <span>{errors.category}</span>}

      {/* Description */}
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Details, identifying marks, serial numbers, stickers..."
      />
      {errors.description && <span>{errors.description}</span>}

      {/* Brand & Color */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="brand">Brand (optional)</label>
          <input
            id="brand"
            name="brand"
            value={form.brand || ''}
            onChange={handleChange}
            placeholder="e.g. Apple, Lenovo"
          />
        </div>
        <div>
          <label htmlFor="color">Color (optional)</label>
          <input
            id="color"
            name="color"
            value={form.color || ''}
            onChange={handleChange}
            placeholder="e.g. Space Gray, Black"
          />
        </div>
      </div>

      {/* Location */}
      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="e.g. Central Library, 3rd Floor"
      />
      {errors.location && <span>{errors.location}</span>}

      {/* Date */}
      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      {errors.date && <span>{errors.date}</span>}

      {/* Status (Edit mode only: OPEN or RESOLVED) */}
      {mode === 'edit' && (
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status || 'OPEN'}
            onChange={(e) => setForm({ ...form, status: e.target.value as 'OPEN' | 'RESOLVED' })}
          >
            <option value="OPEN">OPEN</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Report' : 'Save Changes'}
      </button>
    </form>
  );
}