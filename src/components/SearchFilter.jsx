import React from 'react';

const SearchFilter = () => {
  return (
    <section className="relative z-30 bg-white shadow-lg rounded-lg max-w-6xl mx-auto -mt-20 p-6 md:p-10 mb-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#333]">ابحث عن فنادق أو غرف</h2>

      <form className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* City */}
        <input
          type="text"
          placeholder="المدينة"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Price */}
        <select className="border border-gray-300 rounded px-4 py-2">
          <option>السعر</option>
          <option value="low">منخفض إلى مرتفع</option>
          <option value="high">مرتفع إلى منخفض</option>
        </select>

        {/* Rating */}
        <select className="border border-gray-300 rounded px-4 py-2">
          <option>التقييم</option>
          <option value="5">5 نجوم</option>
          <option value="4">4 نجوم</option>
          <option value="3">3 نجوم</option>
        </select>

        {/* Services */}
        <select className="border border-gray-300 rounded px-4 py-2">
          <option>الخدمات</option>
          <option value="wifi">Wi-Fi</option>
          <option value="breakfast">فطور</option>
          <option value="ac">مكيف هوائي</option>
        </select>

        {/* Guests */}
        <input
          type="number"
          placeholder="عدد الأشخاص"
          className="border border-gray-300 rounded px-4 py-2"
        />

        {/* Rooms */}
        <input
          type="number"
          placeholder="عدد الغرف"
          className="border border-gray-300 rounded px-4 py-2"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#800020] text-white py-2 px-6 rounded hover:bg-[#990022] col-span-full md:col-span-1"
        >
          بحث
        </button>
      </form>

      {/* Featured Offers Images */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <img src="https://i.pinimg.com/736x/09/a5/26/09a52686fdfab8e9e3fb5b2975510bc2.jpg" alt="offer 1" className="rounded-lg object-cover h-40 w-full" />
        <img src="https://i.pinimg.com/736x/6a/7b/13/6a7b1330b3186f6906c08b2610ece847.jpg" alt="offer 2" className="rounded-lg object-cover h-40 w-full" />
        <img src="https://i.pinimg.com/736x/42/36/45/4236458e97d3c76cca0f6828726ac831.jpg" alt="offer 3" className="rounded-lg object-cover h-40 w-full" />
        <img src="https://i.pinimg.com/736x/09/a5/26/09a52686fdfab8e9e3fb5b2975510bc2.jpg" alt="offer 4" className="rounded-lg object-cover h-40 w-full" />
      </div>
    </section>
  );
};

export default SearchFilter;
