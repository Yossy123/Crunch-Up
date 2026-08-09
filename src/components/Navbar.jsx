import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { FiShoppingBag, FiSearch, FiX } from 'react-icons/fi';

const Navbar = ({ searchQuery, setSearchQuery, onResetFilters, onSearchSubmit }) => {
  const { totalItem, setIsCartOpen } = useCart();

  const handleLogoClick = () => {
    if (onResetFilters) {
      onResetFilters();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
          
          {/* Logo & Brand */}
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center shrink-0 group cursor-pointer"
            title="Kembali ke Beranda Crunch Up"
          >
            <img 
              src="/logo.png" 
              alt="Crunch Up" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transform transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Search Input Bar */}
          <form
            className="flex-1 max-w-md sm:max-w-xl mx-3 sm:mx-8"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-500 transition-colors">
                <FiSearch className="text-base sm:text-lg" />
              </div>
              <input
                type="search"
                placeholder="Cari snack favoritmu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 rounded-full border border-slate-200/60 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus Pencarian"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <FiX className="text-base sm:text-lg" />
                </button>
              )}
            </div>
          </form>

          {/* Cart Button with Icon & Count Badge */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center space-x-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm rounded-full transition-all duration-200 shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer group"
              aria-label="Keranjang Belanja"
            >
              <FiShoppingBag className="text-lg sm:text-xl transition-transform group-hover:scale-110 shrink-0" />
              <span className="font-extrabold tracking-tight">Keranjang</span>
              
              {/* Item Count Badge */}
              <span className="w-5 h-5 text-[11px] bg-white text-orange-600 font-black rounded-full flex items-center justify-center shadow-2xs shrink-0 ml-1">
                {totalItem}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
