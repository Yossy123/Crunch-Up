import React from 'react';
import { 
  FiFilter, 
  FiGrid, 
  FiSmile, 
  FiSliders, 
  FiRotateCcw 
} from 'react-icons/fi';

const categoryOptions = [
  'Semua Kategori',
  'Keripik & Macaroni',
  'Biskuit & Cookies',
  'Snack Pedas',
  'Cokelat & Permen',
  'Kacang & Seeds'
];

const flavorOptions = [
  'Semua Rasa',
  'Pedas Balado',
  'Keju / Asin Gurih',
  'Cokelat / Manis',
  'BBQ / Savory',
  'Matcha / Green Tea',
  'Original'
];

const sortOptions = [
  { id: 'popular', label: 'Paling Populer' },
  { id: 'price-asc', label: 'Harga: Terendah' },
  { id: 'price-desc', label: 'Harga: Tertinggi' },
  { id: 'rating', label: 'Rating Tertinggi' }
];

const CategoryFilter = ({ 
  selectedCategory, 
  setSelectedCategory,
  selectedFlavor,
  setSelectedFlavor,
  sortBy,
  setSortBy,
  resetFilters
}) => {
  const isFiltered = 
    (selectedCategory && selectedCategory !== 'Semua Kategori' && selectedCategory !== 'Semua') ||
    (selectedFlavor && selectedFlavor !== 'Semua Rasa' && selectedFlavor !== 'Semua') ||
    (sortBy && sortBy !== 'popular');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6">
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        
        {/* Header Title */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-sm sm:text-base font-bold shadow-md shadow-orange-500/20 shrink-0">
              <FiFilter />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-extrabold text-slate-800">Filter Snack Favorit</h3>
              <p className="text-[11px] sm:text-xs text-slate-500">Pilih cemilan berdasarkan kategori dan varian rasa</p>
            </div>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              <FiRotateCcw className="text-xs" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Dropdown 1: Kategori Snack */}
          <div className="relative w-full min-w-0 max-w-full">
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FiGrid className="text-orange-500" /> Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full max-w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 font-semibold text-xs sm:text-sm py-2.5 pl-3.5 pr-8 rounded-2xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer transition-all appearance-none truncate"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.85rem center',
                backgroundSize: '0.65rem auto'
              }}
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 2: Varian Rasa */}
          <div className="relative w-full min-w-0 max-w-full">
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FiSmile className="text-orange-500" /> Varian Rasa
            </label>
            <select
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              className="w-full max-w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 font-semibold text-xs sm:text-sm py-2.5 pl-3.5 pr-8 rounded-2xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer transition-all appearance-none truncate"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.85rem center',
                backgroundSize: '0.65rem auto'
              }}
            >
              {flavorOptions.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 3: Urutkan (Sort By) */}
          <div className="relative w-full min-w-0 max-w-full">
            <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              <FiSliders className="text-orange-500" /> Urutkan
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full max-w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 font-semibold text-xs sm:text-sm py-2.5 pl-3.5 pr-8 rounded-2xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer transition-all appearance-none truncate"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.85rem center',
                backgroundSize: '0.65rem auto'
              }}
            >
              {sortOptions.map((sort) => (
                <option key={sort.id} value={sort.id}>
                  {sort.label}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;


