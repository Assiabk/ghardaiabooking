import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyWikalat = [
  {
    id: 1,
    arabicName: 'وكالة الصحراء للسفر',
    image: 'https://images.pexels.com/photos/9254283/pexels-photo-9254283.jpeg',
    description: 'نحن وكالة متخصصة في تنظيم رحلات المغامرات والتخييم في جنوب الجزائر. نقدم أدلاء سياحيين محترفين وخدمات شاملة.',
    location: 'غرداية',
    rating: 4.7,
  },
  {
    id: 2,
    arabicName: 'وكالة الواحة للسياحة',
    image: 'https://images.pexels.com/photos/14267612/pexels-photo-14267612.jpeg',
    description: 'تنظيم جولات تراثية وثقافية عبر مناطق مزاب، مع توفير وسائل النقل والإقامة.',
    location: 'بريان',
    rating: 4.4,
  }
];

export default function WikalatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const agency = dummyWikalat.find(w => w.id === parseInt(id, 10));
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: ''
  });

  if (!agency) return <p className="text-center mt-24 text-gray-600">الوكالة غير موجودة</p>;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`تم إرسال الطلب لـ ${formData.name}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto lg:flex lg:gap-8">
        <button onClick={() => navigate(-1)} className="mb-6 text-[#800020] hover:underline">← العودة</button>

        <div className="lg:w-2/3 bg-white rounded-2xl shadow-xl overflow-hidden">
          <img src={agency.image} alt={agency.arabicName} className="w-full h-80 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-[#800020] mb-2">{agency.arabicName}</h2>
            <p className="text-gray-600 text-sm mb-1">الموقع: {agency.location}</p>
            <p className="text-yellow-500 mb-3">
              {'★'.repeat(Math.floor(agency.rating))}{'☆'.repeat(5 - Math.floor(agency.rating))}
            </p>
            <p className="text-gray-700 leading-relaxed">{agency.description}</p>
          </div>
        </div>

        <aside className="lg:w-1/3 mt-10 lg:mt-0">
          <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#800020] mb-4">احجز مع الوكالة</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">الاسم الكامل</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">رقم الهاتف</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">نوع الخدمة</label>
                <input
                  name="service"
                  placeholder="جولة سياحية، حجز، ترجمة..."
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">تاريخ الخدمة</label>
                <input
                  name="date"
                  type="date"
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="w-full bg-[#800020] text-white py-2 rounded-lg hover:bg-[#990022] transition">
                إرسال الطلب
              </button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}
