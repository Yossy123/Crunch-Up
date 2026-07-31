import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiTag, FiZap, FiTruck } from 'react-icons/fi';

const banners = [
  {
    id: 1,
    badge: 'FLASH SALE 50%',
    badgeIcon: FiZap,
    title: 'Diskon Spesial Cemilan Favorit',
    subtitle: 'Dapatkan penawaran promo terbaik untuk snack impianmu minggu ini!',
    cta: 'Belanja Sekarang',
    bgColor: 'from-orange-950 via-amber-950 to-slate-900',
    accentColor: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    badge: 'NEW ARRIVAL',
    badgeIcon: FiTag,
    title: 'Koleksi Basreng & Keripik Viral',
    subtitle: 'Cemilan gurih pedas renyah daun jeruk paling favorit tahun 2026.',
    cta: 'Lihat Katalog',
    bgColor: 'from-slate-950 via-slate-900 to-orange-950',
    accentColor: 'from-orange-400 to-amber-500',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    badge: 'GRATIS ONGKIR EXTRA',
    badgeIcon: FiTruck,
    title: 'Bebas Ongkir Seluruh Indonesia',
    subtitle: 'Tanpa minimum belanja. Pengiriman cepat & aman sampai depan rumahmu.',
    cta: 'Pesan Sekarang',
    bgColor: 'from-slate-900 via-emerald-950 to-slate-900',
    accentColor: 'from-emerald-400 to-teal-500',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80'
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };

  return (
    <div 
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[340px] sm:min-h-[320px] md:min-h-[360px] flex items-center">
        {banners.map((slide, index) => {
          const BadgeIcon = slide.badgeIcon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-gradient-to-r ${slide.bgColor} ${
                index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-12 pt-6 sm:pt-8 pb-14 sm:pb-12 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
                
                {/* Text Content */}
                <div className="flex-1 text-white z-10 max-w-xl text-center md:text-left flex flex-col items-center md:items-start justify-center">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold tracking-wide text-amber-300 mb-2 sm:mb-3">
                    <BadgeIcon className="text-sm shrink-0" />
                    <span>{slide.badge}</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug sm:leading-tight mb-2 sm:mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 max-w-md">
                    {slide.subtitle}
                  </p>
                  <div className="mb-4 sm:mb-1">
                    <button className={`inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r ${slide.accentColor} hover:brightness-110 shadow-lg transition-transform transform active:scale-95 cursor-pointer`}>
                      {slide.cta}
                    </button>
                  </div>
                </div>

                {/* Banner Image Visual */}
                <div className="relative z-10 hidden md:block w-72 lg:w-96 h-48 lg:h-60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/10 opacity-80 hover:opacity-100 cursor-pointer"
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="text-lg sm:text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/10 opacity-80 hover:opacity-100 cursor-pointer"
          aria-label="Next Slide"
        >
          <FiChevronRight className="text-xl sm:text-2xl" />
        </button>

        {/* Carousel Indicators / Dots (Positioned cleanly at bottom) */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? 'w-7 bg-amber-400 shadow-md shadow-amber-400/50'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Banner;
