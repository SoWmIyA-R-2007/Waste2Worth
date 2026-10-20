import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: '12px' }}>
          Contact Waste2Worth Support
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
          Get in touch with our circular logistics specialists, recycler verification officers, or compliance desk.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* Contact Info Card */}
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '20px' }}>
            Headquarters & Drop-Off
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: '#ecfdf5', color: '#059669' }}>
                <MapPin size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b' }}>Physical Office</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  Waste2Worth EcoHub, 3rd Floor, Tech Park, Anna Nagar, Chennai, Tamil Nadu 600040
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: '#f0f9ff', color: '#0284c7' }}>
                <Mail size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b' }}>Email Enquiries</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>support@waste2worth.org</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: '#fffbeb', color: '#d97706' }}>
                <Phone size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b' }}>Helpline & WhatsApp</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>+91 (044) 2854-9201 / 1800-EWASTE</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: '#f8fafc', color: '#475569' }}>
                <Clock size={20} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#1e293b' }}>Operating Hours</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Monday – Saturday: 9:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '8px' }}>
            Send Us a Message
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
            We typically respond within 24 hours.
          </p>

          {submitted && (
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
              gap: '8px',
              marginBottom: '20px'
            }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>Thank you! Your message has been sent to our dispatch team.</span>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Subject
              </label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
                placeholder="Bulk e-waste, valuation inquiry, partnership"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Message
              </label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '10px',
              background: '#059669',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
            <span>Send Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
