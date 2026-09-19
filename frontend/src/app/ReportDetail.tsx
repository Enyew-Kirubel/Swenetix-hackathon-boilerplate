import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReportDetailView from '../components/reports/ReportDetailView';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ErrorMessage from '../components/common/ErrorMessage';
import { MOCK_REPORTS } from '../dummy/mock'; // Adjust path if your mock file is elsewhere

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  // Debug: Log the param and available IDs
  console.log('Param ID from URL:', id);
  console.log('Available IDs:', MOCK_REPORTS.map((r) => r._id));

  // Find the report directly in mock data
  const report = MOCK_REPORTS.find((r) => String(r._id) === String(id));

  if (!report) {
    return (
      <div style={{ maxWidth: '650px', margin: '2rem auto', textAlign: 'center' }}>
        <ErrorMessage message={`Report not found for ID: ${id || 'undefined'}`} />
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
      <ReportDetailView report={report} />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => navigate(`/reports/${id}/edit`)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          style={{ backgroundColor: 'var(--danger)' }}
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        message="Are you sure you want to delete this report?"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}