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
import { FiHeart, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <div>
        {/* Sticky Header */}
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {/* Promo Hero Banner */}
        <Banner />

        {/* Category Horizontal Filter Chips */}
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        {/* Responsive Product Catalog Grid */}
        <ProductGrid 
          products={productsData} 
          searchQuery={searchQuery} 
          selectedCategory={selectedCategory} 
          onQuickView={(product) => setQuickViewProduct(product)}
          resetFilters={resetFilters}
        />

        {/* Feature Badges Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl shrink-0">
                <FiTruck />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Gratis Pengiriman</h4>
                <p className="text-xs text-slate-500">Seluruh area Indonesia</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-2xl shrink-0">
                <FiShield />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Produk 100% Original</h4>
                <p className="text-xs text-slate-500">Jaminan garansi resmi</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl shrink-0">
                <FiHeart />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Kualitas Terjamin</h4>
                <p className="text-xs text-slate-500">Pilihan kurasi terbaik</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center text-2xl shrink-0">
                <FiHeadphones />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Layanan CS 24/7</h4>
                <p className="text-xs text-slate-500">Responsif via WhatsApp</p>
              </div>
            </div>
          </div>
        </section>
      </div>

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
