import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';

export default function Dashboard({ election, onSelectCandidate }) {
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
          <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '12px' }}>Candidates</h3>
          <div className="candidates-grid">
            {election.candidates.map((candidate) => (
              <motion.div 
                key={candidate._id} 
                className="candidate-card"
                onClick={() => onSelectCandidate(candidate)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  <User size={80} color="var(--primary)" />
                </div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{candidate.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px', flex: 1 }}>
                  {candidate.bio.length > 100 ? candidate.bio.substring(0, 100) + '...' : candidate.bio}
                </p>
                <button className="btn btn-outline" style={{ width: '100%' }}>View Profile & Vote</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
