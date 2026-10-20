import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Calculator, ShieldCheck, Sparkles, FileText, ArrowRight, Layers, Cpu } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      color: '#0284c7',
      bg: '#f0f9ff',
      title: 'Doorstep E-Waste Collection',
      desc: 'Scheduled on-demand pickup from homes, colleges, and commercial offices with GPS-routed green logistics and digital QR chain of custody.',
      badge: 'Zero Citizen Friction'
    },
    {
      icon: Calculator,
      color: '#059669',
      bg: '#ecfdf5',
      title: 'Deterministic Valuation Engine',
      desc: 'Transparent fair-value calculation across 21 electronics categories, multiplying base rates with physical condition factors to yield instantaneous cash/EcoPoints.',
      badge: '100% Algorithmic Pricing'
    },
    {
      icon: Cpu,
      color: '#7c3aed',
      bg: '#f5f3ff',
      title: 'Certified Decontamination & Dismantling',
      desc: 'Environmentally safe neutralization of lead, mercury, lithium cells, and brominated flame retardants by authorized processing hubs.',
      badge: 'CPCB ISO-14001 Standards'
    },
    {
      icon: Sparkles,
      color: '#d97706',
      bg: '#fffbeb',
      title: 'Precious Metal Recovery & Urban Mining',
      desc: 'Extraction and refining of secondary raw materials including high-grade copper, structural aluminum, gold, and palladium for remanufacturing.',
      badge: 'Circular Resource Return'
    },
    {
      icon: FileText,
      color: '#059669',
      bg: '#ecfdf5',
      title: 'Tamper-Evident SHA-256 Certificates',
      desc: 'Digital proof of recycling with mathematical hash chaining and downloadable official compliance PDFs for personal ESG records.',
      badge: 'Cryptographic Assurance'
    },
    {
      icon: Layers,
      color: '#475569',
      bg: '#f8fafc',
      title: 'Enterprise & Institutional E-Waste Audits',
      desc: 'End-to-end bulk IT asset disposition (ITAD) tracking for educational institutions and tech enterprises with audit-ready documentation.',
      badge: 'Compliance & ITAD'
    }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: '12px' }}>
          Our Circular Economy Services
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
          End-to-end management spanning intelligent logistics, certified decontamination, precious material recovery, and cryptographic audit proofs.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: s.bg,
                    color: s.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} />
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '999px',
                    background: '#f1f5f9',
                    color: '#475569'
                  }}>
                    {s.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px' }}>{s.desc}</p>
              </div>

              <Link
                to="/submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#059669',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none'
                }}
              >
                <span>Initiate Request</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
