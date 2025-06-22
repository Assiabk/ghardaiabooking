
/* src/pages/IqamatDetail.jsx */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyIqamat = [
  { id: 1, arabicName: 'إقامة النخيل', image: 'https://images.pexels.com/photos/27789446/pexels-photo-27789446.jpeg', description: 'بيت مريح وسط النخيل مع كافة الخدمات ووسائل الراحة المطلوبة. يحتوي على غرفتين وصالة ومطبخ مجهز بالكامل.', price: '1500 DA / ليلة' },
  { id: 2, arabicName: 'إقامة الواحة', image: 'https://images.pexels.com/photos/27789441/pexels-photo-27789441.jpeg', description: 'تصميم تقليدي وأثاث تقليدي وخدمة إفطار صباحي، وإطلالة ساحرة على الواحة المحيطة.', price: '1800 DA / ليلة' }
];

export default function IqamatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const iqama = dummyIqamat.find(item => item.id === parseInt(id, 10));
  const [formData, setFormData] = useState({ name: '', phone: '', guests: 1, dateFrom: '', dateTo: '' });

  if (!iqama) return <p className="text-center mt-20 text-gray-700">العنصر غير موجود</p>;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert(`تم إرسال الحجز لـ ${formData.name}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6 lg:flex lg:space-x-8">
        <button onClick={() => navigate(-1)} className="mb-6 text-[#800020] hover:underline">← العودة</button>
        <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg overflow-hidden">
          <img src={iqama.image} alt={iqama.arabicName} className="h-80 w-full object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{iqama.arabicName}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{iqama.description}</p>
            <span className="block mt-6 text-2xl font-extrabold text-[#800020]">{iqama.price}</span>
          </div>
        </div>
        <aside className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold text-[#800020] mb-4">احجز الآن</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">الاسم الكامل</label>
                <input name="name" onChange={handleChange} required className="w-full mt-1 p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700">رقم الهاتف</label>
                <input name="phone" onChange={handleChange} required type="tel" className="w-full mt-1 p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700">عدد الضيوف</label>
                <input name="guests" onChange={handleChange} required type="number" min="1" className="w-full mt-1 p-2 border rounded-lg" />
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-gray-700">من</label>
                  <input name="dateFrom" onChange={handleChange} required type="date" className="w-full mt-1 p-2 border rounded-lg" />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">إلى</label>
                  <input name="dateTo" onChange={handleChange} required type="date" className="w-full mt-1 p-2 border rounded-lg" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#800020] text-white font-semibold rounded-xl hover:bg-opacity-90 transition">إرسال الحجز</button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
}