
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hook';
import { addReport } from '../store/slices/reportSlice'; 
import ReportForm from '../components/reports/ReportForm';
import type { ReportFormData } from '../types/report.types';

export default function CreateReport() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    try {
      const result = await dispatch(addReport(data)).unwrap();
      navigate(`/reports/${result._id}`);
    } catch (err: any) {
      alert(err || 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '2rem auto', padding: '0 1rem' }}>
      <ReportForm mode="create" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}