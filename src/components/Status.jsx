// Conditional rendering helper for loading / error / empty states
export default function Status({ loading, error, empty, emptyText = 'Nothing here yet.' }) {
  if (loading) return <p className="status">Loading…</p>;
  if (error) return <p className="status error">Could not load data: {error}. Check your connection and refresh.</p>;
  if (empty) return <p className="status">{emptyText}</p>;
  return null;
}
