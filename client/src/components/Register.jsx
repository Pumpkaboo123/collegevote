import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Shield, Users, Mail, Lock, AlertCircle, Hash, User } from 'lucide-react';

export default function Register({ onRegister, onNavigateToLogin }) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !studentId || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }
    // Specific College Registration No Validation
    const regNoRegex = /^XYZ-\d{4}$/i;
    if (!regNoRegex.test(studentId)) {
      setError('Invalid Registration No. Only XYZ College students are authorized (format: XYZ-1234).');
      return;
    }
    if (!email.endsWith('@college.edu')) {
      setError('You must register with a valid @college.edu email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // Simulate API registration delay
    setTimeout(() => {
      onRegister(email);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center', minHeight: '80vh' }}>
      
      {/* Informational Hero Section */}
      <motion.div 
        className="login-hero"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        style={{ flex: 1, paddingRight: '40px' }}
      >
        <span style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          background: 'rgba(16, 185, 129, 0.1)', 
          padding: '8px 16px', 
          borderRadius: '100px',
          color: 'var(--success)',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          <UserPlus size={16} /> New Registration
        </span>
        <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1' }}>
          Claim Your <br/><span className="gradient-text-primary">Right to Vote.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '24px', maxWidth: '400px', lineHeight: '1.6' }}>
          By creating an account, you ensure your voice is counted in all active and upcoming collegiate decisions securely.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <Hash color="var(--primary)" size={24} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>One Student, One Vote</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verified via Registration No</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Registration Form Section */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        style={{ width: '450px', padding: '40px', maxHeight: '85vh', overflowY: 'auto' }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Create Account</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Join the secure voting network.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  border: '1px solid var(--danger)', 
                  color: 'var(--danger)', 
                  padding: '12px 16px', 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.9rem'
                }}
              >
                <AlertCircle size={18} style={{ flexShrink: 0 }} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ position: 'relative' }}>
            <User size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="text" 
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus} onBlur={handleBlur}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Hash size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
              <input 
                type="text" 
                placeholder="Registration No (e.g. XYZ-1234)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus} onBlur={handleBlur}
              />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="email" 
              placeholder="College Email (@college.edu)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus} onBlur={handleBlur}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="password" 
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus} onBlur={handleBlur}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="password" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus} onBlur={handleBlur}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '12px' }}>
            <UserPlus size={20} /> Register & Proceed
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
             <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
             <button type="button" onClick={onNavigateToLogin} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
               Sign In Here
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Reusable styling for form inputs
const inputStyle = {
  width: '100%',
  padding: '16px 16px 16px 48px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--card-border)',
  borderRadius: '14px',
  color: 'var(--text-main)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const handleFocus = (e) => e.target.style.borderColor = 'var(--primary)';
const handleBlur = (e) => e.target.style.borderColor = 'var(--card-border)';
