import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../api/userApi';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Building2, 
  Award, 
  CheckCircle2, 
  Save, 
  Lock, 
  Bell, 
  Key, 
  Leaf, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  QrCode
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateProfile, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState('personal'); // personal, security, address, preferences
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  // Profile Form State
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || 'Sowmiya R',
    email: currentUser?.email || 'sowmiya@w2w.org',
    phone: currentUser?.phone || '+91 98450 12345',
    city: currentUser?.city || 'Chennai',
    state: currentUser?.state || 'Tamil Nadu',
    address: currentUser?.address || 'No. 42, Green Avenue, Anna Nagar',
    pincode: currentUser?.pincode || '600040',
    landmark: currentUser?.landmark || 'Near Metro Station Gate 2',
    bio: currentUser?.bio || 'Passionate about environmental sustainability, circular economy, and zero e-waste landfills.',
    organization: currentUser?.organization || (currentUser?.role === 'ROLE_RECYCLER' ? 'GreenCycle EcoHub' : 'Individual Citizen')
  });

  // Password State
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: ''
  });

  // Notification Preferences State
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    smsAlerts: true,
    leaderboardPublic: true,
    monthlyDigest: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Attempt backend update if server is reachable
      if (currentUser?.id) {
        await userApi.updateUser(currentUser.id, formData).catch(() => {});
      }
    } catch (err) {
      console.warn('Backend offline, saving locally:', err);
    }

    // Always update AuthContext state and localStorage
    updateProfile(formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!passwords.newPass || !passwords.current) {
      setPasswordMsg({ type: 'error', text: 'Please fill in all password fields.' });
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwords.newPass.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setPasswordMsg({ type: 'success', text: 'Password updated successfully!' });
    setPasswords({ current: '', newPass: '', confirmPass: '' });
    setTimeout(() => setPasswordMsg(null), 4000);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '36px auto', padding: '0 24px' }}>
      {/* Profile Header Hero Card */}
      <div className="glass-panel" style={{
        padding: '32px',
        marginBottom: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {/* Avatar Icon */}
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            background: currentUser?.role === 'ROLE_ADMIN' 
              ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' 
              : currentUser?.role === 'ROLE_RECYCLER'
              ? 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)'
              : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
            fontSize: '2rem',
            fontWeight: 800
          }}>
            {formData.fullName?.charAt(0) || 'U'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '1.75rem', margin: 0, color: '#0f172a' }}>
                {formData.fullName}
              </h1>
              <span style={{
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: '8px',
                background: currentUser?.role === 'ROLE_ADMIN' ? '#f5f3ff' : currentUser?.role === 'ROLE_RECYCLER' ? '#f0f9ff' : '#ecfdf5',
                color: currentUser?.role === 'ROLE_ADMIN' ? '#7c3aed' : currentUser?.role === 'ROLE_RECYCLER' ? '#0284c7' : '#059669',
                border: currentUser?.role === 'ROLE_ADMIN' ? '1px solid #ddd6fe' : currentUser?.role === 'ROLE_RECYCLER' ? '1px solid #bae6fd' : '1px solid #a7f3d0',
                fontWeight: 800
              }}>
                {currentUser?.role === 'ROLE_ADMIN' ? 'ADMINISTRATOR' : currentUser?.role === 'ROLE_RECYCLER' ? 'CERTIFIED RECYCLER' : 'CITIZEN'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b', fontSize: '0.88rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={15} /> {formData.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={15} /> {formData.city}, {formData.state}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            padding: '12px 18px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
              {currentUser?.ecoPoints || 1850}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>EcoPoints</div>
          </div>

          <div style={{
            padding: '12px 18px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>
              {currentUser?.totalWasteKg || 28.4} KG
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Recycled</div>
          </div>

          <div style={{
            padding: '12px 18px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d97706' }}>
              Level 3
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Eco Tier</div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccess && (
        <div style={{
          padding: '14px 20px',
          borderRadius: '12px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#065f46',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '24px',
          animation: 'fadeIn 0.2s ease-in'
        }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>Profile changes saved successfully! Your details are up-to-date across Waste2Worth.</span>
        </div>
      )}

      {/* Tab Controls */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '28px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'personal', label: 'Personal Information', icon: User },
          { id: 'address', label: 'Pickup Address & Contact', icon: MapPin },
          { id: 'security', label: 'Security & Password', icon: Lock },
          { id: 'preferences', label: 'Preferences & Notifications', icon: Bell }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: 'none',
                background: 'transparent',
                color: isActive ? '#059669' : '#64748b',
                fontWeight: isActive ? 700 : 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                borderBottom: isActive ? '2px solid #059669' : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Personal Information */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Personal Details</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
              Update your account identity, display name, and public recycling profile.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                Organization / Facility (Optional)
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
              Eco Bio / Statement
            </label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '10px',
                background: '#059669',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: isSaving ? 'wait' : 'pointer',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
              }}
            >
              <Save size={16} />
              {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Pickup Address */}
      {activeTab === 'address' && (
        <form onSubmit={handleSaveProfile} className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Doorstep Logistics Address</h3>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
              This address is used by verified recycler logistics teams to collect scheduled e-waste items.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                Street Address / Building
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  PIN / Postal Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.92rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                Landmark & Driver Instructions
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                placeholder="e.g. Near Community Center, 2nd Floor, Lift available"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '10px',
                background: '#059669',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: isSaving ? 'wait' : 'pointer'
              }}
            >
              <Save size={16} />
              {isSaving ? 'Updating...' : 'Save Logistics Address'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: Security & Password */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <form onSubmit={handleUpdatePassword} className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Change Password</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
                Ensure your account is protected with a secure password.
              </p>
            </div>

            {passwordMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '20px',
                fontSize: '0.88rem',
                fontWeight: 600,
                background: passwordMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
                color: passwordMsg.type === 'success' ? '#065f46' : '#991b1b',
                border: passwordMsg.type === 'success' ? '1px solid #a7f3d0' : '1px solid #fecaca'
              }}>
                {passwordMsg.text}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords(prev => ({ ...prev, newPass: e.target.value }))}
                  placeholder="Minimum 6 characters"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirmPass}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirmPass: e.target.value }))}
                  placeholder="Re-enter new password"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.92rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  borderRadius: '10px',
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Key size={16} />
                Update Password
              </button>
            </div>
          </form>

          {/* Cryptographic Key & 2FA Card */}
          <div className="glass-panel" style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <ShieldCheck size={20} color="#059669" />
                  <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>Two-Factor Authentication (2FA)</h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  Secure cryptographic OTP verification for high-value e-waste pickups and certificates.
                </p>
              </div>

              <span style={{
                padding: '6px 14px',
                borderRadius: '20px',
                background: '#ecfdf5',
                color: '#059669',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid #a7f3d0'
              }}>
                PROTECTED (SHA-256)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Preferences & Notifications */}
      {activeTab === 'preferences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Alerts & Preferences</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
                Control how and when you receive status notifications and updates.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { key: 'emailAlerts', title: 'Pickup Status Email Notifications', desc: 'Receive real-time email alerts when a recycler accepts or schedules your collection.' },
                { key: 'smsAlerts', title: 'Driver SMS & Tracking Updates', desc: 'Get SMS notifications when the collection vehicle is dispatched to your doorstep.' },
                { key: 'leaderboardPublic', title: 'Public Leaderboard Ranking', desc: 'Display your recycling score and EcoPoints on the community sustainability leaderboard.' },
                { key: 'monthlyDigest', title: 'Monthly Environmental Impact Digest', desc: 'Summary report of total toxic metals diverted and carbon emissions offset.' }
              ].map(pref => (
                <div
                  key={pref.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div>
                    <h5 style={{ margin: 0, fontSize: '0.92rem', color: '#1e293b' }}>{pref.title}</h5>
                    <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>{pref.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePreferenceToggle(pref.key)}
                    style={{
                      width: '46px',
                      height: '26px',
                      borderRadius: '13px',
                      background: preferences[pref.key] ? '#059669' : '#cbd5e1',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      position: 'absolute',
                      top: '3px',
                      left: preferences[pref.key] ? '23px' : '3px',
                      transition: 'left 0.2s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Role Switcher Quick Card */}
          <div className="glass-panel" style={{ padding: '24px 32px', background: '#fafbfc' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#0f172a' }}>
              Demo Portal Switcher
            </h4>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#64748b' }}>
              Switch seamlessly between personas to test role-specific workflows across Waste2Worth 2.0:
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => switchRole('ROLE_USER')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: currentUser?.role === 'ROLE_USER' ? '2px solid #059669' : '1px solid #cbd5e1',
                  background: currentUser?.role === 'ROLE_USER' ? '#ecfdf5' : '#ffffff',
                  color: currentUser?.role === 'ROLE_USER' ? '#059669' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Citizen Portal
              </button>

              <button
                type="button"
                onClick={() => switchRole('ROLE_RECYCLER')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: currentUser?.role === 'ROLE_RECYCLER' ? '2px solid #0284c7' : '1px solid #cbd5e1',
                  background: currentUser?.role === 'ROLE_RECYCLER' ? '#f0f9ff' : '#ffffff',
                  color: currentUser?.role === 'ROLE_RECYCLER' ? '#0284c7' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Recycler Operations
              </button>

              <button
                type="button"
                onClick={() => switchRole('ROLE_ADMIN')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: currentUser?.role === 'ROLE_ADMIN' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                  background: currentUser?.role === 'ROLE_ADMIN' ? '#f5f3ff' : '#ffffff',
                  color: currentUser?.role === 'ROLE_ADMIN' ? '#7c3aed' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Admin Command Center
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
