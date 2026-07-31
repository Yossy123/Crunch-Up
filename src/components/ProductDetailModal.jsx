import React from 'react';
import { useCart } from '../context/CartContext';
import { FiX, FiStar, FiShoppingBag, FiCheck } from 'react-icons/fi';

const ProductDetailModal = ({ product, onClose }) => {
  const { addItem } = useCart();

  if (!product) return null;

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl transition-all transform animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <FiX className="text-xl" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image Container */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 text-white text-xs font-semibold rounded-full backdrop-blur-md">
              {product.category}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-amber-500 mb-2">
                <FiStar className="fill-amber-400" />
                <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">{product.soldCount} Terjual</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                {product.name}
              </h3>

              <div className="text-2xl font-extrabold text-orange-600 mb-4">
                {formatRupiah(product.price)}
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  addItem(product);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-transform active:scale-95 cursor-pointer"
              >
                <FiShoppingBag className="text-lg" />
                <span>+ Tambah Keranjang</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;
