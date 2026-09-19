import type { Report } from '../../types/report.types';
import StatusBadge from './statusBadge';

interface Props {
  report: Report;
  onClick: () => void;
}

export default function ReportCard({ report, onClick }: Props) {
  return (
    <div className="report-card" onClick={onClick}>
      {/* Status (OPEN / RESOLVED) */}
      <StatusBadge status={report.status} />

      {/* Optional image thumbnail if available */}
      {report.imagePath && (
        <div style={{ marginTop: '0.5rem', borderRadius: '6px', overflow: 'hidden', maxHeight: '160px' }}>
          <img
            src={report.imagePath}
            alt={report.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      <h3 style={{ marginTop: '0.75rem' }}>{report.title}</h3>
      <p>{report.category} • {report.location}</p>
    </div>
  );
}