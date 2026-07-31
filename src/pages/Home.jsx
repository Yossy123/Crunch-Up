import React, { useState } from 'react';
import productsData from '../data/products.json';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import ProductDetailModal from '../components/ProductDetailModal';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
import Toast from '../components/Toast';
import { useCart } from '../context/CartContext';
import { FiShoppingBag } from 'react-icons/fi';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedFlavor, setSelectedFlavor] = useState('Semua Rasa');
  const [sortBy, setSortBy] = useState('popular');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { totalItem, totalPrice, setIsCartOpen } = useCart();

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
    setSelectedFlavor('Semua Rasa');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <main className="pb-24 sm:pb-28 flex-1">
        {/* Sticky Header */}
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* Promo Hero Banner */}
        <Banner />

        {/* Snack Filter Section */}
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          selectedFlavor={selectedFlavor}
          setSelectedFlavor={setSelectedFlavor}
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
          sortBy={sortBy}
          onQuickView={(product) => setQuickViewProduct(product)}
          resetFilters={resetFilters}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-1">CatalogApp Store</h3>
              <p className="text-xs text-slate-400">
                Solusi belanja produk favoritmu cepat, aman, dan mudah langsung via WhatsApp.
              </p>
            </div>
            <div className="text-xs text-slate-500 text-center md:text-right">
              © 2026 CatalogApp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Cart Button (Shows when item > 0 for optimal UX, with bottom margin safety) */}
      {totalItem > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
          <button
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto w-full sm:w-auto flex items-center justify-between sm:justify-start space-x-3 px-4 sm:px-5 py-3 sm:py-3.5 bg-slate-900/95 hover:bg-slate-900 text-white rounded-2xl sm:rounded-full shadow-2xl hover:shadow-orange-500/25 border border-slate-700/80 backdrop-blur-md cursor-pointer transition-all duration-200 active:scale-95 group"
            aria-label="Buka Keranjang Belanja"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FiShoppingBag className="text-lg sm:text-xl text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItem > 99 ? '99+' : totalItem}
                </span>
              </div>
              <div className="text-left">
                <span className="block text-xs font-extrabold text-white leading-none mb-0.5">Keranjang Belanja</span>
                <span className="block text-[10px] text-orange-400 font-semibold leading-none">
                  {totalItem} item • {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-orange-400 sm:hidden">Lihat Detail &rarr;</span>
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductDetailModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
        />
      )}

      {/* Cart Sidebar Drawer */}
      <CartSidebar />

      {/* Checkout WhatsApp Modal */}
      <CheckoutModal />

      {/* Toast Notification */}
      <Toast />
    </div>
  );
};

export default Home;
