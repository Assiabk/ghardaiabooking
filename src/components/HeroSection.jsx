import React, { useEffect, useState } from 'react';

const images = [
  'https://images.pexels.com/photos/27789446/pexels-photo-27789446.jpeg',
  'https://images.pexels.com/photos/27789441/pexels-photo-27789441.jpeg',
  'https://i.pinimg.com/736x/42/36/45/4236458e97d3c76cca0f6828726ac831.jpg',
  'https://images.pexels.com/photos/10108130/pexels-photo-10108130.jpeg',
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden font-sans">
      {/* All images rendered with only the active one fully visible */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === i ? 'opacity-100 z-0' : 'opacity-0'
          }`}
        />
      ))}

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-white/10 z-10 backdrop-blur-[1px]" />

      {/* Centered Text Box */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-snug tracking-wide drop-shadow">
            اكتشف سحر غرداية
          </h1>
          <p className="text-base md:text-lg mb-5 text-white/90">
            احجز فنادقك وغرفك بسهولة وتمتع بتجارب أصيلة وخدمات راقية في قلب الجنوب الجزائري.
          </p>
          <a
            href="/search"
            className="bg-white/80 text-gray-900 font-semibold px-5 py-2.5 rounded-full shadow hover:bg-white transition"
          >
            ابدأ الحجز الآن
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
