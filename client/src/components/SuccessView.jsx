import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, Share2, LayoutDashboard } from 'lucide-react';

export default function SuccessView({ onReturn }) {
  useEffect(() => {
    // Fire confetti immediately on mount
    const makeConfetti = () => {
      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6366f1', '#10b981', '#f43f5e']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6366f1', '#10b981', '#f43f5e']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    };

    makeConfetti();
  }, []);

  return (
    <motion.div 
      className="success-container flex-center glass-panel"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        maxWidth: '700px',
        margin: '10vh auto',
        padding: '60px 40px',
        textAlign: 'center',
        flexDirection: 'column'
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        style={{ marginBottom: '32px' }}
      >
        <CheckCircle size={100} color="var(--success)" />
      </motion.div>

      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '16px' }}>Vote Confirmed!</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '40px' }}>
        Your encrypted ballot has been securely submitted to the ledger.
      </p>

      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        padding: '24px',
        borderRadius: '24px',
        maxWidth: '400px',
        margin: '0 auto 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>"I Voted"</span>
        <span style={{ color: 'var(--text-muted)' }}>Share your digital sticker</span>
        <button className="btn btn-outline" style={{ marginTop: '12px', padding: '10px 20px', borderRadius: '100px' }}>
          <Share2 size={18} /> Share to Socials
        </button>
      </div>

      <button className="btn btn-primary" onClick={onReturn}>
        <LayoutDashboard size={20} />
        Return to Dashboard
      </button>

    </motion.div>
  );
}
