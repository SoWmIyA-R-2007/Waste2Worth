import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationApi } from '../api/notificationApi';
import { 
  Recycle, 
  Bell, 
  Shield, 
  User, 
  LogOut, 
  Building2, 
  Award, 
  FileText, 
  Layers, 
  PlusCircle, 
  RotateCw 
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (currentUser?.id) {
      notificationApi.getUnreadCount(currentUser.id)
        .then(res => setUnreadCount(res.unreadCount || 0))
        .catch(() => setUnreadCount(1));
    }
  }, [currentUser, location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      maxWidth: '1240px',
      margin: '16px auto 0 auto',
      padding: '0 24px',
      position: 'sticky',
      top: '12px',
      zIndex: 100
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <Recycle color="#ffffff" size={22} />
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

        {/* Nav Links based on Role */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {currentUser?.role === 'ROLE_USER' && (
            <>
              <Link
                to="/"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: location.pathname === '/' ? '#059669' : '#475569',
                  textDecoration: 'none'
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/submit"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: location.pathname === '/submit' ? '#059669' : '#475569',
                  textDecoration: 'none'
                }}
              >
                Submit E-Waste
              </Link>
              <Link
                to="/certificates"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: location.pathname === '/certificates' ? '#059669' : '#475569',
                  textDecoration: 'none'
                }}
              >
                Certificates
              </Link>
              <Link
                to="/rewards"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: location.pathname === '/rewards' ? '#059669' : '#475569',
                  textDecoration: 'none'
                }}
              >
                Leaderboard
              </Link>
            </>
          )}

          {currentUser?.role === 'ROLE_RECYCLER' && (
            <>
              <Link
                to="/"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: location.pathname === '/' ? '#059669' : '#475569',
                  textDecoration: 'none'
                }}
              >
                Operations
              </Link>
              <Link
                to="/processing"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: location.pathname === '/processing' ? '#059669' : '#475569',
                  textDecoration: 'none'
                }}
              >
                Decontamination
              </Link>
            </>
          )}

          {currentUser?.role === 'ROLE_ADMIN' && (
            <Link
              to="/"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: location.pathname === '/' ? '#7c3aed' : '#475569',
                textDecoration: 'none'
              }}
            >
              Command Center
            </Link>
          )}
        </div>

        {/* Right Badges & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Notifications Icon with Badge */}
          <Link
            to="/notifications"
            title="Notifications"
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none'
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '1px 5px',
                borderRadius: '10px',
                lineHeight: 1
              }}>
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User Profile Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
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

          {/* Sign Out Button */}
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
    </header>
  );
}
