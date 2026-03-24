import React from 'react';
import { motion } from 'framer-motion';
import { X, PlayCircle, Award, Briefcase, ChevronRight } from 'lucide-react';

export default function CandidateModal({ candidate, onClose, onConfirm }) {
  if (!candidate) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
      >
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{candidate.name}</h2>
        <span className="gradient-text-primary" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Candidate Profile</span>

        <div className="mt-8 mb-8">
          <div style={{
            background: 'var(--bg-dark)',
            borderRadius: '16px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--card-border)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <PlayCircle size={48} color="var(--text-muted)" style={{ zIndex: 2, cursor: 'pointer' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 100%)', zIndex: 1 }} />
            <span style={{ position: 'absolute', bottom: '16px', left: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', zIndex: 2 }}>60s Pitch Video</span>
          </div>
        </div>

        <div className="mb-8">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <Award color="var(--primary)" size={24} />
            <h3 style={{ fontSize: '1.4rem' }}>Why Vote For Me?</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
               <ChevronRight color="var(--secondary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }}/>
               <span style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Commitment to transparent policies mapping directly to student needs.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
               <ChevronRight color="var(--secondary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
               <span style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Proven track record in organizing cross-departmental events.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
               <ChevronRight color="var(--secondary)" size={20} style={{ flexShrink: 0, marginTop: '2px' }}/>
               <span style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>Focus on actionable campus infrastructure improvements (library & Wi-Fi).</span>
            </li>
          </ul>
        </div>

        <div className="mb-8" style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
             <Briefcase color="var(--primary)" size={20} />
             <h4 style={{ margin: 0 }}>Full Bio</h4>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{candidate.bio}</p>
        </div>

        <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} onClick={() => onConfirm(candidate)}>
          Select This Candidate
        </button>
      </motion.div>
    </div>
  );
}
