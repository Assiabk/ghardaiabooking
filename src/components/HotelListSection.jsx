import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const hotels = [
  {
    id: 1,
    name: 'فندق الواحة',
    city: 'غرداية',
    price: '4000 دج / الليلة',
    rating: 4.5,
    image: 'https://i.pinimg.com/736x/09/a5/26/09a52686fdfab8e9e3fb5b2975510bc2.jpg',
  },
  {
    id: 2,
    name: 'فندق الرمال',
    city: 'بني يزقن',
    price: '3800 دج / الليلة',
    rating: 4.3,
    image: 'https://i.pinimg.com/736x/42/36/45/4236458e97d3c76cca0f6828726ac831.jpg',
  },
];

// Container variant for staggered entrance
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Card entrance & hover variants
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.6 } },
};

const HotelListSection = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#800020] text-center mb-8">
        فنادق مقترحة
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {hotels.map((hotel, index) => (
          <motion.div
            key={hotel.id}
            className="bg-white rounded-xl shadow-md cursor-pointer"
            variants={cardVariants}
            whileHover={{
              scale: 1.04,
              rotateX: 2,
              rotateY: -2,
              boxShadow: '0px 8px 20px rgba(0,0,0,0.12)',
              transition: { type: 'spring', stiffness: 200, damping: 20 },
            }}
            onClick={() => navigate(`/hotel/${hotel.id}`)}
          >
            <motion.img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-t-xl"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              layoutId={`hotel-image-${hotel.id}`}
            />

            <div className="p-4 text-right">
              <h3 className="text-lg font-semibold text-[#800020]">
                {hotel.name}
              </h3>
              <p className="text-sm text-gray-500">{hotel.city}</p>

              <motion.p
                className="mt-2 text-gray-800"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 300 }}
              >
                {hotel.price}
              </motion.p>

              <motion.p
                className="mt-1 text-yellow-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.4, type: 'spring', stiffness: 300 }}
              >
                {'★'.repeat(Math.floor(hotel.rating))}
              </motion.p>

              <motion.button
                className="mt-4 bg-[#800020] text-white px-4 py-2 rounded w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => navigate(`/hotel/${hotel.id}`)}
              >
                عرض التفاصيل
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HotelListSection;
