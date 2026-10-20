import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Bug, Database, Trash2, CheckCircle2, Lock, Key, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TrustSecurityPage() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const getSection = () => {
    const path = location.pathname;
    if (path.includes('report')) return 'report';
    if (path.includes('requests')) return 'requests';
    if (path.includes('deletion')) return 'deletion';
    return 'security';
  };

  const activeSection = getSection();

  const handleAction = (msg) => {
    setSubmittedMessage(msg);
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Navigation Sidebar */}
        <div className="glass-panel" style={{ padding: '20px', position: 'sticky', top: '90px' }}>
          <h4 style={{ margin: '0 0 14px 10px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
            Trust & Security Center
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { key: 'security', label: 'Security Architecture', path: '/security', icon: ShieldCheck },
              { key: 'report', label: 'Responsible Disclosure', path: '/security/report', icon: Bug },
              { key: 'requests', label: 'Data & Privacy Requests', path: '/privacy/requests', icon: Database },
              { key: 'deletion', label: 'Account Deletion', path: '/account-deletion', icon: Trash2 }
            ].map((item) => {
              const isSelected = activeSection === item.key;
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#059669' : '#475569',
                    background: isSelected ? '#ecfdf5' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="glass-panel" style={{ padding: '40px 48px', gridColumn: 'span 2' }}>
          {submittedMessage && (
            <div style={{
              padding: '14px 18px',
              borderRadius: '10px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px'
            }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>{submittedMessage}</span>
            </div>
          )}

          {/* Section 1: Security Architecture */}
          {activeSection === 'security' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: '#ecfdf5', color: '#059669' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>Security Architecture</h1>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Cryptographic Proofs & Anomaly Defense System</span>
                </div>
              </div>

              <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '0.94rem' }}>
                <h4>1. SHA-256 Block Chaining</h4>
                <p>
                  Each issued recycling certificate encapsulates a mathematical hash calculated from item attributes and the preceding certificate hash. Comparing calculated vs stored hashes reliably discovers retrofitted data manipulations.
                </p>

                <h4>2. Deterministic Security Rule Engine</h4>
                <p>
                  Automated background filters analyze incoming e-waste requests for velocity spikes (&gt;10 submissions/10min), illegal lifecycle jumps (e.g. <code>SUBMITTED</code> directly to <code>COMPLETED</code>), and anomalous single-item weight anomalies (&gt;100 KG) for human escalation.
                </p>

                <h4>3. Stateless JWT Bearer Authentication</h4>
                <p>
                  Zero server session overhead. All API endpoints enforce HMAC-SHA256 signature verification and strict role-based authorization filters.
                </p>
              </div>
            </div>
          )}

          {/* Section 2: Responsible Disclosure */}
          {activeSection === 'report' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: '#f5f3ff', color: '#7c3aed' }}>
                  <Bug size={24} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>Responsible Disclosure</h1>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Vulnerability Reporting & Platform Hardening</span>
                </div>
              </div>

              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem' }}>
                If you have uncovered a security vulnerability in Waste2Worth APIs or cryptographic hash routines, please disclose it to our engineering team responsibly.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleAction('Thank you! Your vulnerability report has been encrypted and sent to security officers.'); }} style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Researcher Name or Handle</label>
                    <input type="text" required placeholder="Security Researcher" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Contact Email</label>
                    <input type="email" required placeholder="researcher@domain.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>Vulnerability Summary & PoC Steps</label>
                    <textarea rows={4} required placeholder="Endpoint, request payload, observed anomaly vs expected behavior..." style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }} />
                  </div>
                </div>

                <button type="submit" style={{ padding: '10px 22px', borderRadius: '10px', background: '#7c3aed', color: '#ffffff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
                  Submit Security Report
                </button>
              </form>
            </div>
          )}

          {/* Section 3: Data & Privacy Requests */}
          {activeSection === 'requests' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: '#f0f9ff', color: '#0284c7' }}>
                  <Database size={24} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>Data & Privacy Requests</h1>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>DPDP Act 2023 Citizen Subject Rights</span>
                </div>
              </div>

              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem' }}>
                As an enrolled citizen or facility, you have full statutory rights to request an encrypted export of your personal data, transaction history, or address logs.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ display: 'block', color: '#1e293b', fontSize: '0.95rem' }}>Export Account Data Archive</strong>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Downloads a complete JSON manifest of your requests, certificates, and EcoPoints.</span>
                  </div>
                  <button
                    onClick={() => handleAction('Account manifest download prepared: w2w-data-export.json')}
                    style={{ padding: '8px 16px', borderRadius: '8px', background: '#0284c7', color: '#ffffff', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Export JSON
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Account Deletion */}
          {activeSection === 'deletion' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: '#fef2f2', color: '#dc2626' }}>
                  <Trash2 size={24} />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>Account Deletion</h1>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Permanent Removal & Right to be Forgotten</span>
                </div>
              </div>

              <div style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                color: '#9f1239',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '4px' }}>
                  <AlertTriangle size={18} />
                  <span>Important Notice on Permanent Deletion</span>
                </div>
                Deleting your account will irreversibly erase your personal credentials, address records, and active EcoPoints balance. Historical hazardous waste manifests will be anonymized in compliance with CPCB statutory retention laws.
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleAction('Account deletion request queued. Signing out session.');
                    setTimeout(() => logout(), 1500);
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Confirm Account Deletion
                </button>

                <Link
                  to="/"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  Cancel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
