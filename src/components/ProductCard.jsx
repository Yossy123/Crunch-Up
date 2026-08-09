import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { formatRupiah } from '../utils/format';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiShoppingBag, FiEye, FiImage } from 'react-icons/fi';

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
    <Card className="group border-slate-200/80 hover:border-orange-400/80 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative rounded-2xl sm:rounded-3xl bg-white">
      
      {/* Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={handleProductClick}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <FiImage className="w-8 h-8 mb-1 text-slate-300" />
            <span className="text-[11px] font-medium text-slate-400">Belum Ada Foto</span>
          </div>
        )}
        
        {/* Dark Gradient Overlays for High Badge Legibility */}
        <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-slate-950/50 to-transparent pointer-events-none z-10" />

        {/* Badges Container (Flex Horizontal Wrap, Top-Left) */}
        <div className="absolute top-2 left-2 right-2 z-20 flex flex-wrap gap-1 items-start pointer-events-none">
          {/* Category Badge */}
          <Badge variant="secondary" className="bg-slate-900/90 text-white text-[10px] border-white/10 font-bold">
            {product.category}
          </Badge>

          {/* Flavor Badge */}
          {product.flavor && (
            <Badge variant="default" className="bg-orange-500/95 text-white text-[10px] font-extrabold border-white/10">
              {product.flavor}
            </Badge>
          )}

          {/* Not Available Badge */}
          {(product.isAvailable === false || product.price === 0) && (
            <Badge variant="destructive" className="bg-rose-600/95 text-white text-[10px] font-black uppercase tracking-wider">
              Not Available
            </Badge>
          )}
        </div>
        
        {/* Quick view button overlay */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
          <Button 
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="rounded-full bg-white hover:scale-110 shadow-md cursor-pointer"
            title="Lihat Detail"
          >
            <FiEye className="text-lg text-slate-800" />
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={handleProductClick}
            className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-orange-600 line-clamp-2 transition-colors cursor-pointer mb-1 leading-snug"
          >
            {product.name}
          </h3>
          <Badge variant="outline" className="bg-amber-50/80 text-amber-700 border-amber-200 text-[10px] font-bold">
            Netto: {product.weight || '250gr'}
          </Badge>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-3">
          <div className="min-w-0">
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">Harga</span>
            <span className={`text-xs sm:text-base font-extrabold truncate block ${product.price === 0 || product.isAvailable === false ? 'text-slate-400' : 'text-orange-600'}`}>
              {formatRupiah(product.price)}
            </span>
          </div>

          {product.isAvailable !== false && product.price > 0 ? (
            <Button
              size="sm"
              onClick={() => addItem(product)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 px-2.5 rounded-xl cursor-pointer"
              title="Tambah ke Keranjang"
            >
              <FiShoppingBag className="text-sm mr-1" />
              <span className="hidden sm:inline">+ Cart</span>
            </Button>
          ) : (
            <Button
              disabled
              variant="outline"
              size="sm"
              className="bg-rose-50 text-rose-500 font-bold text-[10px] border-rose-200 h-8 px-2 rounded-xl"
            >
              <span>Not Available</span>
            </Button>
          )}
        </div>

      </div>

    </Card>
  );
};

export default ProductCard;
