// ✅ /src/pages/WikalatDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function WikalatDetail() {
  const { id } = useParams();
  const [agency, setAgency]     = useState(null);
  const [error, setError]       = useState('');
  const [form, setForm]         = useState({ name: '', phone: '' });
  const [formError, setFormError] = useState('');
  const [success, setSuccess]   = useState('');

  // 1) Load agency
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/wikalat/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAgency(data);
      } catch (e) {
        setError('خطأ أثناء جلب بيانات الوكالة');
        console.error(e);
      }
    })();
  }, [id]);

  // 2) Submit reservation
  const handleReserve = async e => {
    e.preventDefault();
    setFormError(''); setSuccess('');

    if (!form.name.trim() || !form.phone.trim()) {
      setFormError('الرجاء تعبئة الاسم ورقم الهاتف');
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/wikalat/${id}/reserve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess('تم إرسال طلب الحجز بنجاح!');
      setForm({ name: '', phone: '' });
    } catch (e) {
      console.error(e);
      setFormError('حدث خطأ أثناء الحجز');
    }
  };

  // 3) Render
  if (error) {
    return (
      <div className="p-8 text-center text-red-600">{error}</div>
    );
  }
  if (!agency) {
    return (
      <div className="p-8 text-center">جاري تحميل بيانات الوكالة…</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-right">
    

      {/* Hero image */}
      {agency.images?.[0] && (
        <img
          src={agency.images[0]}
          alt={agency.name}
          className="w-full max-h-64 object-cover"
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-[#800020]">
            {agency.name}
          </h1>
          <p className="text-gray-700">{agency.description}</p>

          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt />
            <span>{agency.address}</span>
            {agency.location && (
              <a
                href={agency.location}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline ml-2"
              >
                عرض على الخريطة
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600">
            {agency.phone && (
              <span>
                <FaPhone /> {agency.phone}
              </span>
            )}
            {agency.email && (
              <span>
                <FaEnvelope /> {agency.email}
              </span>
            )}
            {agency.website && (
              <a
                href={agency.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-600 underline"
              >
                <FaGlobe /> موقع إلكتروني
              </a>
            )}
          </div>

          {agency.licenseNumber && (
            <p>
              <strong>رقم الرخصة:</strong> {agency.licenseNumber}
            </p>
          )}

          {agency.services?.length > 0 && (
            <ul className="list-disc list-inside mt-4 text-gray-700">
              {agency.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Reservation Form */}
        <aside className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">حجز الخدمة</h2>
          <form onSubmit={handleReserve} className="space-y-4">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={form.phone}
              onChange={e =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            {formError && (
              <p className="text-red-500 text-sm">{formError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#800020] text-white py-2 rounded hover:bg-[#990022] transition"
            >
              احجز الآن
            </button>
            {success && (
              <p className="text-green-600 text-center">{success}</p>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
}
