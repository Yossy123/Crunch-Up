import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/format';
import { FiShoppingBag, FiEye } from 'react-icons/fi';

const ProductCard = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleProductClick = () => {
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };


  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-shadow transition-border duration-200 flex flex-col overflow-hidden relative">
      
      {/* Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={handleProductClick}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Dark Gradient Overlays for High Badge Legibility */}
        <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-slate-950/50 to-transparent pointer-events-none z-10" />

        {/* Badges Container (Flex Horizontal Wrap, Top-Left) */}
        <div className="absolute top-2 left-2 right-2 z-20 flex flex-wrap gap-1 items-start pointer-events-none">
          {/* Category Badge */}
          <span className="px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold rounded-md truncate max-w-[90%] border border-white/10 shadow-xs">
            {product.category}
          </span>

          {/* Flavor Badge */}
          {product.flavor && (
            <span className="px-2 py-0.5 bg-orange-500/95 text-white text-[10px] font-extrabold rounded-md truncate max-w-[90%] border border-white/10 shadow-xs">
              {product.flavor}
            </span>
          )}

          {/* Not Available Badge */}
          {(product.isAvailable === false || product.price === 0) && (
            <span className="px-2 py-0.5 bg-rose-600/95 text-white text-[10px] font-black uppercase tracking-wider rounded-md truncate max-w-[90%] border border-white/10 shadow-xs">
              Not Available
            </span>
          )}
        </div>
        
        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="p-2.5 rounded-full bg-white text-slate-800 hover:scale-110 shadow-md transition-transform cursor-pointer"
            title="Lihat Detail"
          >
            <FiEye className="text-lg" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>

          {/* Title */}
          <h3 
            onClick={handleProductClick}
            className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-orange-600 line-clamp-2 transition-colors cursor-pointer mb-2 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-auto">
          <div className="min-w-0">
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Harga</span>
            <span className={`text-xs sm:text-base font-extrabold truncate block ${product.price === 0 || product.isAvailable === false ? 'text-slate-400' : 'text-orange-600'}`}>
              {formatRupiah(product.price)}
            </span>
          </div>

          {product.isAvailable !== false && product.price > 0 ? (
            <button
              onClick={() => addItem(product)}
              className="inline-flex items-center space-x-1 px-2.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Tambah ke Keranjang"
            >
              <FiShoppingBag className="text-sm" />
              <span className="hidden xs:inline">+ Cart</span>
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center space-x-1 px-2 py-1.5 rounded-xl bg-rose-50 text-rose-500 font-bold text-[10px] border border-rose-200 cursor-not-allowed shrink-0"
              title="Tidak Tersedia"
            >
              <span>Not Available</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default ProductCard;
