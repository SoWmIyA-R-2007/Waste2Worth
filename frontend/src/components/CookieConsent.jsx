import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('w2w_cookie_consent');
    if (!consent) {
      // Delay display slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type) => {
    localStorage.setItem('w2w_cookie_consent', type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      maxWidth: '460px',
      background: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      padding: '20px 24px',
      boxShadow: '0 20px 40px -8px rgba(15, 23, 42, 0.15)',
      zIndex: 9999,
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
        <div style={{
          padding: '8px',
          borderRadius: '10px',
          background: '#ecfdf5',
          color: '#059669',
          flexShrink: 0
        }}>
          <Cookie size={20} />
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
            Privacy & Cookie Preferences
          </h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
            Waste2Worth uses essential local tokens for authentication, tamper-evident SHA-256 certificate verification, and minimal performance telemetry under the DPDP Act 2023.
          </p>
        </div>

        <button
          onClick={() => handleAccept('dismiss')}
          aria-label="Close banner"
          style={{
            border: 'none',
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '2px'
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
        <Link
          to="/cookie-policy"
          style={{
            fontSize: '0.78rem',
            color: '#059669',
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          Cookie Policy details →
        </Link>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleAccept('essential')}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#475569',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Essential Only
          </button>

          <button
            onClick={() => handleAccept('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: '#059669',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
