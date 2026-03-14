import React, { useEffect, useState } from 'react';
import type { Bowler } from '../types/bowler';

export default function BowlersTable() {
  const [bowlers, setBowlers] = useState<Bowler[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchBowlers() {
      try {
  const res = await fetch('/api/bowlers');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = (await res.json()) as Bowler[];
        if (mounted) setBowlers(data);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? 'Unknown error');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBowlers();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading bowlers…</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ marginTop: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Team</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Address</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>City</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>State</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Zip</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((b, i) => (
            <tr key={i}>
              <td style={{ padding: '8px 0' }}>
                {b.first ?? ''} {b.middle ?? ''} {b.last ?? ''}
              </td>
              <td>{b.teamName}</td>
              <td>{b.address}</td>
              <td>{b.city}</td>
              <td>{b.state}</td>
              <td>{b.zip}</td>
              <td>{b.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
