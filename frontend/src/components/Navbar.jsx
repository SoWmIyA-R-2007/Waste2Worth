import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Bell, Shield, User, LogOut, ArrowRightLeft } from 'lucide-react';

export default function Navbar() {
  const { currentUser, switchRole } = useAuth();
  const location = useLocation();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
        }}>
          <Recycle color="#ffffff" size={24} />
        </div>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
            Waste<span className="text-gradient">2Worth</span>
          </span>
          <span style={{
            display: 'block',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)'
          }}>
            Circular Economy 2.0
          </span>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Role switcher for easy viva testing */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-glass)'
        }}>
          <ArrowRightLeft size={14} color="var(--primary-400)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Role:</span>
          <select
            value={currentUser?.role || 'ROLE_USER'}
            onChange={(e) => switchRole(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#34d399',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="ROLE_USER" style={{ background: '#0f172a' }}>👤 User</option>
            <option value="ROLE_RECYCLER" style={{ background: '#0f172a' }}>🏢 Recycler</option>
            <option value="ROLE_ADMIN" style={{ background: '#0f172a' }}>⚡ Admin</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            color: '#34d399',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <span>✨</span>
            <span>{currentUser?.ecoPoints || 0} Points</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.05)'
          }}>
            <User size={16} color="var(--text-secondary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{currentUser?.fullName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
