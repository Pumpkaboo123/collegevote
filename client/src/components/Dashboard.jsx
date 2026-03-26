import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';

export default function Dashboard({ election, onSelectCandidate, ballot, onSubmitBallot }) {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 30, seconds: 0 });

  useEffect(() => {
    // Fake countdown timer for visual effect
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else { hours = 23; days--; }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!election) return null;

  const positions = ['Chairman', 'Vice Chairman', 'Secretary'];
  const allPositionsFilled = positions.every(pos => ballot && ballot[pos] !== null);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      className="dashboard-container"
    >
      {/* Sticky Countdown Banner */}
      <div className="glass-panel" style={{ 
        position: 'sticky', top: '20px', zIndex: 100, 
        padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Clock color="var(--accent)" />
          <span style={{ fontWeight: '600' }}>Polls Close In:</span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <div className="status-badge mb-4"><div className="live-dot"></div> LIVE ELECTION</div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>{election.title}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}>{election.description}</p>
        
        <div className="mt-8">
          {positions.map(pos => {
            const posCandidates = election.candidates.filter(c => c.position === pos);
            if (posCandidates.length === 0) return null;

            return (
              <div key={pos} className="mb-12">
                <h3 style={{ 
                  fontSize: '1.8rem', 
                  marginBottom: '24px', 
                  borderBottom: '2px solid var(--primary)', 
                  display: 'inline-block',
                  paddingBottom: '8px',
                  color: 'var(--primary)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  {pos} Candidates
                </h3>
                <div className="candidates-grid">
                  {posCandidates.map((candidate) => {
                    const isSelected = ballot && ballot[pos]?._id === candidate._id;
                    return (
                      <motion.div 
                        key={candidate._id} 
                        className="candidate-card"
                        onClick={() => onSelectCandidate(candidate)}
                        whileHover={{ y: -5, boxShadow: isSelected ? '0 10px 30px rgba(52,211,153,0.3)' : '0 10px 30px rgba(99,102,241,0.2)' }}
                        whileTap={{ scale: 0.98 }}
                        style={{ border: isSelected ? '2px solid var(--success)' : '1px solid var(--card-border)' }}
                      >
                        <div style={{ 
                          padding: '16px', 
                          background: isSelected ? 'linear-gradient(45deg, rgba(52,211,153,0.05) 0%, rgba(52,211,153,0.1) 100%)' : 'linear-gradient(45deg, rgba(255,255,255,0.02) 0%, rgba(99,102,241,0.05) 100%)', 
                          borderRadius: '16px', 
                          marginBottom: '16px', 
                          display: 'flex', 
                          justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                          <User size={80} color={isSelected ? 'var(--success)' : 'var(--primary)'} />
                        </div>
                        <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-bright)' }}>{candidate.name}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', flex: 1, lineHeight: '1.5' }}>
                          {candidate.bio.length > 120 ? candidate.bio.substring(0, 120) + '...' : candidate.bio}
                        </p>
                        <button className="btn btn-outline" style={{ width: '100%', borderColor: isSelected ? 'var(--success)' : 'rgba(99,102,241,0.3)', color: isSelected ? 'var(--success)' : 'inherit' }}>
                          {isSelected ? 'Selected' : 'View Profile & Select'}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {allPositionsFilled && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '40px', padding: '24px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid var(--success)', borderRadius: '16px', textAlign: 'center' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--success)' }}>Your Ballot is Complete!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>You have selected a candidate for all positions. You can now securely submit your ballot.</p>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.2rem', width: '100%', maxWidth: '400px' }} onClick={onSubmitBallot}>
              Review & Submit Ballot
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
