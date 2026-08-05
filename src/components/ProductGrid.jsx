import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import { FiInbox, FiRefreshCw, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const ITEMS_PER_PAGE = 10;

const ProductGrid = ({ 
  products, 
  searchQuery, 
  selectedCategory, 
  selectedFlavor,
  selectedStatus,
  sortBy,
  onQuickView, 
  resetFilters 
}) => {
  const [currentPage, setCurrentPage] = useState(1);

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

      const matchesStatus = 
        !selectedStatus ||
        selectedStatus === 'Semua Status' ||
        selectedStatus === 'Semua' ||
        (selectedStatus === 'Tersedia' && product.isAvailable !== false && product.price > 0) ||
        (selectedStatus === 'Tidak Tersedia' && (product.isAvailable === false || product.price === 0));

      const matchesSearch = 
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.flavor && product.flavor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesFlavor && matchesStatus && matchesSearch;
    });

    if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        if (a.price === 0 && b.price > 0) return 1;
        if (a.price > 0 && b.price === 0) return -1;
        return b.price - a.price;
      });
    } else {
      // Default: price-asc (Harga Terendah)
      result = [...result].sort((a, b) => {
        if (a.price === 0 && b.price > 0) return 1;
        if (a.price > 0 && b.price === 0) return -1;
        return a.price - b.price;
      });
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedFlavor, selectedStatus, sortBy]);

  // Reset page to 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedFlavor, selectedStatus, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  // Current page products
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      const catalogElement = document.getElementById('katalog');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const isFilteredActive = 
    (selectedCategory && selectedCategory !== 'Semua Kategori' && selectedCategory !== 'Semua') ||
    (selectedFlavor && selectedFlavor !== 'Semua Rasa' && selectedFlavor !== 'Semua') ||
    (searchQuery && searchQuery.trim() !== '');

  const startItem = filteredProducts.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage, '...', totalPages];
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      {/* Header section with counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Katalog Snack Terbaru
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {filteredProducts.length > 0 ? (
              <>
                Menampilkan <span className="font-bold text-orange-600">{startItem}-{endItem}</span> dari <span className="font-bold text-orange-600">{filteredProducts.length}</span> cemilan lezat (Halaman {currentPage} dari {totalPages})
              </>
            ) : (
              'Tidak ada cemilan ditemukan'
            )}
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
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={onQuickView} 
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {filteredProducts.length > 0 && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 w-full">
              <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
                Halaman <strong className="text-slate-800">{currentPage}</strong> dari <strong className="text-slate-800">{totalPages}</strong> (Total {filteredProducts.length} produk)
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 max-w-full">
                {/* First Page (Hidden on Mobile) */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="hidden sm:inline-flex p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Halaman Pertama"
                  aria-label="Halaman Pertama"
                >
                  <FiChevronsLeft className="text-sm sm:text-base" />
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Halaman Sebelumnya"
                  aria-label="Halaman Sebelumnya"
                >
                  <FiChevronLeft className="text-sm sm:text-base" />
                </button>

                {/* Numbered Page Buttons */}
                {getPageNumbers().map((num, idx) => (
                  num === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-1 sm:px-2 py-1 text-slate-400 text-xs font-bold select-none">...</span>
                  ) : (
                    <button
                      key={`page-${num}`}
                      onClick={() => handlePageChange(num)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        currentPage === num
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600'
                      }`}
                    >
                      {num}
                    </button>
                  )
                ))}

                {/* Next Page */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Halaman Selanjutnya"
                  aria-label="Halaman Selanjutnya"
                >
                  <FiChevronRight className="text-sm sm:text-base" />
                </button>

                {/* Last Page (Hidden on Mobile) */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="hidden sm:inline-flex p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-slate-600 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  title="Halaman Terakhir"
                  aria-label="Halaman Terakhir"
                >
                  <FiChevronsRight className="text-sm sm:text-base" />
                </button>
              </div>
            </div>
          )}
        </>
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
