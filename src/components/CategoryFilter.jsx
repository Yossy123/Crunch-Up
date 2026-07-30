import React from 'react';
import { 
  FiGrid, 
  FiCpu, 
  FiShoppingBag, 
  FiCoffee, 
  FiHeart, 
  FiHome, 
  FiActivity 
} from 'react-icons/fi';

const categories = [
  { id: 'Semua', label: 'Semua', icon: FiGrid },
  { id: 'Elektronik', label: 'Elektronik', icon: FiCpu },
  { id: 'Fashion', label: 'Fashion', icon: FiShoppingBag },
  { id: 'Makanan', label: 'Makanan', icon: FiCoffee },
  { id: 'Kesehatan', label: 'Kesehatan', icon: FiHeart },
  { id: 'Rumah', label: 'Rumah', icon: FiHome },
  { id: 'Olahraga', label: 'Olahraga', icon: FiActivity },
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2 px-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold shrink-0 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-105'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80 shadow-2xs'
              }`}
            >
              <Icon className={`text-base ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
