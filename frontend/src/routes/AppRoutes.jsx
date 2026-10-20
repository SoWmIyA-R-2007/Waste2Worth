import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserDashboard from '../pages/user/UserDashboard';
import SubmitEWaste from '../pages/user/SubmitEWaste';
import TrackingPage from '../pages/user/TrackingPage';
import CertificatesPage from '../pages/user/CertificatesPage';
import RewardsPage from '../pages/user/RewardsPage';
import RecyclerDashboard from '../pages/recycler/RecyclerDashboard';
import ProcessingPage from '../pages/recycler/ProcessingPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotificationsPage from '../pages/common/NotificationsPage';
import ProfilePage from '../pages/common/ProfilePage';

// Public & Content Pages
import AboutPage from '../pages/public/AboutPage';
import ServicesPage from '../pages/public/ServicesPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import HowItWorksPage from '../pages/public/HowItWorksPage';
import FaqPage from '../pages/public/FaqPage';
import ContactPage from '../pages/public/ContactPage';
import LegalPolicyPage from '../pages/public/LegalPolicyPage';
import TrustSecurityPage from '../pages/public/TrustSecurityPage';

import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentUser && <Navbar />}

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public Website Pages (Accessible to all) */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Legal & Policy Pages */}
          <Route path="/privacy-policy" element={<LegalPolicyPage />} />
          <Route path="/terms" element={<LegalPolicyPage />} />
          <Route path="/cookie-policy" element={<LegalPolicyPage />} />
          <Route path="/refund-policy" element={<LegalPolicyPage />} />
          <Route path="/accessibility" element={<LegalPolicyPage />} />
          <Route path="/disclaimer" element={<LegalPolicyPage />} />

          {/* Trust & Security Pages */}
          <Route path="/security" element={<TrustSecurityPage />} />
          <Route path="/security/report" element={<TrustSecurityPage />} />
          <Route path="/privacy/requests" element={<TrustSecurityPage />} />
          <Route path="/account-deletion" element={<TrustSecurityPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" replace />} />

          {/* Authenticated Global Routes */}
          {currentUser ? (
            <>
              {/* Common Routes */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tracking/:id" element={<TrackingPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/leaderboard" element={<RewardsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* Citizen Portal */}
              {currentUser.role === 'ROLE_USER' && (
                <>
                  <Route path="/" element={<UserDashboard />} />
                  <Route path="/submit" element={<SubmitEWaste />} />
                  <Route path="/requests" element={<UserDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}

              {/* Recycler Portal */}
              {currentUser.role === 'ROLE_RECYCLER' && (
                <>
                  <Route path="/" element={<RecyclerDashboard />} />
                  <Route path="/processing" element={<ProcessingPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}

              {/* Admin Portal */}
              {currentUser.role === 'ROLE_ADMIN' && (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>

      {/* Universal Footer & Cookie Consent */}
      <Footer />
      <CookieConsent />
    </div>
  );
}
