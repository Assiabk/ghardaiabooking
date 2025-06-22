import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';

const AddHotel = () => {
  // Basic info
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Pricing & rating
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');

  // Services list
  const [serviceInput, setServiceInput] = useState('');
  const [services, setServices] = useState([]);

  // Images (Base64 strings)
  const [imagesBase64, setImagesBase64] = useState([]);

  // Location URL
  const [locationUrl, setLocationUrl] = useState('');

  // Room types
  const [roomName, setRoomName] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomDesc, setRoomDesc] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);

  // New checkboxes
  const [hasWomenSection, setHasWomenSection] = useState(false);
  const [hasMenSection, setHasMenSection] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);
  const [includesBreakfast, setIncludesBreakfast] = useState(false);

  // Snackbar
  const [snackbar, setSnackbar] = useState({ show: false, msg: '', isError: false });
  useEffect(() => {
    if (!snackbar.show) return;
    const t = setTimeout(() => setSnackbar(s => ({ ...s, show: false })), 3000);
    return () => clearTimeout(t);
  }, [snackbar.show]);

  // Add / remove helpers
  const addService = () => {
    const s = serviceInput.trim();
    if (!s) return;
    setServices(prev => [...prev, s]);
    setServiceInput('');
  };
  const removeService = idx => setServices(prev => prev.filter((_, i) => i !== idx));

  const addRoomType = () => {
    if (!roomName.trim() || !roomPrice.trim()) return;
    setRoomTypes(prev => [
      ...prev,
      {
        name: roomName.trim(),
        description: roomDesc.trim(),
        price: Number(roomPrice),
      }
    ]);
    setRoomName(''); setRoomDesc(''); setRoomPrice('');
  };
  const removeRoomType = idx => setRoomTypes(prev => prev.filter((_, i) => i !== idx));

  // Convert selected files to Base64 and store in imagesBase64
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(',')[1]; // Remove the prefix (data:image/...)
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }))
    ).then(base64Images => {
      setImagesBase64(base64Images);
    }).catch(error => {
      console.error('Error reading files', error);
      setSnackbar({ show: true, msg: 'خطأ في قراءة الصور', isError: true });
    });
  };

  const removeImage = (idx) => {
    setImagesBase64(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name,
      description,
      address,
      phone,
      email,
      price: Number(price) || 0,
      rating: Number(rating) || 0,
      reviews: Number(reviews) || 0,
      services,
      images: imagesBase64,
      location: locationUrl,
      rooms: roomTypes,
      hasWomenSection,
      hasMenSection,
      isAccessible,
      includesBreakfast,
    };

    try {
      const res = await fetch('http://localhost:5000/api/admin/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Status ${res.status}`);
      }
      await res.json();

      setSnackbar({ show: true, msg: 'الفندق أُضيف بنجاح!', isError: false });

      // Reset all form fields
      setName(''); setDescription(''); setAddress('');
      setPhone(''); setEmail(''); setPrice('');
      setRating(''); setReviews(''); setServices([]);
      setServiceInput(''); setImagesBase64([]); setLocationUrl('');
      setRoomTypes([]); setRoomName(''); setRoomPrice(''); setRoomDesc('');
      setHasWomenSection(false);
      setHasMenSection(false);
      setIsAccessible(false);
      setIncludesBreakfast(false);

    } catch (error) {
      console.error('AddHotel error:', error);
      setSnackbar({ show: true, msg: '❌ خطأ أثناء الحفظ: ' + error.message, isError: true });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-right">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#800020] mb-6">إضافة فندق جديد</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span>اسم الفندق</span>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                required className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block md:col-span-2">
              <span>الوصف</span>
              <textarea
                value={description} onChange={e => setDescription(e.target.value)}
                rows={3} className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>العنوان</span>
              <input
                type="text" value={address} onChange={e => setAddress(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>رابط الخريطة</span>
              <input
                type="url" value={locationUrl} onChange={e => setLocationUrl(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>الهاتف</span>
              <input
                type="text" value={phone} onChange={e => setPhone(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>البريد الإلكتروني</span>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
          </div>

          {/* Pricing & Rating */}
          <div className="grid md:grid-cols-3 gap-4">
            <label className="block">
              <span>السعر لكل ليلة</span>
              <input
                type="number" value={price} onChange={e => setPrice(e.target.value)}
                required className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>التقييم</span>
              <input
                type="number" step="0.1" max="10" value={rating}
                onChange={e => setRating(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>عدد التقييمات</span>
              <input
                type="number" value={reviews} onChange={e => setReviews(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
          </div>

          {/* Services */}
          <div>
            <span>المرافق</span>
            <div className="mt-2 flex gap-2">
              <input
                value={serviceInput} onChange={e => setServiceInput(e.target.value)}
                placeholder="أضف مرفق" className="flex-1 border rounded p-2"
              />
              <button type="button" onClick={addService}
                className="bg-[#800020] text-white px-4 rounded"
              >إضافة</button>
            </div>
            <ul className="mt-2 flex flex-wrap gap-2">
              {services.map((s, i) => (
                <li key={i}
                  className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
                >
                  {s}
                  <button type="button" onClick={() => removeService(i)}>✕</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Images */}
          <div>
            <span>صور الفندق</span>
            <input
              type="file" accept="image/*" multiple
              onChange={handleImageChange}
              className="mt-2 block w-full border rounded p-2"
            />
            {imagesBase64.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {imagesBase64.map((img, i) => (
                  <li key={i}
                    className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
                  >
                    صورة #{i + 1}
                    <button type="button"
                      onClick={() => removeImage(i)}
                    >✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Room Types */}
          <div>
            <span>أنواع الغرف</span>
            <div className="mt-2 grid md:grid-cols-3 gap-2">
              <input
                placeholder="نوع الغرفة" value={roomName}
                onChange={e => setRoomName(e.target.value)}
                className="border rounded p-2"
              />
              <input
                placeholder="سعر الغرفة" value={roomPrice}
                onChange={e => setRoomPrice(e.target.value)}
                className="border rounded p-2"
              />
              <button type="button" onClick={addRoomType}
                className="bg-[#800020] text-white px-4 rounded"
              >إضافة نوع</button>
            </div>
            {roomTypes.length > 0 && (
              <ul className="mt-2 space-y-2">
                {roomTypes.map((room, i) => (
                  <li key={i}
                    className="border rounded p-2 flex justify-between items-center"
                  >
                    <div>
                      <strong>{room.name}</strong> — {room.price} دج
                      {room.description && (
                        <p className="text-gray-600 text-sm">{room.description}</p>
                      )}
                    </div>
                    <button type="button" onClick={() => removeRoomType(i)}>✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* New checkboxes */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={hasWomenSection}
                onChange={e => setHasWomenSection(e.target.checked)}
              />
              <span>قسم خاص بالنساء</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={hasMenSection}
                onChange={e => setHasMenSection(e.target.checked)}
              />
              <span>قسم خاص بالرجال</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={isAccessible}
                onChange={e => setIsAccessible(e.target.checked)}
              />
              <span>يتيح الوصول لذوي الاحتياجات الخاصة</span>
            </label>
            <label className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                checked={includesBreakfast}
                onChange={e => setIncludesBreakfast(e.target.checked)}
              />
              <span>يشمل الفطور</span>
            </label>
          </div>

          {/* Submit */}
          <div className="text-right mt-6">
            <button type="submit"
              className="bg-[#800020] text-white px-6 py-2 rounded hover:bg-[#990022] transition"
            >حفظ الفندق</button>
          </div>
        </form>

        {/* Snackbar */}
        {snackbar.show && (
          <div
            className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg ${
              snackbar.isError ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {snackbar.msg}
          </div>
        )}
      </main>
    </div>
  );
};

export default AddHotel;
