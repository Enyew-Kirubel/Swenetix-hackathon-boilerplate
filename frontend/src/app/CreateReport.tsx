
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportForm from '../components/reports/ReportForm';
import { createReport } from '../api/reportService';
import type { ReportFormData } from '../types/report.types';

export default function CreateReport() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    const created = await createReport(data);
    setIsSubmitting(false);
    navigate(`/reports/${created._id}`);
  };

  return <ReportForm mode="create" onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}