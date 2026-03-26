import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart3, Users, AlertCircle, RefreshCw, UserPlus, LogOut, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = 'http://localhost:5000/api';

export default function AdminDashboard({ election, onLogout }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add Candidate form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ name: '', position: 'Chairman', bio: '' });
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState('');

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

  const [resetConfirmMode, setResetConfirmMode] = useState(false);

  const handleReset = async () => {
    if (!election) return;
    
    // Avoid native window.confirm which is blocked in many browser sandboxes
    if (!resetConfirmMode) {
      setResetConfirmMode(true);
      setTimeout(() => setResetConfirmMode(false), 4000); // Disarm after 4s
      return;
    }
    
    try {
      setResetConfirmMode(false);
      setLoading(true);
      await axios.post(`${API_BASE}/admin/elections/${election._id}/reset`);
      await fetchResults();
      // Use internal success state if needed, or rely on visual state change (vote counts returning to 0).
    } catch (err) {
      setError('Failed to reset votes.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!newCandidate.name.trim() || !newCandidate.position) return;
    
    setAddLoading(true);
    setAddSuccess('');
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/admin/elections/${election._id}/add-candidate`, newCandidate);
      setAddSuccess(res.data.message);
      setNewCandidate({ name: '', position: 'Chairman', bio: '' });
      await fetchResults();
      // Auto-hide success after 3s
      setTimeout(() => setAddSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add candidate.');
    } finally {
      setAddLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [election]);

  if (loading) return <div className="flex-center" style={{ height: '400px' }}><RefreshCw className="animate-spin" /></div>;

  if (error && !results) return (
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
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => setShowAddForm(!showAddForm)} style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={18} /> Add Candidate
          </button>
          <button className="btn btn-secondary" onClick={handleReset} style={{ background: resetConfirmMode ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.1)', color: resetConfirmMode ? 'white' : 'var(--danger)', border: '1px solid var(--danger)', transition: 'all 0.2s' }}>
            {resetConfirmMode ? 'Click Again to Confirm Reset!' : 'Reset Votes'}
          </button>
          <button className="btn btn-secondary" onClick={fetchResults} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} /> Refresh
          </button>
          <button className="btn btn-secondary" onClick={onLogout} style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Return Home
          </button>
        </div>
      </div>

      {/* Add Candidate Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div className="flex-between" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <UserPlus size={22} color="var(--primary)" /> Add New Candidate
                </h3>
                <button onClick={() => setShowAddForm(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              {addSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid var(--success)', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', color: 'var(--success)', fontSize: '0.9rem' }}
                >
                  ✓ {addSuccess}
                </motion.div>
              )}

              {error && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleAddCandidate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>Candidate Name *</label>
                    <input
                      type="text"
                      value={newCandidate.name}
                      onChange={e => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter candidate full name"
                      required
                      style={{
                        width: '100%', padding: '14px 16px', borderRadius: '12px',
                        background: 'var(--bg-dark)', border: '1px solid var(--card-border)',
                        color: 'white', fontSize: '1rem', outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>Position *</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={newCandidate.position}
                        onChange={e => setNewCandidate(prev => ({ ...prev, position: e.target.value }))}
                        style={{
                          width: '100%', padding: '14px 16px', borderRadius: '12px',
                          background: 'var(--bg-dark)', border: '1px solid var(--card-border)',
                          color: 'white', fontSize: '1rem', outline: 'none',
                          appearance: 'none', cursor: 'pointer'
                        }}
                      >
                        <option value="Chairman">Chairman</option>
                        <option value="Vice Chairman">Vice Chairman</option>
                        <option value="Secretary">Secretary</option>
                      </select>
                      <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600' }}>Bio / Description</label>
                  <textarea
                    value={newCandidate.bio}
                    onChange={e => setNewCandidate(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Brief description of the candidate's background and goals"
                    rows={3}
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: '12px',
                      background: 'var(--bg-dark)', border: '1px solid var(--card-border)',
                      color: 'white', fontSize: '1rem', outline: 'none',
                      resize: 'vertical', fontFamily: 'inherit',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={addLoading || !newCandidate.name.trim()}
                  style={{ padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {addLoading ? <><RefreshCw size={18} className="animate-spin" /> Adding...</> : <><UserPlus size={18} /> Add Candidate</>}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
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
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ background: 'rgba(251, 191, 36, 0.15)', padding: '16px', borderRadius: '16px' }}>
            <UserPlus color="#fbbf24" size={32} />
          </div>
          <div>
            <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Candidates</h4>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>{results?.results?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Live Vote Distribution */}
      <div className="glass-panel" style={{ padding: '40px' }}>
        <h3 style={{ marginBottom: '32px', fontSize: '1.4rem' }}>Live Vote Distribution</h3>
        {['Chairman', 'Vice Chairman', 'Secretary'].map(pos => {
          const posCandidates = results?.results.filter(c => c.position === pos) || [];
          if (posCandidates.length === 0) return null;
          
          return (
            <div key={pos} style={{ marginBottom: '32px' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>{pos}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {posCandidates.map((candidate, idx) => (
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
          );
        })}
      </div>
    </div>
  );
}
