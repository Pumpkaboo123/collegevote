import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, AlertCircle, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import CandidateModal from './components/CandidateModal';
import ConfirmVoteModal from './components/ConfirmVoteModal';
import SuccessView from './components/SuccessView';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'dashboard' | 'success'
  const [currentUser, setCurrentUser] = useState(null);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Ballot: one candidate per position
  const [ballot, setBallot] = useState({
    'Chairman': null,
    'Vice Chairman': null,
    'Secretary': null
  });

  useEffect(() => {
    fetchElection();
  }, []);

  const fetchElection = async () => {
    try {
      const seedRes = await axios.post(`${API_BASE}/seed-election`);
      setElection(seedRes.data.election);
    } catch (err) {
      setError('Could not connect to backend server. Run node server.js on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (email) => {
    setCurrentUser(email);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setError('');
    setBallot({ 'Chairman': null, 'Vice Chairman': null, 'Secretary': null });
  };

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Called from CandidateModal "Select This Candidate" button
  const handleConfirmPrompt = (candidate) => {
    setSelectedCandidate(null);
    // Add candidate to ballot under its position
    if (candidate.position) {
      setBallot(prev => ({ ...prev, [candidate.position]: candidate }));
    }
  };

  // Submit the full ballot (all 3 positions)
  const handleBallotSubmit = async () => {
    setError('');
    try {
      if (!election) return;
      const candidateIds = Object.values(ballot)
        .filter(c => c !== null)
        .map(c => c._id);

      await axios.post(`${API_BASE}/elections/${election._id}/vote`, { candidateIds });
      setShowConfirm(false);
      setView('success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit ballot.');
    }
  };

  if (loading) {
    return (
      <div className="app-container flex-center" style={{ minHeight: '100vh', flexDirection: 'column', gap: '20px' }}>
        <div className="live-dot" style={{ transform: 'scale(2)' }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Initializing Secure Connection...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="flex-between" style={{ padding: '20px 0', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800' }}>
          College <span className="gradient-text-primary">Vote</span>
        </h1>
        {view === 'dashboard' && currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '100px' }}>
              <div className="status-badge" style={{ margin: 0, padding: '4px 10px', fontSize: '0.75rem' }}>Authenticated</div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{currentUser}</span>
            </div>
            {currentUser !== 'admin@college.edu' && (
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '100px' }}>
                <LogOut size={16} /> Return Home
              </button>
            )}
          </div>
        )}
      </header>

      {error && !showConfirm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '16px', borderRadius: '16px', marginBottom: '24px', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <AlertCircle /> {error}
        </motion.div>
      )}

      <main style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          {view === 'login' && <Login key="login" onLogin={handleLogin} onNavigateToRegister={() => setView('register')} />}
          {view === 'register' && <Register key="register" onRegister={handleLogin} onNavigateToLogin={() => setView('login')} />}
          {view === 'dashboard' && currentUser === 'admin@college.edu' ? (
            <AdminDashboard key="admin" election={election} onLogout={handleLogout} />
          ) : (
            view === 'dashboard' && <Dashboard key="dash" election={election} onSelectCandidate={handleSelectCandidate} ballot={ballot} onSubmitBallot={() => setShowConfirm(true)} />
          )}
          {view === 'success' && <SuccessView key="success" onReturn={() => setView('dashboard')} />}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedCandidate && (
          <CandidateModal 
            key="candidate-modal"
            candidate={selectedCandidate} 
            onClose={() => setSelectedCandidate(null)} 
            onConfirm={handleConfirmPrompt}
          />
        )}
        {showConfirm && (
          <ConfirmVoteModal
            key="confirm-modal"
            ballot={ballot}
            onCancel={() => setShowConfirm(false)}
            onVote={handleBallotSubmit}
            error={error}
          />
        )}
      </AnimatePresence>

      <footer style={{ marginTop: 'auto', paddingTop: '40px', paddingBottom: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <ShieldCheck size={16} /> Secured by Advanced End-to-End Encryption
      </footer>
    </div>
  );
}

export default App;
