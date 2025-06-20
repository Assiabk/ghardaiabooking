import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const agencies = [
  {
    id: 101,
    name: 'وكالة الجنوب',
    city: 'القرارة',
    price: '3500 دج / الليلة',
    rating: 4.7,
    image: 'https://i.pinimg.com/736x/6a/7b/13/6a7b1330b3186f6906c08b2610ece847.jpg',
  },
  {
    id: 102,
    name: 'وكالة الواحة للسياحة',
    city: 'بريان',
    price: '3000 دج / الليلة',
    rating: 4.2,
    image: 'https://i.pinimg.com/736x/42/36/45/4236458e97d3c76cca0f6828726ac831.jpg',
  },
];

const AgencyListSection = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#800020] text-center mb-8">وكالات مقترحة</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {agencies.map((agency, index) => (
          <motion.div
            key={agency.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-300"
          >
            <img src={agency.image} alt={agency.name} className="w-full h-48 object-cover rounded-t-xl" />
            <div className="p-4 text-right">
              <h3 className="text-lg font-semibold text-[#800020]">{agency.name}</h3>
              <p className="text-sm text-gray-500">{agency.city}</p>
              <p className="mt-2 text-gray-800">{agency.price}</p>
              <p className="text-yellow-500">{'★'.repeat(Math.floor(agency.rating))}</p>
              <button
                onClick={() => navigate(`/hotel/${agency.id}`)}
                className="mt-4 bg-[#800020] text-white px-4 py-2 rounded hover:bg-[#990022] w-full"
              >
                عرض التفاصيل
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AgencyListSection;
