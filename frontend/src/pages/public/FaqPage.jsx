import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'What electronic items are accepted on Waste2Worth?',
      a: 'We accept 21 standardized electronic categories including Laptops, Smartphones, Tablets, Desktop PCs, Monitors (LCD/LED & CRT), Solar Panels, Inverters, Refrigerators, Air Conditioners, Lithium Batteries, PCB Boards, and Small Household Appliances.'
    },
    {
      q: 'How are EcoPoints calculated for recycled devices?',
      a: 'EcoPoints are computed via a transparent deterministic formula: 10 points per kilogram of net weight plus 1 point for every 10 INR of assessed scrap valuation. Bonus multipliers apply to rare precious metal items.'
    },
    {
      q: 'Is doorstep pickup free of charge for citizens?',
      a: 'Yes! Standard doorstep e-waste collection is 100% free of charge for citizens. Our partner certified recyclers dispatch logistics vans based on route-optimized schedules.'
    },
    {
      q: 'How does cryptographic SHA-256 certificate verification work?',
      a: 'When an item finishes physical decontamination, a SHA-256 block hash is computed from the serial number, weight, facility ID, and the previous block hash. This mathematical hash is stored permanently on the ledger, making it impossible to alter or backdate records.'
    },
    {
      q: 'What happens to dangerous hazardous components like mercury and cadmium?',
      a: 'Hazardous fractions are separated in sealed negative-pressure decontamination chambers under CPCB guidelines. Toxic elements are chemically neutralized or stabilized in certified hazardous waste facilities rather than burned or dumped.'
    },
    {
      q: 'How does Waste2Worth comply with the DPDP Act 2023?',
      a: 'We practice strict data minimization. Device storage is certified digitally wiped or shredded, and personal address and phone data is encrypted and retained only for the duration of the logistics lifecycle.'
    }
  ];

  return (
    <div style={{ maxWidth: '840px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: '12px' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          Everything you need to know about e-waste disposal, valuations, and cryptographic compliance.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '48px' }}>
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                borderRadius: '14px',
                border: isOpen ? '1px solid #10b981' : '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.15s ease'
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isOpen ? '#f0fdf4' : '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0f172a' }}>
                  {f.q}
                </span>
                <ChevronDown
                  size={20}
                  color={isOpen ? '#059669' : '#94a3b8'}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                    marginLeft: '12px'
                  }}
                />
              </button>

              {isOpen && (
                <div style={{
                  padding: '0 24px 22px 24px',
                  background: '#f0fdf4',
                  color: '#475569',
                  fontSize: '0.92rem',
                  lineHeight: 1.65
                }}>
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="glass-panel" style={{ padding: '28px', textAlign: 'center', background: '#fafbfc' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', color: '#0f172a' }}>
          Have more questions?
        </h4>
        <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.88rem' }}>
          Our environmental compliance team is here to assist you with any questions.
        </p>
        <Link
          to="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#059669',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}
        >
          <span>Contact Support</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
