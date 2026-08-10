import React from 'react';
import productsData from '../data/products.json';
import { 
  FiPhone, 
  FiHeart, 
  FiShield, 
  FiMessageSquare,
  FiCheckCircle,
  FiArrowUp
} from 'react-icons/fi';

const categories = Array.from(new Set(productsData.map(p => p.category).filter(Boolean)));


const Footer = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catName) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    scrollToTop();
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 overflow-hidden border-t border-slate-800/80">
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Feature Highlights Banner */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 max-w-xs sm:max-w-5xl mx-auto">

            <div className="flex items-center justify-start sm:justify-center space-x-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shrink-0">
                <FiShield />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200">100% Halal & Higienis</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Bahan pilihan berkualitas tinggi</p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center space-x-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
                <FiMessageSquare />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200">Order via WhatsApp</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Proses praktis & ramah</p>
              </div>
            </div>

            <div className="flex items-center justify-start sm:justify-center space-x-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300 shrink-0">
                <FiCheckCircle />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-slate-200">Jaminan Rasa Nagih</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Renyah, gurih & bumbu melimpah</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Crunch Up" 
                className="h-16 sm:h-20 w-auto object-contain bg-white/95 p-2 rounded-2xl shadow-md"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Pusat snack ringan, camilan pedas, dan jajanan kekinian dengan bumbu melimpah. Siap menemanimu di segala suasana!
            </p>


          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 relative inline-block">
              Kategori Snack
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-orange-400 transition-colors flex items-center space-x-1.5 cursor-pointer text-slate-400 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors" />
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>



          {/* Column 4: Contact Store */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 relative inline-block">
              Hubungi Kami
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center space-x-3">
                <FiPhone className="text-orange-400 text-base shrink-0" />
                {(() => {
                  const rawPhone = import.meta.env.VITE_WA_PHONE || '6287888525426';
                  let cleanPhone = String(rawPhone).trim().replace(/[^0-9]/g, '');
                  if (cleanPhone.startsWith('0')) cleanPhone = '62' + cleanPhone.slice(1);
                  return (
                    <a 
                      href={`https://api.whatsapp.com/send?phone=${cleanPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-orange-400 transition-colors"
                    >
                      +{cleanPhone}
                    </a>
                  );
                })()}
              </li>
            </ul>
          </div>

        </div>



        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">Crunch Up</span>. All rights reserved.
          </div>

          <div className="flex items-center space-x-1 text-slate-500">
            <span>Dibuat dengan</span>
            <FiHeart className="text-rose-500 fill-rose-500 text-xs inline mx-0.5 animate-pulse" />
            <span>untuk pecinta snack lezat</span>
          </div>

          {/* Back to top button */}
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Ke atas</span>
            <FiArrowUp className="text-xs" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
