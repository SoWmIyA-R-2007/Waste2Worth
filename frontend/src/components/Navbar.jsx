import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Recycle, Bell, Shield, User, LogOut, ArrowRightLeft, Building2 } from 'lucide-react';

export default function Navbar() {
  const { currentUser, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
        }}>
          <Recycle color="#ffffff" size={24} />
        </div>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
            Waste<span className="text-gradient">2Worth</span>
          </span>
          <span style={{
            display: 'block',
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--text-muted)'
          }}>
            Circular Economy 2.0
          </span>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {currentUser?.role === 'ROLE_USER' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#059669',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <span>✨</span>
            <span>{currentUser?.ecoPoints || 0} EcoPoints</span>
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-md)',
          background: '#f1f5f9',
          border: '1px solid #e2e8f0'
        }}>
          {currentUser?.role === 'ROLE_ADMIN' ? (
            <Shield size={16} color="#7c3aed" />
          ) : currentUser?.role === 'ROLE_RECYCLER' ? (
            <Building2 size={16} color="#0284c7" />
          ) : (
            <User size={16} color="#059669" />
          )}
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
            {currentUser?.fullName}
          </span>
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '6px',
            background: currentUser?.role === 'ROLE_ADMIN' ? '#f5f3ff' : currentUser?.role === 'ROLE_RECYCLER' ? '#f0f9ff' : '#ecfdf5',
            color: currentUser?.role === 'ROLE_ADMIN' ? '#7c3aed' : currentUser?.role === 'ROLE_RECYCLER' ? '#0284c7' : '#059669',
            fontWeight: 700
          }}>
            {currentUser?.role === 'ROLE_ADMIN' ? 'ADMIN' : currentUser?.role === 'ROLE_RECYCLER' ? 'RECYCLER' : 'CITIZEN'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          title="Sign Out"
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
