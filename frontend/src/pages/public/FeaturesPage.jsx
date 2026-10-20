import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  ShieldCheck, 
  MapPin, 
  Award, 
  FileText, 
  QrCode, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: Cpu,
      title: 'Deterministic Rule Engine',
      desc: '21 e-waste category base rates with condition multipliers (working: 1.0, used: 0.7, broken: 0.4) for predictable, fair citizen compensation.'
    },
    {
      icon: MapPin,
      title: 'Haversine Geospatial Matching',
      desc: 'Spherical trigonometry pairing items with the closest facility, taking into account category compatibility, available capacity, and efficiency.'
    },
    {
      icon: QrCode,
      title: 'Cryptographic QR Tracking',
      desc: 'Unique tracking identifier (W2W-EW-XXXXXX) with scannable QR tokens for contactless verification during driver doorstep pickup.'
    },
    {
      icon: ShieldCheck,
      title: 'Chained SHA-256 Certificates',
      desc: 'Tamper-evident hash chaining linking previous and current certificates, ensuring municipal compliance records cannot be altered or falsified.'
    },
    {
      icon: FileText,
      title: 'Instant PDF Generation',
      desc: 'Official compliance documents generated with cryptographic hashes, net weight records, and raw material yields.'
    },
    {
      icon: Award,
      title: 'EcoPoints Reward Ledger',
      desc: 'Gamified environmental incentive ledger calculating points based on weight and recovered valuation, redeemable for rewards.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Macro Analytics',
      desc: 'Central administrator command center tracking collection velocities, landfill diversion rates, and hazardous containment stats.'
    },
    {
      icon: Zap,
      title: 'Greedy TSP Route Optimizer',
      desc: 'Nearest-neighbor heuristic sequencing stops for recycler collection vans, minimizing fuel expenditure and transport emissions.'
    }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '12px' }}>
          Platform Technical Features
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          Built with cutting-edge circular supply chain engineering, cryptographic verification, and intelligent logistics algorithms.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="glass-panel" style={{ padding: '28px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icon size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.86rem', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
