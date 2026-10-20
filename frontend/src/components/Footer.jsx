import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShieldCheck, Heart, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      marginTop: '80px',
      borderTop: '1px solid #e2e8f0',
      background: '#ffffff',
      color: '#475569',
      fontSize: '0.88rem'
    }}>
      {/* Top Banner Accent */}
      <div style={{
        height: '4px',
        background: 'linear-gradient(90deg, #10b981 0%, #0284c7 50%, #7c3aed 100%)'
      }} />

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '56px 24px 32px 24px'
      }}>
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Info Column */}
          <div style={{ maxWidth: '300px' }}>
            <Link to="/" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
              }}>
                <Recycle size={20} />
              </div>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  Waste<span style={{ color: '#059669' }}>2</span>Worth
                </span>
                <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Circular Economy 2.0
                </span>
              </div>
            </Link>

            <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.85rem', marginBottom: '16px' }}>
              Transforming hazardous electronic waste into verifiable circular wealth through deterministic valuation, route optimization, and cryptographic SHA-256 certificate chaining.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '0.78rem', fontWeight: 700 }}>
              <ShieldCheck size={16} />
              <span>CPCB & DPDP Act 2023 Compliant</span>
            </div>
          </div>

          {/* Column 1: ABOUT */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0f172a',
              marginBottom: '18px'
            }}>
              ABOUT
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/about" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0f172a',
              marginBottom: '18px'
            }}>
              SERVICES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/services" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Services Overview
                </Link>
              </li>
              <li>
                <Link to="/features" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Key Features
                </Link>
              </li>
              <li>
                <Link to="/certificates" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Recycling Certificates
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  EcoPoints Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: LEGAL */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0f172a',
              marginBottom: '18px'
            }}>
              LEGAL
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/privacy-policy" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link to="/accessibility" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Accessibility Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: SECURITY */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#0f172a',
              marginBottom: '18px'
            }}>
              SECURITY
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/security" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link to="/security/report" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Responsible Disclosure
                </Link>
              </li>
              <li>
                <Link to="/privacy/requests" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Data & Privacy Requests
                </Link>
              </li>
              <li>
                <Link to="/account-deletion" onClick={scrollToTop} style={{ color: '#64748b', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#059669'} onMouseLeave={(e) => e.target.style.color = '#64748b'}>
                  Account Deletion
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.82rem',
          color: '#94a3b8'
        }}>
          <div>
            © 2026 <strong style={{ color: '#475569' }}>Waste2Worth 2.0</strong>. All rights reserved. Built for Circular E-Waste Management.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Anna Nagar, Chennai, TN, India</span>
            <span>•</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>v2.0.4 Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
