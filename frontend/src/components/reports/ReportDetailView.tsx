import type { Report } from '../../types/report.types';
import StatusBadge from './statusBadge';

interface Props {
  report: Report;
}

export default function ReportDetailView({ report }: Props) {
  // Format the ISO date safely
  const formattedDate = report.date
    ? new Date(report.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'N/A';

  // Extract reporter name whether reporter is an object (populated) or an ID string
  const reporterName =
    typeof report.reporter === 'object' && report.reporter !== null
      ? report.reporter.name
      : null;

  return (
    <article className="report-detail-card" style={{ maxWidth: '650px', margin: '0 auto' }}>
      {/* Optional Attached Photo */}
      {report.imagePath && (
        <div
          style={{
            marginBottom: '1.25rem',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-surface, #161b22)',
            border: '1px solid var(--border-subtle, #30363d)',
          }}
        >
          <img
            src={report.imagePath}
            alt={report.title}
            style={{
              width: '100%',
              maxHeight: '380px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* Badges Row: Type (LOST / FOUND) + Status (OPEN / RESOLVED) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem',
        }}
      >
        <StatusBadge status={report.status} />
        <span
          className={`badge ${report.status === 'RESOLVED' ? 'badge-found' : 'badge-lost'}`}
          style={{ textTransform: 'uppercase' }}
        >
          {report.status}
        </span>
      </div>

      {/* Report Title */}
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: '0.75rem',
          color: 'var(--text-primary, #f0f6fc)',
        }}
      >
        {report.title}
      </h2>

      {/* Description */}
      <p
        style={{
          color: 'var(--text-secondary, #8b949e)',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          whiteSpace: 'pre-line',
        }}
      >
        {report.description}
      </p>

      {/* Structured Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
          backgroundColor: 'var(--bg-surface, #161b22)',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle, #30363d)',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted, #6e7681)',
              marginBottom: '0.25rem',
            }}
          >
            Category
          </span>
          <strong style={{ color: 'var(--text-primary, #f0f6fc)' }}>{report.category}</strong>
        </div>

        <div>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted, #6e7681)',
              marginBottom: '0.25rem',
            }}
          >
            Location
          </span>
          <strong style={{ color: 'var(--text-primary, #f0f6fc)' }}>{report.location}</strong>
        </div>

        <div>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted, #6e7681)',
              marginBottom: '0.25rem',
            }}
          >
            Date
          </span>
          <strong style={{ color: 'var(--text-primary, #f0f6fc)' }}>{formattedDate}</strong>
        </div>

        {report.brand && (
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted, #6e7681)',
                marginBottom: '0.25rem',
              }}
            >
              Brand
            </span>
            <strong style={{ color: 'var(--text-primary, #f0f6fc)' }}>{report.brand}</strong>
          </div>
        )}

        {report.color && (
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted, #6e7681)',
                marginBottom: '0.25rem',
              }}
            >
              Color
            </span>
            <strong style={{ color: 'var(--text-primary, #f0f6fc)' }}>{report.color}</strong>
          </div>
        )}

        {reporterName && (
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-muted, #6e7681)',
                marginBottom: '0.25rem',
              }}
            >
              Reported By
            </span>
            <strong style={{ color: 'var(--text-primary, #f0f6fc)' }}>{reporterName}</strong>
          </div>
        )}
      </div>
    </article>
  );
}