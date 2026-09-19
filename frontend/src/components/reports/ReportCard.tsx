
import type { Report } from '../../types/report.types';
import StatusBadge from './statusBadge';

export default function ReportCard({ report, onClick }: { report: Report; onClick: () => void }) {
  return (
    <div className="report-card" onClick={onClick}>
      <StatusBadge status={report.status} />
      <h3>{report.title}</h3>
      <p>{report.category} • {report.location}</p>
    </div>
  );
}