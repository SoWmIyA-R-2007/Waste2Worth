import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Cookie, RotateCcw, Eye, AlertCircle } from 'lucide-react';

export default function LegalPolicyPage() {
  const location = useLocation();

  // Determine active policy from URL path
  const getActiveKey = () => {
    const path = location.pathname;
    if (path.includes('terms')) return 'terms';
    if (path.includes('cookie')) return 'cookie';
    if (path.includes('refund')) return 'refund';
    if (path.includes('accessibility')) return 'accessibility';
    if (path.includes('disclaimer')) return 'disclaimer';
    return 'privacy';
  };

  const activeKey = getActiveKey();

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Digital Personal Data Protection (DPDP) Act 2023 Compliance',
      lastUpdated: 'October 2026',
      icon: ShieldCheck,
      content: (
        <div>
          <h4>1. Principles of Data Collection & Minimization</h4>
          <p>
            Waste2Worth 2.0 collects only the minimal data required to execute e-waste collection, deterministic valuation, and certificate issuance. We do not sell, rent, or monetize personal identifiable information.
          </p>

          <h4>2. Storage Devices & Data Destruction</h4>
          <p>
            Any discarded computers, smartphones, solid-state drives, or memory modules submitted to certified recyclers are subject to physical degaussing or mechanical cross-cut shredding under strict industrial chain-of-custody protocols before material reclamation.
          </p>

          <h4>3. Logistics Coordinates & Contact Records</h4>
          <p>
            Geographical pickup coordinates and phone numbers provided by citizens are shared exclusively with the single matched recycling logistics vehicle for the duration of the active pickup appointment.
          </p>

          <h4>4. Rights Under the DPDP Act</h4>
          <p>
            Citizens retain the right to access, rectify, or demand the deletion of non-regulatory historical account records via our Data Requests portal. Regulatory hazardous material tracking manifests are preserved in compliance with CPCB statutory retention requirements.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      subtitle: 'Platform Usage Agreement & Circular Material Dispositions',
      lastUpdated: 'October 2026',
      icon: FileText,
      content: (
        <div>
          <h4>1. Ownership & Legitimate Disposition</h4>
          <p>
            By submitting electronic equipment for recycling, you certify under penalty of law that you are the lawful owner or authorized custodian of the designated assets and that items are unencumbered by liens or law-enforcement inquiries.
          </p>

          <h4>2. Prohibited Contraband & Hazardous Fractions</h4>
          <p>
            The platform strictly prohibits non-electronic industrial chemicals, biohazardous healthcare instruments, explosive ordnance, and unsealed radioactive materials. Items discovered with hazardous contraband will be reported to state environmental regulators.
          </p>

          <h4>3. Finality of Physical Handover</h4>
          <p>
            Once a driver completes the cryptographic QR handshake at your doorstep and the item enters the recycling vehicle, title and ownership transfer to the certified processing facility for dismantling and raw material extraction.
          </p>

          <h4>4. EcoPoints Redemption</h4>
          <p>
            EcoPoints represent circular incentive tokens with non-monetary promotional value redeemable through affiliated green merchant partners and academic sustainability credits.
          </p>
        </div>
      )
    },
    cookie: {
      title: 'Cookie & Storage Policy',
      subtitle: 'Transparent Technical Session & Storage Disclosures',
      lastUpdated: 'October 2026',
      icon: Cookie,
      content: (
        <div>
          <h4>1. Essential Session Storage</h4>
          <p>
            Waste2Worth uses browser <code>localStorage</code> and secure session tokens exclusively to maintain logged-in state, store cryptographic SHA-256 certificate hashes, and cache offline pickup requests.
          </p>

          <h4>2. Zero Third-Party Advertising Trackers</h4>
          <p>
            We do not load cross-site behavioral tracking scripts, social media pixels, or commercial advertising telemetry. Any technical performance cookies are strictly first-party and anonymized.
          </p>
        </div>
      )
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      subtitle: 'Pickup Appointment Cancellations & Valuation Revisions',
      lastUpdated: 'October 2026',
      icon: RotateCcw,
      content: (
        <div>
          <h4>1. Pickup Appointment Cancellation</h4>
          <p>
            Citizens may cancel or reschedule a scheduled doorstep collection free of charge at any time prior to the collection driver being dispatched.
          </p>

          <h4>2. Condition Adjustments at Doorstep</h4>
          <p>
            If physical item inspection at doorstep reveals a discrepancy between submitted specs (e.g., functional screen vs. crushed panel), the driver recalculates valuation with the deterministic formula. The citizen retains full right to decline handover with zero penalty.
          </p>
        </div>
      )
    },
    accessibility: {
      title: 'Accessibility Statement',
      subtitle: 'Commitment to Inclusive Digital Access (WCAG 2.1 AA)',
      lastUpdated: 'October 2026',
      icon: Eye,
      content: (
        <div>
          <h4>1. Standards & Design Tokens</h4>
          <p>
            Waste2Worth is engineered to meet WCAG 2.1 Level AA accessibility standards. All core user interface components feature minimum 4.5:1 color contrast ratios, clear semantic HTML elements, and legible font hierarchies.
          </p>

          <h4>2. Keyboard & Screen Reader Navigation</h4>
          <p>
            All critical workflows—including waste registration, certificate verification, and notification pop-ups—are navigable via standard keyboard controls (<kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>) and labeled with descriptive <code>aria</code> tags.
          </p>
        </div>
      )
    },
    disclaimer: {
      title: 'Legal Disclaimer',
      subtitle: 'Market Valuation Indices & Operational Limits',
      lastUpdated: 'October 2026',
      icon: AlertCircle,
      content: (
        <div>
          <h4>1. Estimated Scrap Valuations</h4>
          <p>
            Scrap base rates and metal valuations presented on the platform are deterministic approximations based on prevailing secondary commodity indices and are subject to minor regional market fluctuations.
          </p>

          <h4>2. Certified Recycler Independence</h4>
          <p>
            Partner processing facilities operate as independent authorized environmental recyclers licensed under state pollution control bodies.
          </p>
        </div>
      )
    }
  };

  const activePolicy = policies[activeKey] || policies.privacy;
  const ActiveIcon = activePolicy.icon;

  const navLinks = [
    { key: 'privacy', label: 'Privacy Policy', path: '/privacy-policy' },
    { key: 'terms', label: 'Terms & Conditions', path: '/terms' },
    { key: 'cookie', label: 'Cookie Policy', path: '/cookie-policy' },
    { key: 'refund', label: 'Refund & Cancellation', path: '/refund-policy' },
    { key: 'accessibility', label: 'Accessibility Statement', path: '/accessibility' },
    { key: 'disclaimer', label: 'Disclaimer', path: '/disclaimer' }
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Policy Sidebar Nav */}
        <div className="glass-panel" style={{ padding: '20px', position: 'sticky', top: '90px' }}>
          <h4 style={{ margin: '0 0 14px 10px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em' }}>
            Legal Documents
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map((link) => {
              const isSelected = activeKey === link.key;
              return (
                <Link
                  key={link.key}
                  to={link.path}
                  style={{
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
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Policy Body */}
        <div className="glass-panel" style={{ padding: '40px 48px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ActiveIcon size={22} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>{activePolicy.title}</h1>
              <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{activePolicy.subtitle}</span>
            </div>
          </div>

          <div style={{
            fontSize: '0.78rem',
            color: '#94a3b8',
            marginBottom: '28px',
            paddingBottom: '16px',
            borderBottom: '1px solid #f1f5f9'
          }}>
            Last Verified & Ratified: {activePolicy.lastUpdated}
          </div>

          <div style={{
            color: '#334155',
            lineHeight: 1.8,
            fontSize: '0.94rem'
          }}>
            {activePolicy.content}
          </div>
        </div>
      </div>
    </div>
  );
}
