
export default function StatusBadge({ status }: { status: 'LOST' | 'FOUND' }) {
  return <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>;
}
