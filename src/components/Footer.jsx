import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaChevronUp } from 'react-icons/fa';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#800020] text-white pt-12 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">غرداية بعيونك</h3>
          <p className="text-gray-200 text-sm">
            دليلك الأمثل لاكتشاف أجمل فنادق وخدمات غرداية.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><a href="/hotels" className="hover:underline">جميع الفنادق</a></li>
            <li><a href="/contact" className="hover:underline">اتصل بنا</a></li>
            <li><a href="/faq" className="hover:underline">الأسئلة المتكررة</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3">تواصل معنا</h4>
          <p className="text-gray-200 text-sm"> غرداية، الجزائر</p>
          <p className="text-gray-200 text-sm">+213 xx xx xx xx</p>
          <p className="text-gray-200 text-sm">info@ghardaia-beaionek.dz</p>
          <a
            href="https://maps.google.com?q=Ghardaia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 text-sm hover:underline inline-block mt-2"
          >
            افتح الخريطة
          </a>
        </div>

        {/* Social & Legal */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-gray-200">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
          <p className="text-gray-300 text-xs">
            © {new Date().getFullYear()} غرداية بعيونك. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 text-gray-300 text-xs">
            <a href="/terms" className="hover:underline">الشروط</a>
            <a href="/privacy" className="hover:underline">سياسة الخصوصية</a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-white text-[#800020] p-3 rounded-full shadow-lg"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaChevronUp />
      </motion.button>
    </motion.footer>
  );
}
