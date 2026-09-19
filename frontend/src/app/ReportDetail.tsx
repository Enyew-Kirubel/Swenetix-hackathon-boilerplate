
import { Report } from '../types/report.types';
import StatusBadge from '../components/reports/statusBadge';

export default function ReportDetailView({ report }: { report: Report }) {
  return (
    <div>
      <StatusBadge status={report.status} />
      <h2>{report.title}</h2>
      <p>{report.description}</p>
      <p>Category: {report.category}</p>
      <p>Location: {report.location}</p>
      <p>Date: {new Date(report.date).toLocaleDateString()}</p>
    </div>
  );
}