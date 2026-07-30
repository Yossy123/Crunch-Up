import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiTag, FiZap, FiTruck } from 'react-icons/fi';

const banners = [
  {
    id: 1,
    badge: 'FLASH SALE 50%',
    badgeIcon: FiZap,
    title: 'Diskon Spesial Gadget & Elektronik',
    subtitle: 'Dapatkan penawaran terbaik untuk gadget impianmu hanya minggu ini!',
    cta: 'Belanja Sekarang',
    bgColor: 'from-slate-900 via-purple-950 to-slate-900',
    accentColor: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    badge: 'NEW ARRIVAL',
    badgeIcon: FiTag,
    title: 'Koleksi Fashion Streetwear 2026',
    subtitle: 'Tampil gaya dengan outfit unisex paling diminati tahun ini.',
    cta: 'Lihat Koleksi',
    bgColor: 'from-slate-950 via-slate-900 to-blue-950',
    accentColor: 'from-cyan-400 to-blue-500',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    badge: 'GRATIS ONGKIR EXTRA',
    badgeIcon: FiTruck,
    title: 'Bebas Ongkir Seluruh Indonesia',
    subtitle: 'Tanpa minimum belanja. Pengiriman cepat & aman sampai rumahmu.',
    cta: 'Klaim Promo',
    bgColor: 'from-slate-900 via-emerald-950 to-slate-900',
    accentColor: 'from-emerald-400 to-teal-500',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
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
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-55 sm:min-h-75 md:min-h-90">
        {banners.map((slide, index) => {
          const BadgeIcon = slide.badgeIcon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-linear-to-r ${slide.bgColor} ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Text Content */}
                <div className="flex-1 text-white z-10 max-w-xl text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold tracking-wide text-amber-300 mb-3 sm:mb-4">
                    <BadgeIcon className="text-base" />
                    <span>{slide.badge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2 sm:mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                    {slide.subtitle}
                  </p>
                  <div>
                    <button className={`inline-flex items-center px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-linear-to-r ${slide.accentColor} hover:brightness-110 shadow-lg transition-transform transform active:scale-95`}>
                      {slide.cta}
                    </button>
                  </div>
                </div>

                {/* Banner Image Visual */}
                <div className="relative z-10 hidden md:block w-72 lg:w-96 h-48 lg:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                </div>

              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/10 opacity-80 hover:opacity-100"
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="text-xl sm:text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/10 opacity-80 hover:opacity-100"
          aria-label="Next Slide"
        >
          <FiChevronRight className="text-xl sm:text-2xl" />
        </button>

        {/* Carousel Indicators / Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
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
