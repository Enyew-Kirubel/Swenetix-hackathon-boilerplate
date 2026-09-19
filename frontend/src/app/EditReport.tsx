import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchReportById, updateExistingReport } from '../store/slices/reportSlice';
import ReportForm from '../components/reports/ReportForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import type { ReportFormData } from '../types/report.types';

export default function EditReport() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { selectedReport, loading, error } = useAppSelector((state) => state.reports);

  useEffect(() => {
    if (id) {
      dispatch(fetchReportById(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (data: ReportFormData) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await dispatch(updateExistingReport({ id, data })).unwrap();
      navigate(`/reports/${id}`);
    } catch (err: any) {
      alert(err || 'Failed to update report');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error || !selectedReport) return <ErrorMessage message={error || 'Report not found'} />;

  return (
    <div style={{ maxWidth: '650px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Edit Report</h2>
      <ReportForm
        mode="edit"
        initialData={selectedReport}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}