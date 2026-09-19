
export default function StatusBadge({ status }: { status: 'OPEN' | 'RESOLVED' }) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>;
}
