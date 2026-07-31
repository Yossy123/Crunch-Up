import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { FiInbox, FiRefreshCw } from 'react-icons/fi';

const ProductGrid = ({ 
  products, 
  searchQuery, 
  selectedCategory, 
  selectedFlavor,
  sortBy,
  onQuickView, 
  resetFilters 
}) => {
  // Filter & Sort Logic (Memoized)
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = 
        !selectedCategory ||
        selectedCategory === 'Semua Kategori' ||
        selectedCategory === 'Semua' || 
        product.category === selectedCategory;

      const matchesFlavor = 
        !selectedFlavor ||
        selectedFlavor === 'Semua Rasa' ||
        selectedFlavor === 'Semua' ||
        product.flavor === selectedFlavor;

      const matchesSearch = 
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.flavor && product.flavor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesFlavor && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.soldCount - a.soldCount);
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedFlavor, sortBy]);

  const isFilteredActive = 
    (selectedCategory && selectedCategory !== 'Semua Kategori' && selectedCategory !== 'Semua') ||
    (selectedFlavor && selectedFlavor !== 'Semua Rasa' && selectedFlavor !== 'Semua') ||
    (searchQuery && searchQuery.trim() !== '');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      {/* Header section with counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Katalog Snack Terbaru
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Menampilkan <span className="font-bold text-orange-600">{filteredProducts.length}</span> cemilan lezat
          </p>
        </div>

        {isFilteredActive && (
          <button
            onClick={resetFilters}
            className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <FiRefreshCw className="text-sm" />
            <span>Reset Semua Filter</span>
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">Snack Tidak Ditemukan</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Maaf, tidak ada cemilan yang cocok dengan kombinasi filter atau kata kunci pencarian kamu.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
          >
            Reset Filter & Lihat Semua
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
