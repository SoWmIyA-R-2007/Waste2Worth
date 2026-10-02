import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ewasteApi } from '../../api/ewasteApi';
import { QRCodeSVG } from 'qrcode.react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Truck, 
  RotateCw, 
  FileText,
  AlertTriangle 
} from 'lucide-react';

const LIFECYCLE_STEPS = [
  { key: 'REQUESTED', label: 'Submitted & Verified' },
  { key: 'ASSIGNED', label: 'Recycler Assigned' },
  { key: 'SCHEDULED', label: 'Pickup Scheduled' },
  { key: 'COLLECTED', label: 'Collected from Doorstep' },
  { key: 'IN_TRANSIT', label: 'In Transit to Facility' },
  { key: 'RECEIVED', label: 'Received at Facility' },
  { key: 'PROCESSING', label: 'Decontamination & Sorting' },
  { key: 'RECYCLED', label: 'Materials Extracted' },
  { key: 'CERTIFIED', label: 'Certificate Issued' }
];

export default function TrackingPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await ewasteApi.getItem(id);
        setItem(data);
      } catch (err) {
        console.warn('API error, searching local storage:', err);
        const list = JSON.parse(localStorage.getItem('w2w_requests') || '[]');
        const found = list.find(x => x.id === id || x.wasteId === id);
        if (found) setItem(found);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '80px 0' }}>Loading tracking telemetry...</div>;
  }

  if (!item) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', padding: '0 20px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          <AlertTriangle size={48} color="#d97706" style={{ margin: '0 auto 16px' }} />
          <h2>Tracking Record Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>
            We could not find an electronic waste submission matching ID: <strong>{id}</strong>
          </p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex = LIFECYCLE_STEPS.findIndex(s => s.key === item.status);
  const effectiveIndex = currentStatusIndex !== -1 ? currentStatusIndex : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
      {/* Header Bar */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '6px',
              background: '#ecfdf5',
              color: '#059669',
              marginBottom: '6px'
            }}>
              TRACKING ID: {item.wasteId || id}
            </span>
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '0' }}>
              {item.brand} {item.model} ({item.category})
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Pickup Address: {item.pickupAddress || 'Customer Doorstep'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {item.status === 'CERTIFIED' && (
              <Link to={`/certificates`} className="btn-primary">
                <FileText size={16} />
                View Certificate
              </Link>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Timeline Column */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RotateCw size={20} color="#059669" />
            E-Waste Lifecycle Audit Trail
          </h2>

          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '11px',
              top: '8px',
              bottom: '24px',
              width: '2px',
              background: '#e2e8f0'
            }} />

            {LIFECYCLE_STEPS.map((step, idx) => {
              const isCompleted = idx <= effectiveIndex;
              const isCurrent = idx === effectiveIndex;

              return (
                <div key={step.key} style={{ position: 'relative', marginBottom: '28px' }}>
                  {/* Bullet */}
                  <div style={{
                    position: 'absolute',
                    left: '-32px',
                    top: '2px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: isCompleted ? '#059669' : '#ffffff',
                    border: isCompleted ? '2px solid #059669' : '2px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: isCurrent ? '0 0 0 4px rgba(16, 185, 129, 0.2)' : 'none'
                  }}>
                    {isCompleted && <CheckCircle2 size={14} color="#ffffff" />}
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: '0.95rem',
                      color: isCompleted ? '#0f172a' : '#94a3b8',
                      fontWeight: isCurrent ? 800 : 600,
                      marginBottom: '2px'
                    }}>
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                        ● CURRENT ACTIVE STAGE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QR & Security Info Column */}
        <div>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '16px' }}>
              Verification QR Code
            </h3>
            <div style={{
              background: '#ffffff',
              padding: '16px',
              borderRadius: '12px',
              display: 'inline-block',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}>
              <QRCodeSVG
                value={item.qrCodeData || `https://waste2worth.org/verify/${item.wasteId}`}
                size={180}
              />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
              Scan at collection & facility handover for chain-of-custody verification.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#059669" />
              Cryptographic Proof
            </h3>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Assigned Recycler</span>
              <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{item.matchedRecyclerName || 'GreenCycle EcoHub'}</strong>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Verified Weight</span>
              <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{item.weightKg} KG</strong>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>EcoPoints Earned</span>
              <strong style={{ fontSize: '0.9rem', color: '#d97706' }}>+{item.ecoPointsEarned || 50} pts</strong>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>SHA-256 Hash Proof</span>
              <div style={{
                background: '#f8fafc',
                padding: '8px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                wordBreak: 'break-all',
                color: '#475569',
                border: '1px solid #e2e8f0'
              }}>
                {item.sha256VerificationHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
