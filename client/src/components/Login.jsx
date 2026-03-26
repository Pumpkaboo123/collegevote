import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Shield, Users, Mail, Lock, AlertCircle, Hash } from 'lucide-react';

export default function Login({ onLogin, onNavigateToRegister }) {
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!regNo || !email || !password) {
      setError('Please provide your Registration No, email, and password.');
      return;
    }
    // Specific College Registration No Validation
    const regNoRegex = /^XYZ-\d{4}$/i;
    // Admin bypass for demo purposes
    if (email !== 'admin@college.edu' && !regNoRegex.test(regNo)) {
      setError('Invalid Registration No. Only XYZ College students are authorized (format: XYZ-1234).');
      return;
    }
    if (!email.endsWith('@college.edu')) {
      setError('Must use a valid @college.edu email address.');
      return;
    }
    setError('');
    // Simulate API delay
    setTimeout(() => {
      onLogin(email);
    }, 600);
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
          background: 'rgba(99, 102, 241, 0.1)', 
          padding: '8px 16px', 
          borderRadius: '100px',
          color: 'var(--primary)',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          <Shield size={16} /> Secure Portal
        </span>
        <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1' }}>
          Your Voice,<br/><span className="gradient-text-primary">Amplified.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '24px', maxWidth: '400px', lineHeight: '1.6' }}>
          Participate in the upcoming student body elections through our secure, one-student-one-vote platform.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <Shield color="var(--primary)" size={24} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Tamper-Proof Voting</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>End-to-end encryption</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '12px' }}>
              <Users color="var(--success)" size={24} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Real-time Turnout</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Live department stats</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Login Form Section */}
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        style={{ width: '450px', padding: '40px' }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Student Login</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Enter your college credentials to access the ballot.</p>

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
            <Hash size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="text" 
              placeholder="Registration No (e.g. XYZ-1234)"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--card-border)',
                borderRadius: '14px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                marginBottom: '20px'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="email" 
              placeholder="e.g. jdoe@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--card-border)',
                borderRadius: '14px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '16px', left: '16px' }} />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--card-border)',
                borderRadius: '14px',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '12px' }}>
            <LogIn size={20} /> Sign In Securely
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
             <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
             <button type="button" onClick={onNavigateToRegister} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
               Sign Up Here
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
