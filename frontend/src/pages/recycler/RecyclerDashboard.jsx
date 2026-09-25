import React, { useState, useEffect } from 'react';
import { ewasteService, recyclerService } from '../../services/api';
import { Truck, CheckCircle, Package, Layers, Activity, QrCode } from 'lucide-react';

export default function RecyclerDashboard() {
  const [requests, setRequests] = useState([]);
  const [recyclers, setRecyclers] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('r1');

  useEffect(() => {
    const loadData = async () => {
      const all = await ewasteService.getAllRequests();
      const recs = await recyclerService.getAllRecyclers();
      setRequests(all);
      setRecyclers(recs);
    };
    loadData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await ewasteService.updateStatus(id, status);
    const updated = await ewasteService.getAllRequests();
    setRequests(updated);
  };

  const currentCenter = recyclers.find(r => r.id === selectedCenter) || recyclers[0];

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
            Recycler <span className="text-gradient">Operations Center</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage collection logistics, update processing statuses, and monitor recovered precious materials.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Facility:</span>
          <select
            className="form-select"
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
            style={{ width: 'auto', padding: '8px 16px' }}
          >
            {recyclers.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Facility Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '36px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Capacity</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px' }}>
            {currentCenter?.dailyCapacityKg || 500} <span style={{ fontSize: '0.9rem' }}>KG</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Facility Load</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#34d399' }}>
            {currentCenter?.currentLoadKg || 145} <span style={{ fontSize: '0.9rem' }}>KG</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Efficiency Rating</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#06b6d4' }}>
            {currentCenter?.efficiencyRating || 94.5}%
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Pickups</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px', color: '#fbbf24' }}>
            {requests.filter(r => r.status !== 'RECYCLED').length}
          </div>
        </div>
      </div>

      {/* Recovered Material Inventory */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="var(--primary-400)" />
          Recovered Raw Materials Inventory
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {currentCenter?.recoveredInventory && Object.entries(currentCenter.recoveredInventory).map(([material, qty]) => (
            <div key={material} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{material}</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>
                {qty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pickup Management Table */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Incoming & Active Pickup Requests</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {requests.map(item => (
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
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ color: '#34d399', fontSize: '1rem' }}>{item.wasteId}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>• {item.brand} {item.model}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  📍 {item.pickupAddress} | {item.weightKg} KG | User: {item.userName}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <select
                  className="form-select"
                  value={item.status || 'REQUESTED'}
                  onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                >
                  <option value="REQUESTED">REQUESTED</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="PICKED_UP">PICKED UP</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="RECYCLED">RECYCLED ✓</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
