import React, { useState, useEffect } from 'react';
import { rewardApi } from '../../api/rewardApi';
import { useAuth } from '../../context/AuthContext';
import { Award, Trophy, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RewardsPage() {
  const { currentUser } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRewardsData = async () => {
      try {
        const [userRewards, lb] = await Promise.all([
          rewardApi.getUserRewards(currentUser?.id || 'usr-101'),
          rewardApi.getLeaderboard()
        ]);
        setRewards(userRewards);
        setLeaderboard(lb);
      } catch (err) {
        console.warn('Backend unavailable, using simulated rewards ledger:', err);
        setRewards([
          { id: 'r1', points: 140, description: 'Recycled Dell Latitude 7490 (2.1 KG)', type: 'RECYCLING', createdAt: new Date().toISOString() },
          { id: 'r2', points: 250, description: 'Milestone: 25+ KG e-waste diverted', type: 'WEIGHT_MILESTONE', createdAt: new Date(Date.now() - 86400000).toISOString() },
          { id: 'r3', points: 100, description: 'Welcome green citizen signup bonus', type: 'BONUS', createdAt: new Date(Date.now() - 172800000).toISOString() }
        ]);
        setLeaderboard([
          { rank: 1, name: 'Sowmiya R', email: 'sowmiya@w2w.org', ecoPoints: 1850, wasteRecycledKg: 28.4, level: 'Eco Guardian' },
          { rank: 2, name: 'Ananya Sharma', email: 'ananya@w2w.org', ecoPoints: 1420, wasteRecycledKg: 22.1, level: 'Eco Guardian' },
          { rank: 3, name: 'Karthik Raja', email: 'karthik@w2w.org', ecoPoints: 890, wasteRecycledKg: 14.8, level: 'Eco Contributor' },
          { rank: 4, name: 'Priya Sundar', email: 'priya@w2w.org', ecoPoints: 450, wasteRecycledKg: 8.2, level: 'Eco Contributor' },
          { rank: 5, name: 'Rohan Mehra', email: 'rohan@w2w.org', ecoPoints: 210, wasteRecycledKg: 3.5, level: 'Eco Starter' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadRewardsData();
  }, [currentUser]);

  const points = currentUser?.ecoPoints || 1850;

  const getLevel = (pts) => {
    if (pts >= 5000) return 'Eco Hero';
    if (pts >= 2500) return 'Eco Champion';
    if (pts >= 1000) return 'Eco Guardian';
    if (pts >= 300) return 'Eco Contributor';
    return 'Eco Starter';
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
      {/* Balance Banner */}
      <div className="glass-panel" style={{
        padding: '36px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 100%)',
        border: '1px solid #a7f3d0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={20} color="#059669" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                EcoPoints Balance
              </span>
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>
              {points} <span style={{ fontSize: '1.4rem', color: '#059669' }}>PTS</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Current Status Level: <strong style={{ color: '#059669' }}>{getLevel(points)}</strong>
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '16px 24px',
            borderRadius: '16px',
            border: '1px solid #cbd5e1'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Next Level</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Eco Champion</div>
              <span style={{ fontSize: '0.75rem', color: '#059669' }}>{Math.max(0, 2500 - points)} pts to go</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '28px' }}>
        {/* Leaderboard Column */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={20} color="#d97706" />
            Circular Economy Leaderboard
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: user.rank === 1 ? '#fef3c7' : '#f8fafc',
                  border: user.rank === 1 ? '1px solid #fde68a' : '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: user.rank === 1 ? '#d97706' : '#e2e8f0',
                    color: user.rank === 1 ? '#ffffff' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    {user.rank}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a', display: 'block' }}>{user.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.wasteRecycledKg} KG recycled</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#059669', display: 'block' }}>
                    {user.ecoPoints} pts
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: '#ecfdf5', color: '#059669', fontWeight: 700 }}>
                    {user.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Ledger Column */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={20} color="#059669" />
            Points Ledger History
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rewards.map((r) => (
              <div
                key={r.id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>{r.description}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669' }}>
                  +{r.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
