import React from 'react';
import { Link } from 'react-router-dom';

const dummyIqamat = [
  { id: 1, name: 'Palm Residence', arabicName: 'إقامة النخيل', location: 'Silver Valley', arabicLocation: 'واد الفضة', image: 'https://images.pexels.com/photos/27789446/pexels-photo-27789446.jpeg', price: '1500 DA / ليلة' },
  { id: 2, name: 'Oasis Residence', arabicName: 'إقامة الواحة', location: 'Ghardaïa Municipality', arabicLocation: 'بلدية غرداية', image: 'https://images.pexels.com/photos/27789441/pexels-photo-27789441.jpeg', price: '1800 DA / ليلة' }
];

export default function IqamatList() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-[#800020] mb-8 text-center">الإقامات السياحية</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {dummyIqamat.map(iqama => (
            <Link key={iqama.id} to={`/iqamat/${iqama.id}`} className="group block bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img src={iqama.image} alt={iqama.arabicName} className="h-56 w-full object-cover" />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white">{iqama.arabicName}</h3>
                  <p className="text-sm text-gray-200">{iqama.arabicLocation}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#800020] text-lg">{iqama.price}</span>
                  <button className="px-4 py-1 bg-[#800020] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}