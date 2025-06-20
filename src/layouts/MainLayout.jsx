import React from 'react';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-primary text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">غرداية بعيونك</h1>
          <nav className="space-x-4 rtl:space-x-reverse">
            <a href="/" className="hover:underline">الرئيسية</a>
            <a href="/search" className="hover:underline">البحث</a>
            <a href="/login" className="hover:underline">تسجيل الدخول</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} غرداية بعيونك. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};
