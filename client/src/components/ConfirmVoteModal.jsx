import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmVoteModal({ candidate, onCancel, onVote, error }) {
  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{ maxWidth: '450px', textAlign: 'center' }}
      >
        <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', marginBottom: '24px' }}>
          <AlertTriangle size={40} color="var(--danger)" />
        </div>
        
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Confirm Your Vote</h2>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px', lineHeight: '1.5' }}>
          You are about to cast your vote for <strong style={{color: 'white'}}>{candidate?.name}</strong>.
          <br /><br />
          This action is final and secured onto the immutable ledger. It cannot be undone.
        </p>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '12px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onCancel}>
            Cancel
          </button>
          <button 
            className="btn" 
            style={{ flex: 1, background: 'var(--danger)', color: 'white' }} 
            onClick={() => onVote(candidate._id)}
          >
            Confirm Vote
          </button>
        </div>
      </motion.div>
    </div>
  );
}
