import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, Users, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = 'http://localhost:5000/api';

export default function AdminDashboard({ election }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResults = async () => {
    if (!election) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/elections/${election._id}/results`);
      setResults(res.data.election);
    } catch (err) {
      setError('Failed to fetch admin results. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!election) return;
    if (!window.confirm('Are you absolutely sure you want to reset ALL votes for this election? This action cannot be undone.')) return;
    
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/admin/elections/${election._id}/reset`);
      await fetchResults(); // Reload results
      alert('Election votes have been reset successfully.');
    } catch (err) {
      setError('Failed to reset votes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [election]);

  if (loading) return <div className="flex-center" style={{ height: '400px' }}><RefreshCw className="animate-spin" /></div>;

  if (error) return (
    <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)' }}>
      <AlertCircle size={48} style={{ marginBottom: '16px' }} />
      <p>{error}</p>
      <button className="btn btn-primary" onClick={fetchResults} style={{ marginTop: '20px' }}>Try Again</button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="flex-between">
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Admin <span className="gradient-text-primary">Control Panel</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>Real-time audit of election " {results?.title} "</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handleReset} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)' }}>
            Reset Votes
          </button>
          <button className="btn btn-secondary" onClick={fetchResults}>
            <RefreshCw size={18} /> Refresh Data
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '16px', borderRadius: '16px' }}>
            <Users color="var(--primary)" size={32} />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Participation</h4>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>{results?.totalVotes}</p>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(52, 211, 153, 0.15)', padding: '16px', borderRadius: '16px' }}>
            <BarChart3 color="var(--success)" size={32} />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Election Status</h4>
            <div className="status-badge" style={{ marginTop: '4px' }}>{results?.status}</div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <h3 style={{ marginBottom: '32px', fontSize: '1.4rem' }}>Live Vote Distribution</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {results?.results.map((candidate, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-between">
                <span style={{ fontWeight: '600' }}>{candidate.name}</span>
                <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{candidate.voteCount} Votes ({candidate.percentage}%)</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ height: '100%', background: 'var(--gradient-primary)', borderRadius: '100px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
