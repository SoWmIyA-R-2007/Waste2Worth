import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ewasteApi } from '../../api/ewasteApi';
import { 
  Package, 
  Recycle, 
  Award, 
  Plus, 
  Leaf, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const data = await ewasteApi.getUserRequests(currentUser?.id || 'usr-101');
        setRequests(data);
      } catch (err) {
        console.warn('API error, using local requests cache:', err);
        const list = JSON.parse(localStorage.getItem('w2w_requests') || '[]');
        setRequests(list);
      } finally {
        setLoading(false);
      }
    };
    fetchUserItems();
  }, [currentUser]);

  const totalKg = requests.reduce((acc, curr) => acc + (curr.weightKg || 0), currentUser?.totalWasteKg || 28.4);
  const ecoPoints = currentUser?.ecoPoints || 1850;

  // Environmental impact calculations (estimated conversion factors)
  const co2AvoidedKg = (totalKg * 1.44).toFixed(1);
  const landfillDivertedKg = (totalKg * 0.90).toFixed(1);

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '4px', color: '#0f172a' }}>
            Welcome, <span className="text-gradient">{currentUser?.fullName || 'Citizen'}</span> 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Track your recycling contributions, request pickups, and earn verified green eco-points.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/certificates" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} />
            Certificates
          </Link>
          <Link to="/submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} />
            Submit E-Waste
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Requests</span>
            <div style={{ padding: '8px', borderRadius: '10px', background: '#e0f2fe' }}>
              <Package size={20} color="var(--accent-cyan)" />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', color: '#0f172a' }}>
            {requests.length || 4}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered e-waste submissions</span>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Recycled</span>
            <div style={{ padding: '8px', borderRadius: '10px', background: '#ecfdf5' }}>
              <Recycle size={20} color="var(--primary-600)" />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', color: '#059669' }}>
            {totalKg.toFixed(1)} <span style={{ fontSize: '1.2rem' }}>KG</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Prevented from hazardous landfills</span>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>EcoPoints Balance</span>
            <div style={{ padding: '8px', borderRadius: '10px', background: '#fef3c7' }}>
              <Award size={20} color="var(--accent-amber)" />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', color: '#d97706' }}>
            {ecoPoints}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Link to="/rewards" style={{ color: '#059669', textDecoration: 'none', fontWeight: 700 }}>
              View Leaderboard →
            </Link>
          </span>
        </div>
      </div>

      {/* Environmental Impact Banner */}
      <div className="glass-panel" style={{
        padding: '24px 32px',
        marginBottom: '36px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%)',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', background: '#ffffff', boxShadow: '0 4px 12px rgba(5,150,105,0.1)' }}>
              <Leaf size={28} color="#059669" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a', margin: 0 }}>
                Your Estimated Environmental Impact
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                Measurable circular economy savings through responsible e-waste processing.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>CO₂ Emissions Avoided</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>{co2AvoidedKg} kg</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Landfill Diversion</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7' }}>{landfillDivertedKg} kg</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Recent E-Waste Pickup Requests</h3>
        </div>

        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <Package size={48} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
            <p>No active requests found. Schedule your first e-waste collection!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {requests.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#ecfdf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Recycle size={20} color="#059669" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '2px', color: '#0f172a' }}>
                      {item.brand} {item.model} ({item.category})
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ID: {item.wasteId || item.id} • Recycler: {item.matchedRecyclerName || 'GreenCycle'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Value</span>
                    <strong style={{ color: '#d97706', fontSize: '0.95rem' }}>₹ {item.estimatedValue}</strong>
                  </div>

                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: item.status === 'RECYCLED' || item.status === 'CERTIFIED' ? '#ecfdf5' : '#e0f2fe',
                    color: item.status === 'RECYCLED' || item.status === 'CERTIFIED' ? '#059669' : '#0284c7',
                    border: item.status === 'RECYCLED' || item.status === 'CERTIFIED' ? '1px solid #a7f3d0' : '1px solid #bae6fd'
                  }}>
                    {item.status || 'REQUESTED'}
                  </span>

                  <Link
                    to={`/tracking/${item.wasteId || item.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#059669',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    Track <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
