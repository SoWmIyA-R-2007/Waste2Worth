import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../pages/auth/Login';
import UserDashboard from '../pages/user/UserDashboard';
import SubmitEWaste from '../pages/user/SubmitEWaste';
import RecyclerDashboard from '../pages/recycler/RecyclerDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser && <Navbar />}
      <main>
        <Routes>
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />

          {/* Protected Portal Routes */}
          {currentUser ? (
            <>
              {currentUser.role === 'ROLE_ADMIN' && (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}

              {currentUser.role === 'ROLE_RECYCLER' && (
                <>
                  <Route path="/" element={<RecyclerDashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}

              {currentUser.role === 'ROLE_USER' && (
                <>
                  <Route path="/" element={<UserDashboard />} />
                  <Route path="/submit" element={<SubmitEWaste />} />
                  <Route path="/requests" element={<UserDashboard />} />
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
