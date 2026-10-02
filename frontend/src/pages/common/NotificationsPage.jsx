import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notificationApi } from '../../api/notificationApi';
import { useAuth } from '../../context/AuthContext';
import { Bell, CheckCircle2, ShieldAlert, Award, FileText, ArrowRight } from 'lucide-react';

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationApi.getUserNotifications(currentUser?.id || 'usr-101');
        setNotifications(data);
      } catch (err) {
        console.warn('API error, using demo notifications:', err);
        setNotifications([
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
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [currentUser]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
    } catch (e) {}
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAll = async () => {
    try {
      await notificationApi.markAllAsRead(currentUser?.id || 'usr-101');
    } catch (e) {}
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'CERTIFICATE_READY': return <FileText size={20} color="#059669" />;
      case 'REWARD_EARNED': return <Award size={20} color="#d97706" />;
      case 'SECURITY_ALERT': return <ShieldAlert size={20} color="#dc2626" />;
      default: return <Bell size={20} color="#0284c7" />;
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: 0 }}>Notifications</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Real-time status alerts, pickup updates, and reward notifications.
          </p>
        </div>

        <button
          onClick={handleMarkAll}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            color: '#475569',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Mark all as read
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <Bell size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
          <h3>No notifications yet</h3>
          <p style={{ color: 'var(--text-muted)' }}>You will receive alerts here when your requests progress.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkAsRead(n.id)}
              className="glass-panel"
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: n.read ? '#ffffff' : '#f0fdf4',
                border: n.read ? '1px solid #e2e8f0' : '1px solid #a7f3d0',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  padding: '10px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}>
                  {getIcon(n.type)}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', color: '#0f172a', margin: '0 0 4px 0', fontWeight: n.read ? 600 : 800 }}>
                    {n.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 6px 0' }}>
                    {n.message}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                  </span>
                </div>
              </div>

              {n.link && (
                <Link
                  to={n.link}
                  style={{
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  View <ArrowRight size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
