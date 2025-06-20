import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';

const container = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, ease: 'easeOut' } }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } }
};

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('يرجى ملء جميع الحقول');
      return;
    }
    // TODO: API call
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background section */}
      <div
        className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/21847399/pexels-photo-21847399.jpeg)'
        }}
      />

      {/* Form section */}
      <div className="flex flex-1 items-center justify-center bg-gray-100 p-4 sm:p-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-[#800020] p-6">
            <motion.h2 variants={item} className="text-2xl sm:text-3xl font-bold text-white text-center">
              تسجيل الدخول
            </motion.h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <motion.div variants={item} className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
              />
            </motion.div>

            <motion.div variants={item} className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="كلمة المرور"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
              />
            </motion.div>

            {error && (
              <motion.p variants={item} className="text-red-500 text-sm text-center">
                {error}
              </motion.p>
            )}

            <motion.button
              variants={item}
              type="submit"
              className="w-full py-3 bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#990022] transition transform hover:scale-105"
            >
              دخول
            </motion.button>

            <motion.div variants={item} className="flex justify-between text-sm text-gray-600">
              <a href="/forgot-password" className="hover:text-[#800020] transition">
                نسيت كلمة المرور؟
              </a>
              <a href="/signup" className="hover:text-[#800020] transition">
                إنشاء حساب جديد
              </a>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
