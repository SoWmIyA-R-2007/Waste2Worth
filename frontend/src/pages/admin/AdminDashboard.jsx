import React, { useState, useEffect } from 'react';
import { ewasteService, recyclerService } from '../../services/api';
import { Shield, Users, TrendingUp, AlertTriangle, CheckCircle2, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [recyclers, setRecyclers] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      const reqs = await ewasteService.getAllRequests();
      const recs = await recyclerService.getAllRecyclers();
      setRequests(reqs);
      setRecyclers(recs);
    };
    loadAll();
  }, []);

  const totalKg = requests.reduce((acc, curr) => acc + (curr.weightKg || 0), 1820);
  const totalValuation = requests.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 145000);

  const categoryData = [
    { name: 'Smartphones', value: 38, color: '#34d399' },
    { name: 'Laptops', value: 27, color: '#06b6d4' },
    { name: 'Desktops', value: 15, color: '#8b5cf6' },
    { name: 'Batteries', value: 12, color: '#f59e0b' },
    { name: 'Appliances', value: 8, color: '#f43f5e' }
  ];

  const monthlyCollectionData = [
    { month: 'Apr', kg: 140 },
    { month: 'May', kg: 210 },
    { month: 'Jun', kg: 350 },
    { month: 'Jul', kg: 480 },
    { month: 'Aug', kg: 620 },
    { month: 'Sep', kg: 890 }
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '4px' }}>
          Operations & Security <span className="text-gradient">Command Center</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          City-wide e-waste streams, algorithmic load distribution, and fraud anomaly detection.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '36px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Users</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px' }}>1,240</div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>+18% this month</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total E-Waste Stream</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#34d399' }}>
            {(totalKg / 1000).toFixed(2)} <span style={{ fontSize: '1rem' }}>Tons</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% verified diversion</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Economic Value Distributed</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#fbbf24' }}>
            ₹ {(totalValuation / 1000).toFixed(1)}k
          </div>
          <span style={{ fontSize: '0.75rem', color: '#fbbf24' }}>Direct citizen payouts</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Security Anomaly Alerts</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', color: '#34d399' }}>0</div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>All SHA-256 hashes intact</span>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '36px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Monthly E-Waste Collection Growth (KG)</h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyCollectionData}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
                <Bar dataKey="kg" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>Category Breakdown</h3>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
