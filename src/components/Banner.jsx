import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiTag, FiZap, FiStar } from 'react-icons/fi';

const banners = [
  {
    id: 1,
    badge: 'PRODUK TERLARIS',
    badgeIcon: FiZap,
    title: 'Koleksi Cemilan Pilihan Terfavorit',
    subtitle: 'Nikmati aneka keripik dan cemilan lezat berkualitas tinggi untuk menemani harimu!',
    cta: 'Belanja Sekarang',
    bgColor: 'from-orange-950 via-amber-950 to-slate-900',
    accentColor: 'from-amber-400 to-orange-500',
    image: 'https://i.ibb.co.com/MxGWNXRw/snack-Kerupuk-Seblak.jpg'
  },
  {
    id: 2,
    badge: 'NEW ARRIVAL',
    badgeIcon: FiTag,
    title: 'Koleksi Gurih & Keripik Renyah',
    subtitle: 'Cemilan gurih pedas renyah beraroma khas paling favorit tahun ini.',
    cta: 'Lihat Katalog',
    bgColor: 'from-slate-950 via-slate-900 to-orange-950',
    accentColor: 'from-orange-400 to-amber-500',
    image: 'https://i.ibb.co.com/0RhQfLL6/snack-Keripik-Tempe.jpg'
  },
  {
    id: 3,
    badge: 'ORDER PRAKTIS VIA WA',
    badgeIcon: FiStar,
    title: 'Pesan Kapan Saja Langsung via WhatsApp',
    subtitle: 'Proses transaksi cepat, praktis & tanpa ribet. Langsung terhubung dengan admin kami.',
    cta: 'Pesan Sekarang',
    bgColor: 'from-slate-900 via-emerald-950 to-slate-900',
    accentColor: 'from-emerald-400 to-teal-500',
    image: 'https://i.ibb.co.com/Cpzsdg31/snack-Soes-Kering.jpg'
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleCtaClick = () => {
    const catalogElement = document.getElementById('katalog') || document.querySelector('section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


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
      <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-105 sm:min-h-90 md:min-h-90 flex items-center">
        {banners.map((slide, index) => {
          const BadgeIcon = slide.badgeIcon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out bg-linear-to-r ${slide.bgColor} ${
                index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-12 pt-5 sm:pt-8 pb-12 sm:pb-12 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
                
                {/* Text Content */}
                <div className="flex-1 text-white z-10 max-w-xl text-center md:text-left flex flex-col items-center md:items-start justify-center">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-amber-300 mb-2 sm:mb-3">
                    <BadgeIcon className="text-sm shrink-0" />
                    <span>{slide.badge}</span>
                  </div>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug sm:leading-tight mb-1.5 sm:mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-2.5 sm:mb-4 line-clamp-2 max-w-md">
                    {slide.subtitle}
                  </p>
                  <div className="mb-3 sm:mb-1">
                    <button 
                      onClick={handleCtaClick}
                      className={`inline-flex items-center px-5 py-2 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-linear-to-r ${slide.accentColor} hover:brightness-110 shadow-lg transition-transform transform active:scale-95 cursor-pointer`}
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>

                {/* Banner Image Visual (Visible on Mobile & Desktop) */}
                <div className="relative z-10 w-full max-w-60 sm:max-w-xs md:w-72 lg:w-96 h-28 sm:h-36 md:h-48 lg:h-60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center transition-all border border-white/10 opacity-80 hover:opacity-100 cursor-pointer"
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="text-lg sm:text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center transition-all border border-white/10 opacity-80 hover:opacity-100 cursor-pointer"
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
