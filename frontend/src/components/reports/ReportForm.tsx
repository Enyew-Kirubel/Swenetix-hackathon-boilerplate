// src/components/reports/ReportForm.tsx
import React, { useState, useEffect } from 'react';
import { ReportFormData, LostItemCategory } from '../../types/report.types';
import { validateReportForm } from '../../utils/validators';

interface Props {
  mode: 'create' | 'edit';
  initialData?: ReportFormData;
  onSubmit: (data: ReportFormData, file?: File | null) => void;
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
  imagePath: '',
  status: 'OPEN',
};

export default function ReportForm({ mode, initialData, onSubmit, isSubmitting }: Props) {
  const [form, setForm] = useState<ReportFormData>(initialData || emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.imagePath || null);
  const [errors, setErrors] = useState<Partial<Record<keyof ReportFormData, string>>>({});

  // Sync state if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
      });
      if (initialData.imagePath) {
        setPreviewUrl(initialData.imagePath);
      }
    }
  }, [initialData]);

  // Handle text/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload & preview (Only for LOST reports)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      // For immediate preview in mock data/UI
      setForm((prev) => ({ ...prev, imagePath: objectUrl }));
    }
  };

  const handleTypeToggle = (type: 'LOST' | 'FOUND') => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateReportForm(form);
    if (!valid) {
      setErrors(errors);
      return;
    }
    onSubmit(form, selectedFile);
  };

  const isLost = form.type === 'LOST';

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Type Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => handleTypeToggle('LOST')}
          style={{
            flex: 1,
            padding: '0.6rem',
            backgroundColor: isLost ? 'var(--danger, #f85149)' : 'var(--bg-elevated, #21262d)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Lost Item
        </button>
        <button
          type="button"
          onClick={() => handleTypeToggle('FOUND')}
          style={{
            flex: 1,
            padding: '0.6rem',
            backgroundColor: !isLost ? 'var(--brand-primary, #238636)' : 'var(--bg-elevated, #21262d)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Found Item
        </button>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title">
          {isLost ? 'What did you lose?' : 'What item did you find?'}
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder={isLost ? 'e.g. Space Gray MacBook Pro 14' : 'e.g. Leather Bi-Fold Wallet'}
        />
        {errors.title && <span style={{ color: 'var(--danger)' }}>{errors.title}</span>}
      </div>

      {/* Category Dropdown */}
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as LostItemCategory }))}
        >
          {Object.values(LostItemCategory).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span style={{ color: 'var(--danger)' }}>{errors.category}</span>}
      </div>

      {/* Image Upload Input (Exclusively visible when type === 'LOST') */}
      {isLost && (
        <div
          style={{
            border: '1px dashed var(--border-subtle, #30363d)',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: 'var(--bg-elevated, #1b2028)',
          }}
        >
          <label htmlFor="imageFile" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Upload Reference Photo of Lost Item
          </label>
          <input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '0.5rem' }}
          />

          {previewUrl && (
            <div style={{ marginTop: '0.75rem', position: 'relative' }}>
              <img
                src={previewUrl}
                alt="Selected preview"
                style={{
                  width: '100%',
                  maxHeight: '220px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle, #30363d)',
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setForm((prev) => ({ ...prev, imagePath: '' }));
                }}
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.8rem',
                  padding: '0.3rem 0.6rem',
                  backgroundColor: 'var(--danger, #f85149)',
                }}
              >
                Remove photo
              </button>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder={
            isLost
              ? 'Provide details, stickers, scratches, or unique serials that prove it is yours...'
              : 'Describe visible appearance, location circumstances, or where the owner can claim it...'
          }
        />
        {errors.description && <span style={{ color: 'var(--danger)' }}>{errors.description}</span>}
      </div>

      {/* Brand & Color */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="brand">Brand (optional)</label>
          <input
            id="brand"
            name="brand"
            value={form.brand || ''}
            onChange={handleChange}
            placeholder="e.g. Apple, Lenovo, Sony"
          />
        </div>
        <div>
          <label htmlFor="color">Color (optional)</label>
          <input
            id="color"
            name="color"
            value={form.color || ''}
            onChange={handleChange}
            placeholder="e.g. Black, Brown, Silver"
          />
        </div>
      </div>

      {/* Location & Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="location">
            {isLost ? 'Last seen location' : 'Where was it found?'}
          </label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Library 3rd floor"
          />
          {errors.location && <span style={{ color: 'var(--danger)' }}>{errors.location}</span>}
        </div>

        <div>
          <label htmlFor="date">{isLost ? 'Date lost' : 'Date found'}</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <span style={{ color: 'var(--danger)' }}>{errors.date}</span>}
        </div>
      </div>

      {/* Edit Mode Only: Status toggle */}
      {mode === 'edit' && (
        <div>
          <label htmlFor="status">Report Status</label>
          <select
            id="status"
            name="status"
            value={form.status || 'OPEN'}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as 'OPEN' | 'RESOLVED' }))}
          >
            <option value="OPEN">OPEN</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: isLost ? 'var(--danger, #f85149)' : 'var(--brand-primary, #238636)',
          padding: '0.75rem',
          fontWeight: 600,
        }}
      >
        {isSubmitting
          ? 'Saving...'
          : mode === 'create'
          ? isLost
            ? 'Publish Lost Item Report'
            : 'Publish Found Item Report'
          : 'Save Changes'}
      </button>
    </form>
  );
}