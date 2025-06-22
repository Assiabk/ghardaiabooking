import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';

const AddWikala = () => {
  // Basic info
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  // Services
  const [serviceInput, setServiceInput] = useState('');
  const [services, setServices] = useState([]);

  // Images
  const [images, setImages] = useState([]);

  // Location URL
  const [locationUrl, setLocationUrl] = useState('');

  // Snackbar
  const [snackbar, setSnackbar] = useState({ show: false, msg: '', isError: false });
  useEffect(() => {
    if (!snackbar.show) return;
    const t = setTimeout(() => setSnackbar(s => ({ ...s, show: false })), 3000);
    return () => clearTimeout(t);
  }, [snackbar.show]);

  const addService = () => {
    const s = serviceInput.trim();
    if (!s) return;
    setServices(prev => [...prev, s]);
    setServiceInput('');
  };
  const removeService = idx =>
    setServices(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      name,
      description,
      address,
      phone,
      email,
      website,
      licenseNumber,
      services,
      images: images.map(f => f.name),
      location: locationUrl,
    };

    try {
      const res = await fetch('http://localhost:5000/api/admin/wikalat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Status ${res.status}`);
      }
      await res.json();

      setSnackbar({ show: true, msg: 'الوكالة أُضيفت بنجاح!', isError: false });

      // Reset form
      setName(''); setDescription(''); setAddress('');
      setPhone(''); setEmail(''); setWebsite('');
      setLicenseNumber(''); setServices([]); setServiceInput('');
      setImages([]); setLocationUrl('');
    } catch (error) {
      console.error('AddWikala error:', error);
      setSnackbar({ show: true, msg: '❌ خطأ أثناء الحفظ: ' + error.message, isError: true });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-right">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-[#800020] mb-6">إضافة وكالة جديدة</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <label className="block">
              <span>اسم الوكالة</span>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                required className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block md:col-span-2">
              <span>وصف الخدمة</span>
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
            <label className="block">
              <span>الموقع الإلكتروني</span>
              <input
                type="url" value={website} onChange={e => setWebsite(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
            <label className="block">
              <span>رقم الرخصة</span>
              <input
                type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)}
                className="mt-1 w-full border rounded p-2"
              />
            </label>
          </div>

          {/* Services */}
          <div>
            <span>الخدمات المقدمة</span>
            <div className="mt-2 flex gap-2">
              <input
                value={serviceInput} onChange={e => setServiceInput(e.target.value)}
                placeholder="أضف خدمة" className="flex-1 border rounded p-2"
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
            <span>صور الوكالة</span>
            <input
              type="file" accept="image/*" multiple
              onChange={e => setImages(Array.from(e.target.files))}
              className="mt-2 block w-full border rounded p-2"
            />
            {images.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {images.map((file, i) => (
                  <li key={i}
                    className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2"
                  >
                    {file.name}
                    <button type="button"
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                    >✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <div className="text-right mt-6">
            <button type="submit"
              className="bg-[#800020] text-white px-6 py-2 rounded hover:bg-[#990022] transition"
            >حفظ الوكالة</button>
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

export default AddWikala;
