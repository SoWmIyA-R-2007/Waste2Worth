import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ewasteService } from '../../services/api';
import { Package, Recycle, Award, ArrowUpRight, Plus, Clock, CheckCircle, Truck, FileText } from 'lucide-react';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const data = await ewasteService.getUserRequests(currentUser?.id || 'usr-101');
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserItems();
  }, [currentUser]);

  const totalKg = requests.reduce((acc, curr) => acc + (curr.weightKg || 0), currentUser?.totalWasteKg || 28.4);
  const totalValue = requests.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 3200);

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      {/* Welcome Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
            Welcome, <span className="text-gradient">{currentUser?.fullName || 'Sowmiya'}</span> 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Track your recycling contributions, request pickups, and earn green eco-points.
          </p>
        </div>

        <Link to="/submit" className="btn-primary">
          <Plus size={18} />
          Submit E-Waste
        </Link>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '36px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Requests</span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)' }}>
              <Package size={20} color="var(--accent-cyan)" />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px' }}>
            {requests.length || 12}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Items registered for processing</span>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Recycled</span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)' }}>
              <Recycle size={20} color="var(--primary-400)" />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', color: '#34d399' }}>
            {totalKg.toFixed(1)} <span style={{ fontSize: '1.2rem' }}>KG</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Prevented from landfills</span>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>EcoPoints Balance</span>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)' }}>
              <Award size={20} color="var(--accent-amber)" />
            </div>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', color: '#fbbf24' }}>
            {currentUser?.ecoPoints || 1850}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Redeemable rewards</span>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Recent E-Waste Pickup Requests</h3>
          <Link to="/requests" style={{ color: '#34d399', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
            View All →
          </Link>
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
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Recycle size={20} color="#34d399" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>
                      {item.brand} {item.model} ({item.category})
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ID: {item.wasteId} • Recycler: {item.matchedRecyclerName}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Value</span>
                    <strong style={{ color: '#fbbf24', fontSize: '0.95rem' }}>₹ {item.estimatedValue}</strong>
                  </div>

                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: item.status === 'RECYCLED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                    color: item.status === 'RECYCLED' ? '#34d399' : '#06b6d4'
                  }}>
                    {item.status || 'REQUESTED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
