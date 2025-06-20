import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaShareAlt, FaStar } from 'react-icons/fa';

const hotelData = {
  1: {
    name: 'فندق الواحة',
    rating: 8.3,
    reviews: 697,
    description: 'فندق تقليدي وسط مدينة غرداية، يقدم غرف مريحة وخدمة ممتازة.',
    price: 4000,
    services: ['Wi-Fi', 'فطور مجاني', 'مكيف هوائي', 'موقف سيارات'],
    images: [
      'https://i.pinimg.com/736x/09/a5/26/09a52686fdfab8e9e3fb5b2975510bc2.jpg',
      'https://i.pinimg.com/736x/6a/7b/13/6a7b1330b3186f6906c08b2610ece847.jpg',
    ],
    location: 'https://maps.google.com?q=Ghardaia',
  },
};

const tabs = ['نظرة عامة', 'الأسعار & معلومات', 'المرافق', 'قوانين الفندق', 'آراء الضيوف'];

const HotelDetail = () => {
  const { id } = useParams();
  const hotel = hotelData[id];
  const [activeTab, setActiveTab] = useState(0);

  const [nights, setNights] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [customer, setCustomer] = useState({ name: '', email: '' });
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  if (!hotel) {
    return <div className="text-center text-xl mt-20 text-red-600">لم يتم العثور على هذا الفندق</div>;
  }

  // parse nights to number, default to 1 if empty or invalid
  const nightsNum = parseInt(nights, 10) >= 1 ? parseInt(nights, 10) : 1;
  const totalPrice = hotel.price * nightsNum;

  const handleSubmit = e => {
    e.preventDefault();
    // parse all values
    const booking = {
      name: customer.name.trim(),
      email: customer.email.trim(),
      nights: nightsNum,
      adults: parseInt(adults, 10) >= 1 ? parseInt(adults, 10) : 1,
      children: parseInt(children, 10) >= 0 ? parseInt(children, 10) : 0,
      total: totalPrice,
    };
    console.log('Booking info:', booking);
    setShowSnackbar(true);
  };

  return (
    <div className="bg-gray-100 font-sans text-right min-h-screen pb-16">
      {/* Header with clear, high-res image */}
      <div className="relative">
        <img
          src={hotel.images[0]}
          alt="main"
          className="w-full h-80 md:h-[500px] object-cover object-center"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button className="p-2 bg-white rounded-full shadow"><FaHeart className="text-2xl text-[#800020]" /></button>
          <button className="p-2 bg-white rounded-full shadow"><FaShareAlt className="text-2xl text-gray-600" /></button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold text-[#800020]">{hotel.name}</h1>
            <div className="flex items-center gap-1 mt-2 sm:mt-0">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold">{hotel.rating}</span>
              <span className="text-gray-600">({hotel.reviews} تقييم)</span>
            </div>
          </div>

          {/* Tabs */}
          <nav className="flex overflow-x-auto border-b" dir="rtl">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 whitespace-nowrap ${activeTab === idx ? 'border-b-2 border-[#800020] text-[#800020]' : 'text-gray-600'}`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="mt-4">
            {activeTab === 0 && <p className="text-gray-700 leading-relaxed">{hotel.description}</p>}
            {activeTab === 1 && (
              <div className="space-y-2">
                <p>السعر لكل ليلة: <span className="font-medium">{hotel.price} دج</span></p>
                <p>المجموع ({nightsNum} ليلة): <span className="font-medium">{totalPrice} دج</span></p>
              </div>
            )}
            {activeTab === 2 && (
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {hotel.services.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
            {activeTab === 3 && <p className="text-gray-700">يرجى الالتزام بقوانين الفندق واحترام الآخرين.</p>}
            {activeTab === 4 && <p className="text-gray-700">آراء العملاء هنا قادمة قريباً.</p>}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
            {hotel.images.slice(1,5).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="h-24 w-full object-cover rounded-md cursor-pointer hover:opacity-75"
              />
            ))}
            {hotel.images.length > 5 && (
              <div className="h-24 flex items-center justify-center bg-gray-200 rounded-md">
                +{hotel.images.length - 5}
              </div>
            )}
          </div>
        </div>

        {/* Booking box - sticky */}
        <aside className="w-full lg:w-1/3 sticky top-24 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-[#800020] mb-4">تأكيد الحجز</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={customer.name}
              onChange={e => setCustomer({ ...customer, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />

            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={customer.email}
              onChange={e => setCustomer({ ...customer, email: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />

            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min={1}
                value={nights}
                onChange={e => setNights(e.target.value)}
                placeholder="عدد الليالي"
                className="border border-gray-300 rounded-md p-3"
              />
              <input
                type="number"
                min={1}
                value={adults}
                onChange={e => setAdults(e.target.value)}
                placeholder="عدد البالغين"
                className="border border-gray-300 rounded-md p-3"
              />
              <input
                type="number"
                min={0}
                value={children}
                onChange={e => setChildren(e.target.value)}
                placeholder="عدد الأطفال"
                className="border border-gray-300 rounded-md p-3"
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold text-lg">الإجمالي: {totalPrice} دج</span>
              <button
                type="submit"
                className="bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#990022] transition"
              >
                احجز الآن
              </button>
            </div>
          </form>

          <div
            className={`fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transform transition duration-300 ${
              showSnackbar ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            تم إرسال الحجز بنجاح!
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetail;
