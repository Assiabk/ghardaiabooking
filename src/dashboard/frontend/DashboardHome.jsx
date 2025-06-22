import React from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#800020] mb-6"> مرحباً بك في لوحة التحكم</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/add-hotel" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#800020] mb-2">إضافة فندق</h2>
            <p className="text-sm text-gray-600">قم بإضافة فندق جديد إلى المنصة</p>
          </Link>

          <Link to="/admin/add-iqama" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#800020] mb-2">إضافة إقامة</h2>
            <p className="text-sm text-gray-600">أضف إقامة جديدة بسهولة</p>
          </Link>

          <Link to="/admin/add-wikala" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-[#800020] mb-2">إضافة وكالة</h2>
            <p className="text-sm text-gray-600">أدخل وكالة سياحية جديدة</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
