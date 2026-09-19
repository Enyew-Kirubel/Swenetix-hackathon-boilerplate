

import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getAllReports } from '../api/reportService';
import ReportCard from '../components/reports/ReportCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';

export default function Home() {
  const { data: reports, loading, error } = useFetch(getAllReports, []);
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!reports || reports.length === 0) return <EmptyState message="No reports yet — create the first one." />;

  return (
    <div className="report-list">
      {reports.map((r) => (
        <ReportCard key={r._id} report={r} onClick={() => navigate(`/reports/${r._id}`)} />
      ))}
    </div>
  );
}