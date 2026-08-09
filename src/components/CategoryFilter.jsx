import React from 'react';
import { 
  FiFilter, 
  FiGrid, 
  FiSmile, 
  FiSliders, 
  FiRotateCcw
} from 'react-icons/fi';
import productsData from '../data/products.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const categoryOptions = [
  'Semua Kategori',
  ...Array.from(new Set(productsData.map(p => p.category).filter(Boolean)))
];

const flavorOptions = [
  'Semua Rasa',
  ...Array.from(new Set(productsData.map(p => p.flavor).filter(Boolean)))
];



const sortOptions = [
  { id: 'price-asc', label: 'Harga: Terendah', disabled: false },
  { id: 'price-desc', label: 'Harga: Tertinggi', disabled: false },
  { id: 'popular', label: 'Paling Populer (Belum Tersedia)', disabled: true },
  { id: 'rating', label: 'Rating Tertinggi (Belum Tersedia)', disabled: true }
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
    (sortBy && sortBy !== 'price-asc');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6">
      <div className="bg-white p-3.5 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3.5">
        
        {/* Header Title */}
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-sm sm:text-base font-bold shadow-md shadow-orange-500/20 shrink-0">
              <FiFilter />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-base font-extrabold text-slate-800 truncate">Filter Snack Favorit</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">Pilih cemilan berdasarkan kategori & rasa</p>
            </div>
          </div>

          {isFiltered && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={resetFilters}
              className="bg-orange-50 hover:bg-orange-100 text-orange-600 text-[11px] sm:text-xs font-bold px-2.5 py-1.5 h-8 rounded-xl shrink-0 ml-2"
            >
              <FiRotateCcw className="text-xs mr-1" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        {/* Dropdown Filters Grid: 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
          
          {/* Dropdown 1: Kategori Snack */}
          <div className="w-full min-w-0 space-y-1">
            <label className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
              <FiGrid className="text-orange-500 shrink-0" /> Kategori
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown 2: Varian Rasa */}
          <div className="w-full min-w-0 space-y-1">
            <label className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
              <FiSmile className="text-orange-500 shrink-0" /> Rasa
            </label>
            <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
              <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl">
                <SelectValue placeholder="Pilih Rasa" />
              </SelectTrigger>
              <SelectContent>
                {flavorOptions.map((flavor) => (
                  <SelectItem key={flavor} value={flavor}>
                    {flavor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown 3: Urutkan (Sort By) */}
          <div className="w-full min-w-0 space-y-1">
            <label className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
              <FiSliders className="text-orange-500 shrink-0" /> Urutkan
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full bg-slate-50 border-slate-200 text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((sort) => (
                  <SelectItem key={sort.id} value={sort.id} disabled={sort.disabled}>
                    {sort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
