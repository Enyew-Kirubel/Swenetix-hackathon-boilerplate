
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getReportById, updateReport } from '../api/reportService';
import ReportForm from '../components/reports/ReportForm';
import type { ReportFormData } from '../types/report.types';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function EditReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: report, loading } = useFetch(() => getReportById(id!), [id]);

  if (loading || !report) return <LoadingSpinner />;

  const handleSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    await updateReport(id!, data);
    setIsSubmitting(false);
    navigate(`/reports/${id}`);
  };

  return <ReportForm mode="edit" initialData={report} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}

