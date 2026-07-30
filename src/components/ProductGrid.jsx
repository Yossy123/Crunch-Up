import React from 'react';
import ProductCard from './ProductCard';
import { FiInbox, FiRefreshCw } from 'react-icons/fi';

const ProductGrid = ({ products, searchQuery, selectedCategory, onQuickView, resetFilters }) => {
  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      {/* Header section with counts */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {selectedCategory === 'Semua' ? 'Semua Produk' : `Kategori: ${selectedCategory}`}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Menampilkan <span className="font-bold text-slate-800">{filteredProducts.length}</span> produk pilihan
          </p>
        </div>

        {(selectedCategory !== 'Semua' || searchQuery !== '') && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <FiRefreshCw className="text-sm" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={onQuickView} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4 text-2xl">
            <FiInbox />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Produk Tidak Ditemukan</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Maaf, kami tidak dapat menemukan produk yang sesuai dengan kata kunci "{searchQuery}" pada kategori "{selectedCategory}".
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
          >
            Lihat Semua Produk
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
