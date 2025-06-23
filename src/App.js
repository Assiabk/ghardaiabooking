// ✅ App.js (Full Rewrite)
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext.jsx';
import PrivateRoute from './auth/PrivateRoute.jsx';

import Navbar from './components/Navbar.jsx';

// Public Pages
import HomePage        from './pages/HomePage.jsx';
import LoginPage       from './pages/LoginPage.jsx';
import AdminLoginPage  from './pages/AdminLoginPage.jsx';
import HotelDetail     from './pages/HotelDetail.jsx';
import IqamatList      from './pages/IqamatList.jsx';
import IqamatDetail    from './pages/IqamatDetail.jsx';
import { WikalatList } from './pages/WikalatList.jsx'; // ✅ Correct
import WikalatDetail   from './pages/WikalatDetail.jsx';

// Admin Pages
import DashboardHome from './dashboard/frontend/DashboardHome.jsx';
import AddHotel      from './dashboard/frontend/AddHotel.jsx';
import AddWikala     from './dashboard/frontend/AddWikala.jsx';
import AddIqama      from './dashboard/frontend/AddIqama.jsx';

function AppContent() {
  const { pathname } = useLocation();

  const hideNavbarRoutes = [
    '/admin',
    '/admin-login',
  ];

  const hideNavbar =
    hideNavbarRoutes.some((prefix) => pathname.startsWith(prefix)) ||
    pathname.startsWith('/hotel/') ||
    pathname.startsWith('/iqamat/') ||
    pathname.startsWith('/wikalat/');

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/"                element={<HomePage />} />
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/admin-login"     element={<AdminLoginPage />} />
        <Route path="/hotel/:id"       element={<HotelDetail />} />
        <Route path="/iqamat"          element={<IqamatList />} />
        <Route path="/iqamat/:id"      element={<IqamatDetail />} />
        <Route path="/wikalat"         element={<WikalatList />} />
        <Route path="/wikalat/:id"     element={<WikalatDetail />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-hotel"
          element={
            <PrivateRoute>
              <AddHotel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-wikala"
          element={
            <PrivateRoute>
              <AddWikala />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-iqama"
          element={
            <PrivateRoute>
              <AddIqama />
            </PrivateRoute>
          }
        />

        {/* 404 Not Found */}
        <Route
          path="*"
          element={<div className="text-center p-8">صفحة غير موجودة</div>}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
