// ✅ /src/components/AgencyListSection.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
};

export default function AgencyListSection() {
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/wikalat');
        if (!res.ok) throw new Error('Failed to fetch agencies');
        setAgencies(await res.json());
      } catch (err) {
        console.error('❌ Error fetching agencies:', err);
      }
    })();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#800020] text-center mb-8">
        وكالات تقدم خدمات دليل سياحي
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {agencies.map((agency, idx) => (
          <motion.div
            key={agency.id}
            className="bg-white rounded-xl shadow-md cursor-pointer"
            variants={cardVariants}
            whileHover={{
              scale: 1.04,
              rotateX: 2,
              rotateY: -2,
              boxShadow: '0px 8px 20px rgba(0,0,0,0.12)',
              transition: { type: 'spring', stiffness: 200, damping: 20 },
            }}
            onClick={() => navigate(`/wikalat/${agency.id}`)}  // ← fixed route path
          >
            {agency.images?.[0] && (
              <motion.img
                src={agency.images[0]}
                alt={agency.name}
                className="w-full h-48 object-cover rounded-t-xl"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                layoutId={`agency-image-${agency.id}`}
              />
            )}
            <div className="p-4 text-right">
              <h3 className="text-lg font-semibold text-[#800020]">{agency.name}</h3>
              <p className="text-sm text-gray-500">{agency.address || 'بدون عنوان'}</p>
              <motion.p
                className="mt-2 text-gray-800"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.15 + 0.3, type: 'spring', stiffness: 300 }}
              >
                {Array.isArray(agency.services)
                  ? agency.services.join(' - ')
                  : 'لا توجد خدمات محددة'}
              </motion.p>
              <motion.p
                className="mt-1 text-yellow-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.15 + 0.4, type: 'spring', stiffness: 300 }}
              >
                {'★'.repeat(Math.floor(agency.rating || 4))}
              </motion.p>
              <motion.button
                className="mt-4 bg-[#800020] text-white px-4 py-2 rounded w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => navigate(`/wikalat/${agency.id}`)}  // ← fixed route path
              >
                عرض التفاصيل
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
