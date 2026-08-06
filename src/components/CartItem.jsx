import React from 'react';
import { useCart } from '../context/useCart';
import { formatRupiah } from '../utils/format';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item }) => {
  const { updateQty, removeItem } = useCart();
  const { product, quantity } = item;


  return (
    <div className="flex items-center space-x-2.5 sm:space-x-3 p-2.5 sm:p-3 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200/60 transition-colors">
      
      {/* Thumbnail */}
      <img
        src={product.image}
        alt={product.name}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-white shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block truncate">
          {product.category}
        </span>
        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 truncate mb-0.5 sm:mb-1" title={product.name}>
          {product.name}
        </h4>
        <span className="text-xs sm:text-sm font-extrabold text-orange-600 block truncate">
          {formatRupiah(product.price)}
        </span>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex flex-col items-end space-y-1.5 sm:space-y-2 shrink-0">
        <button
          onClick={() => removeItem(product.id)}
          className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
          title="Hapus Item"
          aria-label={`Hapus ${product.name} dari keranjang`}
        >
          <FiTrash2 className="text-xs sm:text-sm" />
        </button>

        {/* Quantity Stepper */}
        <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-xl px-1 py-0.5 shadow-2xs">
          <button
            onClick={() => updateQty(product.id, -1)}
            className="w-5 h-5 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Kurangi Jumlah"
          >
            <FiMinus className="text-[10px]" />
          </button>
          <span className="w-5 text-center text-xs font-bold text-slate-800">
            {quantity}
          </span>
          <button
            onClick={() => updateQty(product.id, 1)}
            className="w-5 h-5 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tambah Jumlah"
          >
            <FiPlus className="text-[10px]" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CartItem;
