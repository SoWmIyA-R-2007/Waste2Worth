import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Recycle, User, Building2, Shield, ArrowRight, Lock, Mail } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('ROLE_USER');
  const [email, setEmail] = useState('sowmiya@w2w.org');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'ROLE_USER') {
      setEmail('sowmiya@w2w.org');
    } else if (selectedRole === 'ROLE_RECYCLER') {
      setEmail('greencycle@w2w.org');
    } else if (selectedRole === 'ROLE_ADMIN') {
      setEmail('admin@waste2worth.gov.in');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fullName = 'Sowmiya R';
    if (role === 'ROLE_RECYCLER') fullName = 'GreenCycle Center';
    if (role === 'ROLE_ADMIN') fullName = 'Central Administrator';

    login({
      id: role === 'ROLE_USER' ? 'usr-101' : role === 'ROLE_RECYCLER' ? 'rec-201' : 'adm-301',
      fullName,
      email,
      role,
      ecoPoints: role === 'ROLE_USER' ? 1850 : 0,
      totalWasteKg: role === 'ROLE_USER' ? 28.4 : 0
    });

    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '40px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            marginBottom: '16px'
          }}>
            <Recycle color="#ffffff" size={32} />
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#0f172a' }}>
            Waste<span className="text-gradient">2Worth</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Sign in to access your recycling portal
          </p>
        </div>

        {/* Role Picker */}
        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
            Select Portal Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleRoleSelect('ROLE_USER')}
              style={{
                padding: '12px 8px',
                borderRadius: '12px',
                border: role === 'ROLE_USER' ? '2px solid #059669' : '1px solid #e2e8f0',
                background: role === 'ROLE_USER' ? '#ecfdf5' : '#ffffff',
                color: role === 'ROLE_USER' ? '#059669' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={18} />
              Citizen
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('ROLE_RECYCLER')}
              style={{
                padding: '12px 8px',
                borderRadius: '12px',
                border: role === 'ROLE_RECYCLER' ? '2px solid #0284c7' : '1px solid #e2e8f0',
                background: role === 'ROLE_RECYCLER' ? '#f0f9ff' : '#ffffff',
                color: role === 'ROLE_RECYCLER' ? '#0284c7' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Building2 size={18} />
              Recycler
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('ROLE_ADMIN')}
              style={{
                padding: '12px 8px',
                borderRadius: '12px',
                border: role === 'ROLE_ADMIN' ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                background: role === 'ROLE_ADMIN' ? '#f5f3ff' : '#ffffff',
                color: role === 'ROLE_ADMIN' ? '#7c3aed' : 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Shield size={18} />
              Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '14px' }}
          >
            Sign In to {role === 'ROLE_USER' ? 'Citizen' : role === 'ROLE_RECYCLER' ? 'Recycler' : 'Admin'} Portal
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{
          marginTop: '24px',
          padding: '12px',
          borderRadius: '10px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          💡 Quick test credentials are pre-filled for each role!
        </div>
      </div>
    </div>
  );
}
