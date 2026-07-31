import React from 'react';
import { useCart } from '../context/CartContext';
import { FiStar, FiShoppingBag, FiEye } from 'react-icons/fi';

const ProductCard = ({ product, onQuickView }) => {
  const { addItem } = useCart();

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image & Overlay */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
          <span className="px-2.5 py-1 bg-slate-900/75 text-white text-[10px] sm:text-xs font-semibold rounded-lg backdrop-blur-md">
            {product.category}
          </span>
          {product.flavor && (
            <span className="px-2 py-1 bg-orange-500/90 text-white text-[10px] font-bold rounded-lg backdrop-blur-md">
              {product.flavor}
            </span>
          )}
        </div>
        
        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-full bg-white/90 text-slate-800 hover:bg-white hover:scale-110 shadow-md transition-transform"
            title="Lihat Detail"
          >
            <FiEye className="text-lg" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Sold count */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-1.5">
            <FiStar className="text-amber-400 fill-amber-400 text-sm shrink-0" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span>•</span>
            <span>{product.soldCount} terjual</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-orange-600 line-clamp-2 transition-colors cursor-pointer mb-2 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Harga</span>
            <span className="text-sm sm:text-base font-extrabold text-orange-600">
              {formatRupiah(product.price)}
            </span>
          </div>

          <button
            onClick={() => addItem(product)}
            className="inline-flex items-center space-x-1 sm:space-x-1.5 px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            title="Tambah ke Keranjang"
          >
            <FiShoppingBag className="text-sm sm:text-base" />
            <span className="hidden xs:inline">+ Cart</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
