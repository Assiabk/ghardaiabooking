// src/pages/HotelDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams }                  from 'react-router-dom';
import { FaStar }                     from 'react-icons/fa';

// Change this if your API lives somewhere else:
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export default function HotelDetail() {
  const { id } = useParams();

  const [hotel,        setHotel]        = useState(null);
  const [fetchError,   setFetchError]   = useState('');
  const [checkIn,      setCheckIn]      = useState('');
  const [nightsInput,  setNightsInput]  = useState('');
  const [checkOut,     setCheckOut]     = useState('');
  const [availability, setAvailability] = useState(null);
  const [bookingInfo,  setBookingInfo]  = useState({
    name:     '',
    phone:    '',
    roomType: '',
  });
  const [bookingError, setBookingError]  = useState('');
  const [snackbar,     setSnackbar]      = useState(false);

  // 1) Fetch hotel on mount, with full URL + robust error handling
  useEffect(() => {
    async function fetchHotel() {
      const url = `${API_BASE}/api/admin/hotels/${id}`;
      console.log('⚡️ Fetching hotel:', url);
      try {
        const res = await fetch(url);
        const text = await res.text();
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}\n${text}`);
        }
        const data = JSON.parse(text);
        setHotel(data);
      } catch (err) {
        setFetchError(err.message);
      }
    }
    fetchHotel();
  }, [id]);

  // 2) Recompute check-out when date/nights change
  useEffect(() => {
    setAvailability(null);
    setBookingError('');
    if (checkIn && /^\d+$/.test(nightsInput) && Number(nightsInput) > 0) {
      const d = new Date(checkIn);
      d.setDate(d.getDate() + Number(nightsInput));
      const YYYY = d.getFullYear();
      const MM   = String(d.getMonth() + 1).padStart(2, '0');
      const DD   = String(d.getDate()).padStart(2, '0');
      setCheckOut(`${YYYY}-${MM}-${DD}`);
    } else {
      setCheckOut('');
    }
  }, [checkIn, nightsInput]);

  // 3) Totals
  const nights = Number(nightsInput) || 0;
  const total  = hotel ? nights * hotel.price : 0;

  // 4) Check availability
  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return;
    const url = `${API_BASE}/api/admin/hotels/${id}/check-availability`;
    console.log('🔍 Checking availability:', url, { checkIn, checkOut });
    try {
      const res  = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkIn, checkOut }),
      });
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}\n${text}`);
      }
      const json = JSON.parse(text);
      setAvailability(json.available);
    } catch (err) {
      console.error(err);
      setAvailability(false);
    }
  };

  // 5) Submit booking
  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError('');
    if (!availability) return;

    const payload = {
      ...bookingInfo,
      checkIn,
      checkOut,
      nights,
      total,
    };

    const url = `${API_BASE}/api/admin/hotels/${id}/book`;
    console.log('✉️ Booking hotel:', url, payload);
    try {
      const res  = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}\n${text}`);
      }
      setSnackbar(true);
      setTimeout(() => setSnackbar(false), 3000);
    } catch (err) {
      console.error(err);
      setBookingError(err.message);
    }
  };

  // 6) Render states
  if (fetchError) {
    return (
      <div className="text-center mt-20 text-red-600">
        خطأ أثناء جلب بيانات الفندق:<br />{fetchError}
      </div>
    );
  }
  if (!hotel) {
    return (
      <div className="text-center mt-20">جاري تحميل بيانات الفندق…</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-right">
      {hotel.images?.[0] && (
        <img
          src={`data:image/jpeg;base64,${hotel.images[0]}`}
          alt={hotel.name}
          className="w-full max-h-64 object-cover"
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info panel */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold text-[#800020]">
            {hotel.name}
          </h1>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span className="font-semibold">{hotel.rating}</span>
            <span className="text-gray-600">({hotel.reviews} تقييم)</span>
          </div>
          <p className="text-gray-700">{hotel.description}</p>
          <p><strong>السعر/ليلة:</strong> {hotel.price} دج</p>
          <p><strong>العنوان:</strong> {hotel.address}</p>
          {hotel.location && (
            <p>
              <strong>الموقع:</strong>{' '}
              <a
                href={hotel.location}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                عرض على الخريطة
              </a>
            </p>
          )}
          {hotel.services?.length > 0 && (
            <ul className="list-disc list-inside mt-4 text-gray-700">
              {hotel.services.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
        </div>

        {/* Booking sidebar */}
        <aside className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">حجز الفندق</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">تاريخ الوصول</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1">عدد الليالي</label>
              <input
                type="number"
                min="1"
                value={nightsInput}
                onChange={(e) => setNightsInput(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            <button
              onClick={handleCheckAvailability}
              disabled={!checkIn || !nights}
              className="w-full bg-[#800020] text-white py-2 rounded disabled:opacity-50"
            >
              تحقق من التوفر
            </button>

            {availability !== null && (
              <p className={availability ? 'text-green-600' : 'text-red-600'}>
                {availability
                  ? `متوفر حتى ${checkOut}`
                  : 'لا توجد غرف في هذه التواريخ'}
              </p>
            )}

            <form onSubmit={handleBooking} className="space-y-4">
              <input
                type="text"
                placeholder="الاسم الكامل"
                required
                value={bookingInfo.name}
                onChange={(e) =>
                  setBookingInfo({ ...bookingInfo, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="tel"
                placeholder="رقم الهاتف"
                required
                value={bookingInfo.phone}
                onChange={(e) =>
                  setBookingInfo({ ...bookingInfo, phone: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <select
                required
                value={bookingInfo.roomType}
                onChange={(e) =>
                  setBookingInfo({ ...bookingInfo, roomType: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="" disabled>
                  اختر نوع الغرفة
                </option>
                {hotel.rooms.map((r, i) => (
                  <option key={i} value={r.type}>
                    {r.type} ({r.price} دج/ليلة)
                  </option>
                ))}
              </select>

              <div className="text-gray-800">
                عدد الليالي: <strong>{nights}</strong>
                <br />
                الإجمالي: <strong>{total}</strong> دج
              </div>

              {bookingError && (
                <p className="text-red-500 text-sm">{bookingError}</p>
              )}

              <button
                type="submit"
                disabled={!availability}
                className="w-full bg-[#800020] text-white py-2 rounded disabled:opacity-50"
              >
                احجز الآن
              </button>
            </form>
          </div>
        </aside>
      </div>

      {snackbar && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
        تم حفظ الحجز بنجاح!
        </div>
      )}
    </div>
  );
}
