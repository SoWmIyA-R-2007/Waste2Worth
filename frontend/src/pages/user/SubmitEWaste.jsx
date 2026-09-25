import React, { useState, useEffect } from 'react';
import { ewasteService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { PlusCircle, ShieldCheck, Sparkles, MapPin, Calendar, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

export default function SubmitEWaste() {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState('laptops');
  const [brand, setBrand] = useState('Dell');
  const [model, setModel] = useState('Inspiron 15');
  const [condition, setCondition] = useState('used');
  const [quantity, setQuantity] = useState(1);
  const [weightKg, setWeightKg] = useState(2.4);

  const [address, setAddress] = useState('Plot 14, Anna Nagar 2nd Avenue, Chennai');
  const [preferredDate, setPreferredDate] = useState('2026-09-28');
  const [preferredTime, setPreferredTime] = useState('10:00 AM - 01:00 PM');

  const [estimatedValue, setEstimatedValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submittedItem, setSubmittedItem] = useState(null);

  useEffect(() => {
    const fetchEstimate = async () => {
      const res = await ewasteService.getEstimate({
        category,
        condition,
        weightKg,
        quantity
      });
      setEstimatedValue(res.estimatedValue);
    };
    fetchEstimate();
  }, [category, condition, weightKg, quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        userId: currentUser?.id || 'usr-101',
        userName: currentUser?.fullName || 'Sowmiya R',
        userPhone: '+91 9876500000',
        category,
        brand,
        model,
        condition,
        quantity: parseInt(quantity),
        weightKg: parseFloat(weightKg),
        pickupAddress: address,
        pickupLatitude: 13.0827,
        pickupLongitude: 80.2707,
        preferredDate,
        preferredTimeSlot: preferredTime,
        estimatedValue
      };

      const res = await ewasteService.submitWaste(payload);
      setSubmittedItem(res);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submittedItem) {
    return (
      <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#ecfdf5',
            border: '2px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 color="#059669" size={36} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '8px' }}>
            Pickup Request Scheduled!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Your e-waste record has been registered with cryptographic SHA-256 integrity verification.
          </p>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            marginBottom: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <QRCodeSVG value={submittedItem.qrCodeData || submittedItem.wasteId} size={140} />
            </div>

            <div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                {submittedItem.wasteId}
              </span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', wordBreak: 'break-all', marginTop: '4px' }}>
                SHA-256: {submittedItem.sha256VerificationHash?.slice(0, 24)}...
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              width: '100%',
              marginTop: '12px',
              textAlign: 'left'
            }}>
              <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Valuation</span>
                <strong style={{ color: '#d97706', fontSize: '1.1rem' }}>₹ {submittedItem.estimatedValue}</strong>
              </div>
              <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Assigned Recycler</span>
                <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{submittedItem.matchedRecyclerName}</strong>
              </div>
              <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>EcoPoints Earned</span>
                <strong style={{ color: '#059669', fontSize: '1.1rem' }}>+{submittedItem.ecoPointsEarned} pts</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmittedItem(null)}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            Submit Another Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: '#0f172a' }}>
          Submit <span className="text-gradient">E-Waste</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Get instant rule-based valuation, automated green recycler matching, and scheduled doorstep pickup.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
        {/* Form section */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
            <PlusCircle size={20} color="var(--primary-600)" />
            Device Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Device Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="laptops">Laptop / MacBook</option>
                <option value="smartphones">Smartphone / Tablet</option>
                <option value="desktops">Desktop & CPU</option>
                <option value="batteries">Battery & Power Pack</option>
                <option value="appliances">Home Appliance</option>
                <option value="accessories">Peripherals & Cables</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-input"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Model Name / Number</label>
              <input
                type="text"
                className="form-input"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Condition</label>
              <select
                className="form-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="working">Working (Higher Value)</option>
                <option value="used">Used / Minor Faults</option>
                <option value="broken">Broken / Scrap</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Weight (KG)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                className="form-input"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                required
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
            <MapPin size={20} color="var(--primary-600)" />
            Pickup Location & Time
          </h3>

          <div className="form-group">
            <label className="form-label">Doorstep Pickup Address</label>
            <input
              type="text"
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Preferred Date</label>
              <input
                type="date"
                className="form-input"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time Slot</label>
              <select
                className="form-select"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
              >
                <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', marginTop: '16px' }}
          >
            {loading ? 'Processing Matching Algorithm...' : 'Schedule Pickup'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Live valuation & Recycler Match summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '28px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Valuation Engine 2.0
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#d97706' }}>
                ₹ {estimatedValue}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>estimated cash value</span>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Sparkles size={18} color="#059669" />
              <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
                Earns +{Math.max(10, Math.round(weightKg * 10 + estimatedValue / 10))} EcoPoints on recycling!
              </span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '28px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Optimal Recycler Match
            </span>
            <h4 style={{ fontSize: '1.2rem', marginTop: '10px', color: '#0f172a' }}>GreenCycle EcoHub</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
                <span>Distance: ~4.2 KM away (Haversine Optimized)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
                <span>Accepts {category} category</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#059669', fontWeight: 700 }}>✓</span>
                <span>Available daily processing capacity</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--accent-cyan)" />
                <span>Government Authorized E-Waste Recycler</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
