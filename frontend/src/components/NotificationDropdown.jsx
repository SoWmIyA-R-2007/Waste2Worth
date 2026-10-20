import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  FileText, 
  Award, 
  Truck, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export default function NotificationDropdown({
  isOpen,
  onClose,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  loading
}) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'CERTIFICATE_READY':
        return (
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={17} />
          </div>
        );
      case 'REWARD_EARNED':
        return (
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: '#fffbeb',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={17} />
          </div>
        );
      case 'PICKUP_SCHEDULED':
      case 'PICKUP_COMPLETED':
        return (
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: '#f0f9ff',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Truck size={17} />
          </div>
        );
      case 'SECURITY_ALERT':
        return (
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: '#fef2f2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={17} />
          </div>
        );
      default:
        return (
          <div style={{
            padding: '8px',
            borderRadius: '10px',
            background: '#f1f5f9',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={17} />
          </div>
        );
    }
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const handleItemClick = (n) => {
    if (!n.read) {
      onMarkAsRead(n.id);
    }
    onClose();
    if (n.link) {
      navigate(n.link);
    }
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        right: 0,
        width: '380px',
        maxWidth: '92vw',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        overflow: 'hidden',
        zIndex: 1000,
        animation: 'popIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
            Notifications
          </h4>
          {unreadCount > 0 && (
            <span style={{
              background: '#ecfdf5',
              color: '#059669',
              border: '1px solid #a7f3d0',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '999px'
            }}>
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              background: 'transparent',
              color: '#059669',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: '6px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            title="Mark all notifications as read"
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div style={{
        maxHeight: '340px',
        overflowY: 'auto',
        scrollbarWidth: 'thin'
      }}>
        {loading ? (
          <div style={{
            padding: '36px 20px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '0.85rem'
          }}>
            Loading alerts...
          </div>
        ) : notifications.length === 0 ? (
          <div style={{
            padding: '40px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8'
            }}>
              <Bell size={22} />
            </div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
              All caught up!
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
              No new alerts or status updates at this moment.
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px 18px',
                borderBottom: '1px solid #f8fafc',
                cursor: 'pointer',
                background: n.read ? '#ffffff' : '#f0fdf4',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = n.read ? '#f8fafc' : '#e6f9ed'}
              onMouseLeave={(e) => e.currentTarget.style.background = n.read ? '#ffffff' : '#f0fdf4'}
            >
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {getIcon(n.type)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.84rem',
                    fontWeight: n.read ? 600 : 700,
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {n.title}
                  </span>
                  {!n.read && (
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#10b981',
                      flexShrink: 0
                    }} />
                  )}
                </div>

                <p style={{
                  margin: '3px 0 6px 0',
                  fontSize: '0.78rem',
                  color: '#475569',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {n.message}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {formatTime(n.createdAt)}
                  </span>
                  {n.link && (
                    <span style={{
                      fontSize: '0.72rem',
                      color: '#059669',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      View <ArrowRight size={11} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 18px',
        borderTop: '1px solid #f1f5f9',
        background: '#fafbfc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => {
            onClose();
            navigate('/notifications');
          }}
          style={{
            border: 'none',
            background: 'transparent',
            color: '#059669',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            borderRadius: '6px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#047857'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#059669'}
        >
          <span>View all notifications</span>
          <ExternalLink size={13} />
        </button>
      </div>
    </div>
  );
}
