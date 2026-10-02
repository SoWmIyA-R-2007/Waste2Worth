import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser && <Navbar />}
      <main>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" replace />} />

          {/* Authenticated Global Routes */}
          {currentUser ? (
            <>
              {/* Common Routes */}
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
    </div>
  );
}
