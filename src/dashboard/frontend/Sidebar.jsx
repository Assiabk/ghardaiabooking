import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-[#800020] text-white w-64 min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-center">لوحة التحكم</h2>
      <nav className="flex flex-col gap-4 text-right">
        <NavLink to="/admin" className="hover:text-yellow-300">الرئيسية</NavLink>
        <NavLink to="/admin/add-hotel" className="hover:text-yellow-300">➕ إضافة فندق</NavLink>
        <NavLink to="/admin/add-iqama" className="hover:text-yellow-300">➕ إضافة إقامة</NavLink>
        <NavLink to="/admin/add-wikala" className="hover:text-yellow-300">➕ إضافة وكالة</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
