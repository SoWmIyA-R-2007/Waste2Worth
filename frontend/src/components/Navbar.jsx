import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationApi } from '../api/notificationApi';
import NotificationDropdown from './NotificationDropdown';
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
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoadingNotifications(true);
    try {
      const data = await notificationApi.getUserNotifications(currentUser?.id || 'usr-101');
      if (Array.isArray(data)) {
        setNotifications(data);
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      // Demo notifications fallback if backend is offline
      const demoNotifications = [
        {
          id: 'n1',
          type: 'CERTIFICATE_READY',
          title: 'Recycling Certificate Ready',
          message: 'Your official certificate W2W-CERT-489201 has been issued with SHA-256 integrity verification.',
          link: '/certificates',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 'n2',
          type: 'REWARD_EARNED',
          title: 'EcoPoints Earned! +140 pts',
          message: 'Points credited to your account for recycling Dell Latitude 7490.',
          link: '/rewards',
          read: true,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'n3',
          type: 'PICKUP_SCHEDULED',
          title: 'Pickup Confirmed',
          message: 'GreenCycle EcoHub logistics team has scheduled your e-waste collection for tomorrow.',
          link: '/requests',
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setNotifications(demoNotifications);
      setUnreadCount(demoNotifications.filter(n => !n.read).length);
    } finally {
      setLoadingNotifications(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications, location]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
    } catch (e) {}
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead(currentUser?.id || 'usr-101');
    } catch (e) {}
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const toggleNotifications = () => {
    if (!isNotificationOpen) {
      loadNotifications();
    }
    setIsNotificationOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{
      maxWidth: '1280px',
      margin: '16px auto 0 auto',
      padding: '0 20px',
      position: 'sticky',
      top: '12px',
      zIndex: 100
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(12px)',
        gap: '16px'
      }}>
        {/* Brand Logo - Left */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}>
            <Recycle color="#ffffff" size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a', lineHeight: 1.1 }}>
              Waste<span className="text-gradient">2Worth</span>
            </div>
            <span style={{
              display: 'block',
              fontSize: '0.62rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)'
            }}>
              Circular Economy 2.0
            </span>
          </div>
        </Link>

        {/* Nav Links based on Role - Center Pill Group */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          background: '#f8fafc',
          padding: '4px 6px',
          borderRadius: '12px',
          border: '1px solid #f1f5f9'
        }}>
          {currentUser?.role === 'ROLE_USER' && (
            <>
              {[
                { to: '/', label: 'Dashboard' },
                { to: '/submit', label: 'Submit E-Waste' },
                { to: '/certificates', label: 'Certificates' },
                { to: '/rewards', label: 'Leaderboard' }
              ].map(item => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#059669' : '#64748b',
                      background: isActive ? '#ffffff' : 'transparent',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}

          {currentUser?.role === 'ROLE_RECYCLER' && (
            <>
              {[
                { to: '/', label: 'Operations' },
                { to: '/processing', label: 'Decontamination' }
              ].map(item => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#0284c7' : '#64748b',
                      background: isActive ? '#ffffff' : 'transparent',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}

          {currentUser?.role === 'ROLE_ADMIN' && (
            <Link
              to="/"
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#7c3aed',
                background: '#ffffff',
                padding: '7px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            >
              Command Center
            </Link>
          )}
        </div>

        {/* Right Badges & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Notifications Icon with Pop-up Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={toggleNotifications}
              title="Notifications"
              aria-label="Notifications"
              style={{
                position: 'relative',
                padding: '8px',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: isNotificationOpen ? '#ecfdf5' : '#f8fafc',
                border: isNotificationOpen ? '1px solid #10b981' : '1px solid #e2e8f0',
                color: isNotificationOpen ? '#059669' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <NotificationDropdown
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
              notifications={notifications}
              unreadCount={unreadCount}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              loading={loadingNotifications}
            />
          </div>

          {/* User Profile Pill */}
          <Link
            to="/profile"
            title="View & Edit Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '38px',
              padding: '0 12px',
              borderRadius: '10px',
              background: location.pathname === '/profile' ? '#ecfdf5' : '#f8fafc',
              border: location.pathname === '/profile' ? '1px solid #10b981' : '1px solid #e2e8f0',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
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
              fontSize: '0.68rem',
              padding: '2px 7px',
              borderRadius: '6px',
              background: currentUser?.role === 'ROLE_ADMIN' ? '#f5f3ff' : currentUser?.role === 'ROLE_RECYCLER' ? '#f0f9ff' : '#ecfdf5',
              color: currentUser?.role === 'ROLE_ADMIN' ? '#7c3aed' : currentUser?.role === 'ROLE_RECYCLER' ? '#0284c7' : '#059669',
              fontWeight: 700
            }}>
              {currentUser?.role === 'ROLE_ADMIN' ? 'ADMIN' : currentUser?.role === 'ROLE_RECYCLER' ? 'RECYCLER' : 'CITIZEN'}
            </span>
          </Link>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              height: '38px',
              padding: '0 12px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.15s ease'
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
