// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar        from './components/Navbar.jsx';
import HomePage      from './pages/HomePage.jsx';
import HotelDetail   from './pages/HotelDetail.jsx';
import LoginPage     from './pages/LoginPage.jsx';
import IqamatList    from './pages/IqamatList.jsx';
import IqamatDetail  from './pages/IqamatDetail.jsx';
import { WikalatList }   from './pages/WikalatList.jsx';
import WikalatDetail from './pages/WikalatDetail.jsx';

import DashboardHome from './dashboard/frontend/DashboardHome.jsx';
import AddHotel      from './dashboard/frontend/AddHotel.jsx';
import AddWikala     from './dashboard/frontend/AddWikala.jsx';
import AddIqama      from './dashboard/frontend/AddIqama.jsx';

function AppContent() {
  const { pathname } = useLocation();

  // hide Navbar on admin routes AND on hotel detail pages
  const hideNavbar =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/hotel/');

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public pages */}
        <Route path="/"            element={<HomePage />} />
        <Route path="/hotel/:id"   element={<HotelDetail />} />
        <Route path="/iqamat"      element={<IqamatList />} />
        <Route path="/iqamat/:id"  element={<IqamatDetail />} />
        <Route path="/wikalat"     element={<WikalatList />} />
        <Route path="/wikalat/:id" element={<WikalatDetail />} />
        <Route path="/login"       element={<LoginPage />} />

        {/* Admin dashboard */}
        <Route path="/admin"             element={<DashboardHome />} />
        <Route path="/admin/add-hotel"   element={<AddHotel />} />
        <Route path="/admin/add-wikala"  element={<AddWikala />} />
        <Route path="/admin/add-iqama"   element={<AddIqama />} />

        {/* Fallback for 404 */}
        <Route path="*" element={<div className="text-center p-8">صفحة غير موجودة</div>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
