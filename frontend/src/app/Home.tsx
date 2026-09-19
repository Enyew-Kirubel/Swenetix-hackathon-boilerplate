import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchReports } from '../store/slices/reportSlice';
import ReportCard from '../components/reports/ReportCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Safe extraction with empty object fallback:
  const { items: reports = [], loading = false, error = null } = useAppSelector(
    (state) => state.reports || {}
  );

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!reports || reports.length === 0) {
    return <EmptyState message="No reports found." />;
  }

  return (
    <div className="report-list">
      {reports.map((report) => (
        <ReportCard
          key={report._id}
          report={report}
          onClick={() => navigate(`/reports/${report._id}`)}
        />
      ))}
    </div>
  );
}