import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, MapPin, QrCode, Award, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Instant Valuation & Registration',
      desc: 'Select from 21 equipment categories (laptop, smartphone, CRT, solar panels, etc.), enter the estimated weight, and choose condition to calculate your deterministic EcoPoints value.',
      icon: Calculator,
      color: '#059669',
      bg: '#ecfdf5'
    },
    {
      num: '02',
      title: 'Intelligent Recycler Matching',
      desc: 'Our 4-factor multi-criteria algorithm calculates Haversine distance, facility processing capacity, accepted categories, and efficiency ratings to dispatch the optimal local processing hub.',
      icon: MapPin,
      color: '#0284c7',
      bg: '#f0f9ff'
    },
    {
      num: '03',
      title: 'Doorstep Handover & QR Handshake',
      desc: 'A certified green logistics driver arrives at your doorstep. Both parties scan the cryptographic tracking QR code to execute an authenticated digital chain-of-custody transfer.',
      icon: QrCode,
      color: '#7c3aed',
      bg: '#f5f3ff'
    },
    {
      num: '04',
      title: 'Decontamination & SHA-256 Certificate',
      desc: 'Upon facility intake and certified material recovery, you receive instant EcoPoints in your ledger and an official SHA-256 tamper-evident PDF recycling certificate.',
      icon: Award,
      color: '#d97706',
      bg: '#fffbeb'
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '14px' }}>
          How Waste2Worth Works
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          A seamless 4-step circular workflow connecting conscientious citizens directly to certified recycling infrastructure with cryptographic trust.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '56px' }}>
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-panel" style={{
              padding: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '28px',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#e2e8f0',
                width: '60px',
                flexShrink: 0
              }}>
                {s.num}
              </div>

              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: s.bg,
                color: s.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={28} />
              </div>

              <div style={{ flex: 1, minWidth: '260px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-panel" style={{
        padding: '36px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: '#ffffff'
      }}>
        <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '12px' }}>
          Ready to recycle your old electronics?
        </h2>
        <p style={{ color: '#d1fae5', maxWidth: '560px', margin: '0 auto 24px auto', fontSize: '0.95rem' }}>
          Get an instant algorithmic valuation in 30 seconds and schedule a doorstep collection today.
        </p>
        <Link
          to="/submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            borderRadius: '10px',
            background: '#ffffff',
            color: '#047857',
            fontWeight: 800,
            textDecoration: 'none',
            fontSize: '0.92rem'
          }}
        >
          Start E-Waste Valuation <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
