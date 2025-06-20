import React, { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 font-sans">
      <div className="flex justify-between items-center px-6 py-4 bg-transparent">
        <h1 className="text-2xl font-bold text-[#800020]">غرداية بعيونك</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 rtl:space-x-reverse text-white font-medium">
          <a href="/">الرئيسية</a>
          <a href="/search">البحث</a>
          <a href="/about">عن المنصة</a>
          <a href="/login">تسجيل الدخول</a>
        </nav>

        {/* Hamburger icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <span className="text-3xl">☰</span>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Mobile dropdown menu */}
      <div
        className={`fixed top-16 right-4 w-[85%] max-w-xs bg-white rounded-xl shadow-2xl z-50 p-6 transform transition-all duration-300 ease-out ${
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-4 text-right text-gray-800 font-medium">
          <a href="/" className="hover:text-[#800020] transition">الرئيسية</a>
          <a href="/search" className="hover:text-[#800020] transition">البحث</a>
          <a href="/about" className="hover:text-[#800020] transition">عن المنصة</a>
          <a href="/login" className="hover:text-[#800020] transition">تسجيل الدخول</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
