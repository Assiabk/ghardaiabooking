import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const dummyWikalat = [
  {
    id: 1,
    arabicName: 'وكالة الصحراء للسفر',
    location: 'غرداية',
    services: 'تنظيم رحلات الصحراء - مترجم - تخييم',
    rating: 4.5,
    price: 'ابتداءً من 3000 دج',
    image: 'https://images.pexels.com/photos/9254283/pexels-photo-9254283.jpeg'
  },
  {
    id: 2,
    arabicName: 'وكالة واحة الجنوب',
    location: 'بريان',
    services: 'جولات ثقافية - حجز فنادق - نقل سياحي',
    rating: 4.3,
    price: 'ابتداءً من 2500 دج',
    image: 'https://images.pexels.com/photos/14267612/pexels-photo-14267612.jpeg'
  },
];

export function WikalatList() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <h2 className="text-3xl font-bold text-[#800020] text-center mb-10">وكالات سياحية مع خدمات متميزة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {dummyWikalat.map((agency, index) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition duration-300"
          >
            <img
              src={agency.image}
              alt={agency.arabicName}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 text-right">
              <h3 className="text-xl font-bold text-[#800020]">{agency.arabicName}</h3>
              <p className="text-sm text-gray-500 mt-1">{agency.location}</p>
              <p className="text-gray-700 text-sm mt-2">{agency.services}</p>
              <p className="text-sm font-semibold text-gray-800 mt-2">{agency.price}</p>
              <div className="text-yellow-500 text-sm mt-1">
                {'★'.repeat(Math.floor(agency.rating))}{'☆'.repeat(5 - Math.floor(agency.rating))}
              </div>
              <button
                onClick={() => navigate(`/wikalat/${agency.id}`)}
                className="mt-4 bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#990022] w-full"
              >
                عرض التفاصيل
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
