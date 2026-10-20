import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShieldCheck, Award, Users, Target, Globe2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      {/* Hero Section */}
      <div className="glass-panel" style={{
        padding: '56px 40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        marginBottom: '48px',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#059669',
          fontSize: '0.82rem',
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          <Recycle size={15} />
          <span>Circular Economy Engineering & E-Waste Lifecycle</span>
        </div>

        <h1 style={{ fontSize: '2.6rem', color: '#0f172a', marginBottom: '16px', lineHeight: 1.2 }}>
          Transforming Electronic Waste <br />
          <span style={{ color: '#059669' }}>Into Verifiable Circular Wealth</span>
        </h1>

        <p style={{
          maxWidth: '740px',
          margin: '0 auto 28px auto',
          fontSize: '1.05rem',
          color: '#475569',
          lineHeight: 1.7
        }}>
          Waste2Worth 2.0 is an automated end-to-end circular economy platform that bridges citizens, certified recycling facilities, and central regulators to ensure 100% of discarded electronics are safely decontaminated, documented, and diverted from landfills.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link
            to="/how-it-works"
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: '#059669',
              color: '#ffffff',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)'
            }}
          >
            Explore How It Works <ArrowRight size={16} />
          </Link>

          <Link
            to="/contact"
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            Contact Our Team
          </Link>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px'
          }}>
            <Target size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#0f172a' }}>Deterministic Valuation</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Eliminates black-market scrap opacity with rule-based base rates across 21 electronic categories and condition factors, rewarding citizens with instant EcoPoints.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#f0f9ff',
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px'
          }}>
            <Globe2 size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#0f172a' }}>Intelligent Matching & TSP Routing</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Haversine geospatial calculations pair items to the nearest capable facility, sequenced with greedy route optimization for reduced carbon fleet emissions.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: '#f5f3ff',
            color: '#7c3aed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px'
          }}>
            <ShieldCheck size={24} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#0f172a' }}>Cryptographic SHA-256 Proofs</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Every processed item produces an immutable, chained hash record and official downloadable PDF certificate that verifies zero toxic landfill contamination.
          </p>
        </div>
      </div>

      {/* College Project Context Banner */}
      <div className="glass-panel" style={{
        padding: '36px',
        background: '#fafbfc',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px' }}>
            Academic Research & Engineering Context
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Developed as part of Semester 3 Project Research on sustainable supply chains and circular informatics. Waste2Worth incorporates CPCB (Central Pollution Control Board) electronic waste mandates and the Digital Personal Data Protection (DPDP) Act 2023.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            to="/services"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none'
            }}
          >
            View Services
          </Link>
          <Link
            to="/faq"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: '#059669',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.88rem',
              textDecoration: 'none'
            }}
          >
            Read FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
