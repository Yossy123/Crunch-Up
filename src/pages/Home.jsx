import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/format';
import { FiShoppingBag } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedFlavor, setSelectedFlavor] = useState('Semua Rasa');
  const [selectedStatus, setSelectedStatus] = useState('Semua Status');
  const [sortBy, setSortBy] = useState('popular');

  const { totalItem, totalHarga, setIsCartOpen } = useCart();

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSelectedFlavor('Semua Rasa');
    setSelectedStatus('Semua Status');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <main className="pb-24 sm:pb-28 flex-1">
        {/* Sticky Header */}
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onResetFilters={resetFilters}
        />

        {/* Promo Hero Banner */}
        <Banner />

        <div id="katalog">
          {/* Snack Filter Section */}
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            selectedFlavor={selectedFlavor}
            setSelectedFlavor={setSelectedFlavor}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resetFilters={resetFilters}
          />

          {/* Responsive Product Catalog Grid */}
          <ProductGrid 
            products={productsData} 
            searchQuery={searchQuery} 
            selectedCategory={selectedCategory} 
            selectedFlavor={selectedFlavor}
            selectedStatus={selectedStatus}
            sortBy={sortBy}
            onQuickView={(product) => navigate(`/product/${product.id}`)}
            resetFilters={resetFilters}
          />
        </div>
      </main>

      {/* Modern Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Floating Sticky Cart Button (Compact Pill Style) */}
      {totalItem > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-3 px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-900 hover:bg-slate-950 text-white rounded-full shadow-2xl hover:shadow-orange-500/25 border border-slate-700/80 cursor-pointer transition-all duration-200 active:scale-95 group"
            aria-label="Buka Keranjang Belanja"
          >
            <div className="relative shrink-0">
              <FiShoppingBag className="text-lg sm:text-xl text-orange-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItem > 99 ? '99+' : totalItem}
              </span>
            </div>
            <div className="text-left shrink-0">
              <span className="block text-xs font-extrabold text-white leading-none mb-0.5">Keranjang</span>
              <span className="block text-[10px] text-orange-400 font-semibold leading-none">
                {totalItem} item • {formatRupiah(totalHarga)}
              </span>
            </div>
          </button>
        </div>
      )}

    </div>
  );
};

export default Home;
