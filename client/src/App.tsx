// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ScoresPage } from './pages/dashboard/ScoresPage';
import { CharitiesPage } from './pages/public/CharitiesPage';
import { CharityProfilePage } from './pages/public/CharityProfilePage';
import { CharityPage as DashboardCharityPage } from './pages/dashboard/CharityPage';
import { LandingPage } from './pages/public/LandingPage';
import { DrawsPage } from './pages/dashboard/DrawsPage';
import { AdminDrawsPage } from './pages/admin/AdminDrawsPage';
import { SubscriptionPage } from './pages/dashboard/SubscriptionPage';
import { WinningsPage } from './pages/dashboard/WinningsPage';
import { AdminWinnersPage } from './pages/admin/AdminWinnersPage';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { AdminHome } from './pages/admin/AdminHome';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/charities" element={<CharitiesPage />} />
      <Route path="/charities/:id" element={<CharityProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/draws" element={<DrawsPage />} />
        <Route path="/scores" element={<ScoresPage />} />
        <Route path="/dashboard/charity" element={<DashboardCharityPage />} />
        <Route path="/dashboard/subscription" element={<SubscriptionPage />} />
        <Route path="/dashboard/winnings" element={<WinningsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/draws" element={<AdminDrawsPage />} />
        <Route path="/admin/winners" element={<AdminWinnersPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
